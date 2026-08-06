/**
 * Supabase client stub.
 * Provides typed logging functions that gracefully no-op when Supabase
 * credentials aren't configured. Ready to connect once env vars are set.
 * 
 * Required env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 
 * Required Supabase tables (create via SQL editor):
 * 
 * CREATE TABLE consent_logs (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   categories jsonb NOT NULL,
 *   timestamp timestamptz NOT NULL,
 *   policy_version text NOT NULL,
 *   created_at timestamptz DEFAULT now()
 * );
 * 
 * CREATE TABLE agreement_logs (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email text NOT NULL,
 *   document_versions jsonb NOT NULL,
 *   agreed_at timestamptz NOT NULL,
 *   created_at timestamptz DEFAULT now()
 * );
 * 
 * -- Enable RLS on both tables
 * ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE agreement_logs ENABLE ROW LEVEL SECURITY;
 * 
 * -- Allow anonymous inserts only (no reads from public)
 * CREATE POLICY "Allow anonymous inserts" ON consent_logs
 *   FOR INSERT TO anon WITH CHECK (true);
 * 
 * CREATE POLICY "Allow anonymous inserts" ON agreement_logs
 *   FOR INSERT TO anon WITH CHECK (true);
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

async function supabaseInsert(table: string, data: Record<string, unknown>): Promise<void> {
  if (!isConfigured()) {
    console.info(`[Supabase] Not configured — skipping insert to "${table}". Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`);
    return;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.warn(`[Supabase] Insert to "${table}" failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.warn(`[Supabase] Insert to "${table}" errored:`, err);
  }
}

/**
 * Log a cookie consent decision for ICO audit trail.
 */
export async function logConsent(
  categories: { necessary: boolean; analytics: boolean; functional: boolean },
  policyVersion: string
): Promise<void> {
  await supabaseInsert('consent_logs', {
    categories,
    timestamp: new Date().toISOString(),
    policy_version: policyVersion,
  });
}

/**
 * Log a Terms/Privacy agreement acceptance at point of contracting.
 */
export async function logAgreement(
  email: string,
  documentVersions: { terms: string; privacy: string }
): Promise<void> {
  await supabaseInsert('agreement_logs', {
    email,
    document_versions: documentVersions,
    agreed_at: new Date().toISOString(),
  });
}
