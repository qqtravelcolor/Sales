import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead_name = typeof body.lead_name === "string" ? body.lead_name.trim() : "";
    const lead_email = typeof body.lead_email === "string" ? body.lead_email.trim().toLowerCase() : "";
    const partner_slug = typeof body.partner_slug === "string" ? body.partner_slug.trim() : "";
    const form_source = typeof body.form_source === "string" ? body.form_source.trim() : null;
    if (!lead_name || !emailPattern.test(lead_email) || !/^[a-z0-9_-]+$/.test(partner_slug)) return NextResponse.json({ error: "lead_name, a valid lead_email, and partner_slug are required." }, { status: 400 });
    const supabase = createSupabaseServerClient();
    const { data: partner, error: partnerError } = await supabase.from("partners").select("slug").eq("slug", partner_slug).maybeSingle();
    if (partnerError) throw partnerError;
    if (!partner) return NextResponse.json({ error: "Unknown partner_slug." }, { status: 422 });
    const { data, error } = await supabase.from("leads").insert({ lead_name, lead_email, partner_slug, form_source }).select().single();
    if (error) throw error;
    return NextResponse.json({ lead: data }, { status: 201 });
  } catch (error) { console.error("Lead ingestion failed", error); return NextResponse.json({ error: "Unable to save lead." }, { status: 500 }); }
}
