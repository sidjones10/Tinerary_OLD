import { useState } from "react";
import { supabase } from "../src/utils/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Check your email for a confirmation link!");
  }

  async function handleSignIn() {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Signed in successfully!");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Sign Up / Sign In</h1>
      <input
        className="p-2 m-2 border rounded"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 m-2 border rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="p-2 m-2 bg-blue-500 text-white rounded" onClick={handleSignUp}>
        Sign Up
      </button>
      <button className="p-2 m-2 bg-green-500 text-white rounded" onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}


