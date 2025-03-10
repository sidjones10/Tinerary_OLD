import { supabase } from "@/utils/supabaseClient";

export const deleteTrip = async (tripId) => {
  const { data, error } = await supabase
    .from("trips")
    .delete()
    .eq("id", tripId);

  if (error) throw error;
  return data;
};

await deleteTrip(1);
