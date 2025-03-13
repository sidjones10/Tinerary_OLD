import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient.js";

// GET a single trip by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH a trip by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, location, date } = await req.json();

    const { data, error } = await supabase
      .from("trips")
      .update({ title, location, date })
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a trip by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get a single trip by ID
async function fetchTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`);
    const data = await res.json();
    console.log(data);
  }
  
  // Update a trip
  async function updateTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Updated Trip",
        location: "Los Angeles",
      }),
    });
  
    const data = await res.json();
    console.log(data);
  }
  
  // Delete a trip
  async function deleteTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`, {
      method: "DELETE",
    });
  
    const data = await res.json();
    console.log(data);
  }