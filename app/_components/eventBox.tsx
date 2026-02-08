import { useEffect, useState } from "react";
import { getEvent } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { useAuth } from "../_hooks/useAuth";

const Event = ({ id }: { id: number }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEvent(id);
      setEvent(res);
    };
    fetchEvent();
  }, []);

  //also need in event/page!!! how to do??
  const toTitleCase = (str: string) => {
    return str
      .replace("_", " ")
      .replace("_", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="bg-white m-3 w-80 rounded-lg p-4">
      {event &&
      event?.id != -1 &&
      //check if event is private and user is not logged in
      !(event.permission == "private" && user == null) ? (
        <button>
          <h1 className="text-xl font-bold">{event.name}</h1>

          {/* Can add multiple event types for hybrid events */}
          <div className="flex flex-wrap my-2">
            <div className="rounded-xl border px-2 py-1">
              {toTitleCase(event.event_type)}
            </div>
          </div>
          <div>
            {/* Date */}
            {/* since no events span over a day */}
            <p className="">
              <span className="font-bold">
                {new Date(event.start_time).toLocaleDateString()}:{" "}
              </span>
              {new Date(event.start_time).toLocaleTimeString()} -{" "}
              {new Date(event.end_time).toLocaleTimeString()}
            </p>
          </div>
        </button>
      ) : event?.id != -1 ? (
        // Event is not visible
        <button>Please login to view this event</button>
      ) : (
        // Event does not exist
        <div>This event does not exist or was removed.</div>
      )}
    </div>
  );
};

export default Event;
