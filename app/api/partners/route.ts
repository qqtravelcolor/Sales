import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
    if (!name || !/^https?:\/\/.+/.test(website) || !/^[a-z0-9_-]+$/.test(slug)) return NextResponse.json({ error: "Provide a name, valid website URL, and lowercase slug." }, { status: 400 });
    const { data, error } = await createSupabaseServerClient().from("partners").insert({ name, website, slug }).select().single();
    if (error) { if (error.code === "23505") return NextResponse.json({ error: "This slug is already in use." }, { status: 409 }); throw error; }
    return NextResponse.json({ partner: data }, { status: 201 });
  } catch (error) { console.error("Partner creation failed", error); return NextResponse.json({ error: "Unable to create partner." }, { status: 500 }); }
}
