import { supabase, supabaseAdmin, PortfolioContent } from './config'
import { getCachedData, invalidatePortfolioCache } from '../cache/redis'

// Get portfolio content with caching
export async function getPortfolioContent(section?: string) {
  const cacheKey = section ? `portfolio:content:${section}` : 'portfolio:content:all'

  return getCachedData(cacheKey, async () => {
    let query = supabase
      .from('portfolio_content')
      .select('*')
      .order('version', { ascending: false })

    if (section) {
      query = query.eq('section', section).limit(1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching portfolio content:', error)
      throw error
    }

    return section ? data?.[0] : data
  }, 1800) // 30 minutes TTL
}

// Update portfolio content (admin only)
export async function updatePortfolioContent(
  section: string,
  content: any,
  version: number = 1
): Promise<PortfolioContent> {
  const { data, error } = await supabaseAdmin
    .from('portfolio_content')
    .upsert({
      section,
      content,
      version,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error updating portfolio content:', error)
    throw error
  }

  // Invalidate cache after update
  await invalidatePortfolioCache()

  return data
}

// Get portfolio statistics
export async function getPortfolioStats() {
  return getCachedData('portfolio:stats', async () => {
    // This would aggregate data from various sources
    const [contentCount, analyticsData] = await Promise.all([
      supabase
        .from('portfolio_content')
        .select('section', { count: 'exact' })
        .then(({ count }) => count),

      supabase
        .from('analytics_events')
        .select('event_type')
        .eq('event_type', 'page_view')
        .then(({ data }) => data?.length || 0)
    ])

    return {
      totalSections: contentCount || 0,
      totalPageViews: analyticsData,
      lastUpdated: new Date().toISOString()
    }
  }, 600) // 10 minutes TTL
}

// Bulk operations for content management
export async function bulkUpdatePortfolioContent(updates: Array<{
  section: string
  content: any
  version?: number
}>) {
  const { data, error } = await supabaseAdmin
    .from('portfolio_content')
    .upsert(
      updates.map(update => ({
        section: update.section,
        content: update.content,
        version: update.version || 1,
        updated_at: new Date().toISOString()
      }))
    )
    .select()

  if (error) {
    console.error('Error bulk updating portfolio content:', error)
    throw error
  }

  // Invalidate cache after bulk update
  await invalidatePortfolioCache()

  return data
}

// Content versioning
export async function getContentVersions(section: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('section', section)
    .order('version', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching content versions:', error)
    throw error
  }

  return data
}

// Revert to previous version
export async function revertContentVersion(section: string, version: number) {
  const { data: versionData, error: fetchError } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('section', section)
    .eq('version', version)
    .single()

  if (fetchError) {
    console.error('Error fetching version to revert:', fetchError)
    throw fetchError
  }

  // Create new version with reverted content
  const newVersion = Math.max(versionData.version + 1, await getNextVersion(section))

  return updatePortfolioContent(section, versionData.content, newVersion)
}

async function getNextVersion(section: string): Promise<number> {
  const { data } = await supabase
    .from('portfolio_content')
    .select('version')
    .eq('section', section)
    .order('version', { ascending: false })
    .limit(1)
    .single()

  return (data?.version || 0) + 1
}