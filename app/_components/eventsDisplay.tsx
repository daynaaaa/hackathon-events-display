import { getEvents } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { useEffect, useState } from "react";
import Event from "@/app/_components/eventBox";

const EventsDisplay = () => {
  const [events, setEvents] = useState<TEvent[]>([]); // Array of all events

  // Fetch events array upon render
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getEvents();
      setEvents(res);
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col gap-5 mx-20 justify-center">
      {events
        .sort(
          (a, b) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        )
        .map((e: TEvent) => (
          <div key={e.id}>
            <Event id={e.id} />
          </div>
        ))}
    </div>
  );
};

export default EventsDisplay;
