import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is required')
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is required')
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Generic caching function with TTL
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600 // 1 hour default
): Promise<T> {
  try {
    // Try to get from cache first
    const cached = await redis.get(key)
    if (cached) {
      console.log(`Cache hit for key: ${key}`)
      return cached as T
    }

    // Cache miss - fetch fresh data
    console.log(`Cache miss for key: ${key}`)
    const data = await fetcher()

    // Cache the result
    await redis.setex(key, ttl, data)

    return data
  } catch (error) {
    console.error('Redis caching error:', error)
    // Fallback to direct fetch if caching fails
    return await fetcher()
  }
}

// Portfolio-specific caching functions
export async function getCachedPortfolioData() {
  return getCachedData('portfolio:data', async () => {
    // This would integrate with your existing data fetching logic
    // For now, return mock data structure
    return {
      hero: {
        title: 'DreamFolio',
        subtitle: 'Engineering Excellence',
        stats: {
          projects: 50,
          technologies: 25,
          experience: '5+ years'
        }
      },
      sections: {
        trinity: {
          cybersecurity: { title: 'Cybersecurity', description: '...' },
          fintech: { title: 'FinTech', description: '...' },
          creative: { title: 'Creative Technology', description: '...' }
        },
        tech: {
          skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
          tools: ['Docker', 'Kubernetes', 'AWS', 'Firebase']
        }
      }
    }
  }, 3600) // 1 hour TTL
}

export async function getCachedAnalytics() {
  return getCachedData('portfolio:analytics', async () => {
    // Analytics data that changes frequently
    return {
      pageViews: Math.floor(Math.random() * 10000),
      uniqueVisitors: Math.floor(Math.random() * 5000),
      bounceRate: Math.random() * 0.5,
      timestamp: new Date().toISOString()
    }
  }, 300) // 5 minutes TTL for analytics
}

// Cache invalidation helpers
export async function invalidateCache(pattern: string) {
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`Invalidated ${keys.length} cache keys matching: ${pattern}`)
    }
  } catch (error) {
    console.error('Cache invalidation error:', error)
  }
}

export async function invalidatePortfolioCache() {
  await invalidateCache('portfolio:*')
}

// Health check for Redis connection
export async function checkRedisHealth() {
  try {
    await redis.ping()
    return { status: 'healthy', latency: await measureLatency() }
  } catch (error) {
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

async function measureLatency(): Promise<number> {
  const start = Date.now()
  await redis.ping()
  return Date.now() - start
}