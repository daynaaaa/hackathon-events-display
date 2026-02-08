import { TEndpointResponse, TEvent } from "./types";

const API_BASE_URL = "https://api.hackthenorth.com/v3";

const eventDNEResponse: TEvent = {
  id: -1,
  name: "Event Does not Exist",
  event_type: "workshop",
  start_time: -1,
  end_time: -1,
  speakers: [],
  private_url: "",
  related_events: [],
};

// Get array of all events
export const getEvents = async (): Promise<TEvent[]> => {
  try {
    console.log("Fetching events...");
    const res = await fetch(`${API_BASE_URL}/events`);
    const data = await res.json();
    console.log("Number of events fetched: ", data.length);

    return data; // return Event[]
  } catch (err) {
    console.error("Error fetching events: ", err);
    return [];
  }
};

// Get event by id
export const getEvent = async (id: number): Promise<TEvent> => {
  try {
    console.log("Fetching event by id: ", id);
    const res = await fetch(`${API_BASE_URL}/events/${id}`);
    const data = await res.json();
    console.log("Event fetched: ", id);

    return data; // return an Event
  } catch (err) {
    console.error("Error fetching event: ", id, err);
    return eventDNEResponse;
  }
};
