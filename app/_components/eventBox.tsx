import { useEffect, useState } from "react";
import { getEvent } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { useAuth } from "../_hooks/useAuth";
import Link from "next/link";
import { toTitleCase } from "../_lib/toTitleCase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Event = ({ id }: { id: number }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { user } = useAuth();
  const [isValidEvent, setIsValidEvent] = useState<boolean>(true);

  // Fetch event upon render
  // If fetch fails, sets isValidEvent to false
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res);
      } catch {
        setIsValidEvent(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="bg-white max-w-200 rounded-lg p-4 mx-auto opacity-60 hover:opacity-100 text-sky-950 hover:text-sky-700 drop-shadow-lg">
      {event &&
      isValidEvent &&
      // check if event is private and user is not logged in
      !(event.permission == "private" && user == null) ? (
        <Link href={`/event/${event.id}`}>
          <h1 className="text-xl font-bold text-left">{event.name}</h1>

          {/* Can add multiple event types for hybrid events */}
          <div className="flex flex-wrap my-2">
            <div className="rounded-xl border px-2 py-1">
              {toTitleCase(event.event_type)}
            </div>
          </div>
          <div>
            {/* Date */}
            {/* since no events span over a day */}
            <p className="text-lg">
              <span className="font-bold">
                {new Date(event.start_time).toLocaleDateString()}
              </span>
              <span className="mx-2">|</span>
              <span>
                {new Date(event.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="mx-2">−</span>
              <span>
                {new Date(event.end_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        </Link>
      ) : isValidEvent ? (
        // Event is not visible
        <div>
          <FontAwesomeIcon
            icon={faLock}
            className="text-red-900 w-5 h-5 inline mr-2"
          />
          <button className="text-red-900">
            Please login to view this event
          </button>
        </div>
      ) : (
        // Event does not exist
        <div className="text-red-900">
          This event does not exist or was removed.
        </div>
      )}
    </div>
  );
};

export default Event;
