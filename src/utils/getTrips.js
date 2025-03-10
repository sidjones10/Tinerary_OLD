import { supabase } from "@/utils/supabaseClient";

export const getTrips = async () => {
  const { data, error } = await supabase
    .from("trips")
    .select("*"); // Fetch all trips

  if (error) throw error;
  return data;
};

const trips = await getTrips();
console.log(trips);

