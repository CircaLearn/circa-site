import { Concept } from "./types";

export type FetchConceptsResponse = {
  data: Concept[] | null;
  receivedTime: string | null;
};

export default async function fetchConcepts(): Promise<FetchConceptsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("API_URL is not defined in the environment variables.");
    return { data: null, receivedTime: null };
  }

  try {
    const response = await fetch(`${apiUrl}/concepts`);
    if (response.ok) {
      let data: Concept[] = await response.json(); // on dev, data is fetched twice due to React strictmode

      // datetime.datetime python objects are sent as strings to frontend
      // Cast python date strings to Date objects
      data = data.map((concept) => ({
        ...concept,
        date_created: new Date(concept.date_created),
        last_seen: concept.last_seen ? new Date(concept.last_seen) : undefined,
      }));

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
