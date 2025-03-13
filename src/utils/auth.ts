import { supabase } from "@/lib/supabaseClient";

// Sign Up
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
};

// Sign In
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

// Sign Out
export const signOut = async () => {
  await supabase.auth.signOut();
};
