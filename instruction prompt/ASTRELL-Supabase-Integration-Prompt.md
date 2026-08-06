# ASTRELL Supabase Integration & Setup Guide

**Target Audience:** Future AI Coding Agents
**Context:** The frontend infrastructure for legal compliance (cookie consent and terms agreement) has already been built and is fully functional. It currently uses a "stubbed" logging system that gracefully ignores database inserts if credentials are missing. The next step is to connect the real Supabase backend to start logging data, and prepare it for storing blog/portfolio images.

---

## 1. Current State of the Codebase

- **`lib/supabase.ts`**: Contains the stubbed logging functions (`logConsent` and `logAgreement`). It relies on native `fetch` to interact with the Supabase REST API (`/rest/v1/...`). It currently checks for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. If they are missing, it safely no-ops.
- **`components/CookieConsent.tsx`**: Fully built. Calls `logConsent` when a user saves their preferences.
- **`app/page.tsx`**: Contains the project inquiry form with an "I agree to Terms & Privacy" checkbox. Form submission logic can be expanded to call `logAgreement` if needed (currently it just requires the checkbox to be checked).

---

## 2. Tasks for the Agent

When the user is ready to connect Supabase, please execute the following steps:

### Task 1: Environment Variables
1. Ensure the user has created a Supabase project.
2. Ask the user to add the following to a `.env.local` file at the root of the project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Remind the user NEVER to commit this file to version control).*

### Task 2: Database Initialization (SQL)
Provide the user with the following SQL script and instruct them to run it in their Supabase SQL Editor. This sets up the compliance audit trails with Row Level Security (RLS) allowing anonymous inserts but blocking public reads:

```sql
-- 1. Create Consent Logs Table
CREATE TABLE consent_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  categories jsonb NOT NULL,
  timestamp timestamptz NOT NULL,
  policy_version text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 2. Create Agreement Logs Table
CREATE TABLE agreement_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  document_versions jsonb NOT NULL,
  agreed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agreement_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Anonymous Inserts
CREATE POLICY "Allow anonymous inserts" ON consent_logs
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON agreement_logs
  FOR INSERT TO anon WITH CHECK (true);
```

### Task 3: Database & SDK Expansion (For Info & Images)
The user has indicated they want to use Supabase to store "info and images later" (e.g., for the blog or portfolio). 
1. **Install the SDK:** Run `npm install @supabase/supabase-js`.
2. **Refactor `lib/supabase.ts`:** Update the file to initialize and export a proper Supabase client (`createClient`). 
3. **Storage Buckets:** Instruct the user to create a public storage bucket in Supabase (e.g., named `astrell-assets`) for hosting images.
4. **Update Logging:** Refactor the `logConsent` and `logAgreement` functions in `lib/supabase.ts` to use the official SDK (`supabase.from('consent_logs').insert(...)`) rather than the native `fetch` implementation currently acting as a stub.

---

## 3. Verification

Once connected:
1. Visit `http://localhost:3000`.
2. Accept the cookie banner.
3. Check the Supabase Dashboard -> Table Editor -> `consent_logs` to verify the record was successfully inserted.
4. Fill out the contact form and submit it, then check `agreement_logs` (ensure the form submission logic in `app/page.tsx` is properly hooked up to `logAgreement` in `lib/supabase.ts`).
