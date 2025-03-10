import { supabase } from "@/utils/supabaseClient";

export const updateTrip = async (tripId, updatedData) => {
  const { data, error } = await supabase
    .from("trips")
    .update(updatedData)
    .eq("id", tripId);

  if (error) throw error;
  return data;
};

await updateTrip(1, { title: "Updated Trip Name" });
