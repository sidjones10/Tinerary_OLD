import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient.js";

// Create a new trip
export async function POST(req: Request) {
  try {
    const { title, location, date } = await req.json();

    const { data, error } = await supabase
      .from("trips")
      .insert([{ title, location, date }]);

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all trips
export async function GET() {
  try {
    const { data, error } = await supabase.from("trips").select("*");

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a trip
async function createTrip() {
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New York Trip",
        location: "NYC",
        date: "2025-03-20",
      }),
    });
  
    const data = await res.json();
    console.log(data);
  }