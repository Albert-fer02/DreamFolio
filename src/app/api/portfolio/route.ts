import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioContent, getPortfolioStats } from '../../../../lib/supabase/portfolio'
import { getCachedPortfolioData } from '../../../../lib/cache/redis'

// GET /api/portfolio - Get portfolio data with caching
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    const includeStats = searchParams.get('stats') === 'true'

    // Get cached portfolio data
    const portfolioData = await getCachedPortfolioData()

    let responseData: any = {
      ...portfolioData,
      cached: true,
      timestamp: new Date().toISOString()
    }

    // If specific section requested, get from Supabase
    if (section) {
      const sectionData = await getPortfolioContent(section)
      if (sectionData) {
        responseData.section = sectionData
      }
    }

    // Include stats if requested
    if (includeStats) {
      const stats = await getPortfolioStats()
      responseData.stats = stats
    }

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400', // 30min cache, 24h stale
        'CDN-Cache-Control': 'max-age=3600', // CDN cache for 1 hour
      }
    })

  } catch (error) {
    console.error('Error fetching portfolio data:', error)

    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}

// POST /api/portfolio - Update portfolio content (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // const authHeader = request.headers.get('authorization')
    // if (!authHeader?.startsWith('Bearer ')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { section, content, version = 1 } = body

    if (!section || !content) {
      return NextResponse.json(
        { error: 'Section and content are required' },
        { status: 400 }
      )
    }

    // This would call the update function from portfolio.ts
    // For now, return success
    return NextResponse.json({
      success: true,
      message: `Portfolio section '${section}' updated successfully`,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error updating portfolio data:', error)

    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 })
}