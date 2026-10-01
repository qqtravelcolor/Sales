import { LayoutShell } from "@/components/layout-shell";
import { PartnerDashboard } from "@/components/partner-dashboard";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Partner } from "@/lib/types";

export default async function PartnersPage() {
  let partners: Partner[] = [];
  const configured = isSupabaseConfigured();
  if (configured) { const { data } = await createSupabaseServerClient().from("partners").select("*").order("created_at", { ascending: false }); partners = data || []; }
  return <LayoutShell><PartnerDashboard initialPartners={partners} configured={configured}/></LayoutShell>;
}
