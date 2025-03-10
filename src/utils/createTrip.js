import { supabase } from "@/utils/supabaseClient";

export const createTrip = async (tripData) => {
  const { data, error } = await supabase
    .from("trips")
    .insert([tripData]);

  if (error) throw error;
  return data;
};

await createTrip({ title: "Trip to Paris", date: "2025-04-15" });
