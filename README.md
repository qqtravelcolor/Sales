# PartnerFlow — Partner Management & Lead Attribution

A Next.js App Router dashboard for managing marketing partners, producing referral URLs, and attributing form conversions to the originating partner.

## Stack

- Next.js 15, TypeScript, Tailwind CSS
- Supabase PostgreSQL and `@supabase/supabase-js`
- A standalone, dependency-free website tracking snippet

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Supabase project, then run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor.
3. Copy `.env.example` to `.env.local`, populate it with your project URL, anon key, and **server-only** service-role key. Set `NEXT_PUBLIC_TRACKING_BASE_URL` to the landing-page domain used in generated UTM links.
4. Start the dashboard:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/partners`.

## Attribution flow

1. Create a partner on **Partners** and copy its generated `utm_source` referral URL.
2. Add the hosted tracker to every landing-page header:
   ```html
   <script src="https://YOUR-DASHBOARD-DOMAIN/tracker.js" defer></script>
   ```
   The script retains `utm_source` in a first-party cookie and `localStorage` for 30 days, then fills hidden inputs named `partner_source`.
3. Your host-site form should include this field and send it with the lead:
   ```html
   <input type="hidden" name="partner_source" />
   ```
4. POST the form data to the dashboard endpoint. The API validates the lead and confirms that `partner_slug` exists before inserting it:
   ```js
   await fetch("https://YOUR-DASHBOARD-DOMAIN/api/leads", {
     method: "POST", headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ lead_name: "Ada Lovelace", lead_email: "ada@example.com", partner_slug: "acme_media", form_source: "demo-request" })
   });
   ```

## Security note

`SUPABASE_SERVICE_ROLE_KEY` must never be exposed to a browser or committed to Git. It is read only by server-side API routes and pages. In production, add an authorization method, origin allowlist, or signed webhook token to `/api/leads` if untrusted third parties can submit directly to it.
