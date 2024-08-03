import { FetchConceptsResponse } from "@/lib/types";

export default async function fetchConcepts(): Promise<FetchConceptsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API_URL is not defined in the environment variables.");
    return { data: null, receivedTime: null };
  }

  try {
    const response = await fetch(`${apiUrl}/concepts`);
    if (response.ok) {
      const data = await response.json(); // on dev, data is fetched twice due to React strictmode

      const receivedTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return { data, receivedTime };
    } else {
      console.error("Failed to fetch concepts");
      return { data: null, receivedTime: null };
    }
  } catch (error) {
    console.error("Error fetching concepts", error);
    return { data: null, receivedTime: null };
  }
}
