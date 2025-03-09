"use client";
import { useEffect, useState } from "react";
import { getTrips, deleteTrip } from "@/utils/tripService";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      const data = await getTrips();
      setTrips(data);
    }
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    await deleteTrip(tripId);
    setTrips(trips.filter((trip) => trip.id !== tripId)); // Remove from UI
  };

  return (
    <div>
      <h2>My Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.title} - {trip.date} 
            <button onClick={() => handleDelete(trip.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
