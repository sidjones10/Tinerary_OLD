import { supabase } from "./supabaseClient";

// Sign Up
export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
};

// Sign In
export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return user;
};

// Sign Out
export const signOut = async () => {
  await supabase.auth.signOut();
};
