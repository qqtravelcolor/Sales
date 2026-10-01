export type Partner = { id: string; name: string; website: string; slug: string; created_at: string };
export type Lead = { id: string; partner_slug: string; lead_name: string; lead_email: string; form_source: string | null; created_at: string };
