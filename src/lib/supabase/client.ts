/**
 * @fileoverview Supabase Client Configuration
 * @description Factory function that creates a Supabase client with support for
 * both runtime (with credentials) and build-time (mock client) scenarios.
 * Implements Factory Pattern to handle environment variable availability.
 * @module lib/supabase/client
 * 
 * @example
 * ```typescript
 * import { getSupabaseClient } from '../lib/supabase/client';
 * 
 * // Insert data
 * const { error } = await supabase.from('contacts').insert([{ name, email }]);
 * 
 * // Query data
 * const { data, error } = await supabase.from('projects').select('*');
 * ```
 */

/** @private Supabase project URL from environment */
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL

/** @private Supabase anonymous key from environment (safe for client-side) */
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const hasSupabasePublicConfig = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Factory function that creates the appropriate Supabase client.
 * Returns a mock client during build time when environment variables are unavailable,
 * or a fully functional client at runtime.
 * 
 * @function createSupabaseClient
 * @returns {SupabaseClient | MockClient} Supabase client or mock implementation
 * 
 * @description
 * **Build Time Behavior:**
 * When `PUBLIC_SUPABASE_URL` or `PUBLIC_SUPABASE_ANON_KEY` are not set,
 * returns a mock client that resolves all operations with empty/null data.
 * This prevents build failures during static generation.
 * 
 * **Runtime Behavior:**
 * Creates a fully configured Supabase client with:
 * - `autoRefreshToken`: Automatically refreshes auth tokens before expiry
 * - `persistSession`: Stores session in localStorage for persistence
 * - `detectSessionInUrl`: Handles OAuth callback redirects
 * 
 * @example
 * ```typescript
 * // Internal use - prefer using the exported singleton
 * const client = createSupabaseClient();
 * ```
 * 
 * @throws {Error} Never throws - always returns a valid client (real or mock)
 */
export const getSupabaseClient = async () => {
  if (!hasSupabasePublicConfig) {
    // Return a mock client for build time
    return {
      from: () => ({
        insert: () => Promise.resolve({ error: null }),
        select: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ error: null }),
        delete: () => Promise.resolve({ error: null }),
      }),
      auth: {
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signUp: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
    } as any;
  }

  const { createClient } = await import('@supabase/supabase-js');

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
};

/**
 * Pre-configured Supabase client instance.
 * Use this singleton for all database operations.
 * 
 * @const {SupabaseClient}
 * @see {@link createSupabaseClient} for configuration details
 * 
 * @example
 * ```typescript
 * import { getSupabaseClient } from '../lib/supabase/client';
 * 
 * const supabase = await getSupabaseClient();
 *
 * // Insert contact
 * const { error } = await supabase
 *   .from('contacts')
 *   .insert([{ name: 'John', email: 'john@example.com' }]);
 * 
 * // Query projects
 * const { data, error } = await supabase
 *   .from('projects')
 *   .select('*')
 *   .eq('featured', true);
 * ```
 */
