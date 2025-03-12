"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getSession();
        setUser(user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchData = async () => {
      try {
        let { data, error } = await supabase.from("my_actual_table").select("*");
        if (error) throw error;
        setData(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUser();
    fetchData();
  }, []);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <ErrorBoundary>
      <div>
        {user?.email ? `Welcome ${user.email}` : "No user found"}
        {data?.length > 0 ? JSON.stringify(data) : "No data available"}
      </div>
    </ErrorBoundary>
  );
}
