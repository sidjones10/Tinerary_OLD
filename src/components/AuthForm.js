import { useState } from "react";
import { signUp, signIn, signOut } from "@/utils/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (type) => {
    setLoading(true);
    setMessage("");
    try {
      if (type === "signUp") await signUp(email, password);
      else await signIn(email, password);
      setMessage("Success! Check your email for confirmation.");
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Sign In / Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 border"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-2 border"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => handleAuth("signIn")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
      >
        Sign In
      </button>
      <button
        onClick={() => handleAuth("signUp")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Sign Up
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}
