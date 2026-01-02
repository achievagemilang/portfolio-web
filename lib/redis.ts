import { Redis } from '@upstash/redis';

// Create Redis client using Upstash REST API
// Works perfectly with serverless environments like Vercel
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export default redis;

// Helper functions for view counts
export async function getViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.get<number>(`views:project:${slug}`);
    return views || 0;
  } catch {
    console.error('Failed to get view count from Redis');
    return 0;
  }
}

export async function incrementViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.incr(`views:project:${slug}`);
    return views;
  } catch {
    console.error('Failed to increment view count in Redis');
    return 0;
  }
}

// Helper for blog view counts
export async function getBlogViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.get<number>(`views:blog:${slug}`);
    return views || 0;
  } catch {
    console.error('Failed to get blog view count from Redis');
    return 0;
  }
}

export async function incrementBlogViewCount(slug: string): Promise<number> {
  try {
    const views = await redis.incr(`views:blog:${slug}`);
    return views;
  } catch {
    console.error('Failed to increment blog view count in Redis');
    return 0;
  }
}
