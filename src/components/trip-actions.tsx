// Create a trip
export async function createTrip() {
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New York Trip",
        location: "NYC",
        date: "2025-03-20",
      }),
    });
  
    const data = await res.json();
    console.log(data);
  }
  
  // Get all trips
  export async function fetchTrips() {
    const res = await fetch("/api/trips");
    const data = await res.json();
    console.log(data);
  }
  
  // Get a trip by ID
  export async function fetchTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`);
    const data = await res.json();
    console.log(data);
  }
  
  // Update a trip
  export async function updateTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Updated Trip",
        location: "Los Angeles",
        date: "2025-04-15",
      }),
    });
  
    const data = await res.json();
    console.log(data);
  }
  
  // Delete a trip
  export async function deleteTrip(id: string) {
    const res = await fetch(`/api/trips/${id}`, {
      method: "DELETE",
    });
  
    const data = await res.json();
    console.log(data);
  }
  