import { getEvents } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { useEffect, useState } from "react";
import Event from "@/app/_components/eventBox";

const EventsDisplay = () => {
  const [events, setEvents] = useState<TEvent[]>([]); // Array of all events

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getEvents();
      setEvents(res);
    };
    fetchEvents();
  }, []);
  return (
    <div className="m-10 pt-20 flex flex-wrap justify-center">
      {events
        .sort(
          (a, b) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        )
        .map((e: TEvent) => (
          <a key={e.id}>
            <Event id={e.id} />
          </a>
        ))}
    </div>
  );
};

export default EventsDisplay;
