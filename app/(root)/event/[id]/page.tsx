"use client";
import { getEvent } from "@/app/_lib/api";
import { TEvent, TSpeaker, User } from "@/app/_lib/types";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/_hooks/useAuth";
import { toTitleCase } from "@/app/_lib/toTitleCase";
import Event from "@/app/_components/eventBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const admin: User = { username: "hacker", password: "htn2026" };

const EventPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { id } = use(params);
  const [isValidEvent, setIsValidEvent] = useState<boolean>(true);
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);

  // Fetch current event upon loading
  useEffect(() => {
    const fetchCurrentEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res);
      } catch {
        setIsValidEvent(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentEvent();
  }, []);

  // Fetch related events and add them to relatedEvents array
  useEffect(() => {
    const fetchRelatedEvents = async () => {
      if (!event?.related_events) return;
      const relatedEventsArray: TEvent[] = [];
      for (const id of event.related_events) {
        const fetchedEvent = await fetchEvent(id);
        if (fetchedEvent) {
          relatedEventsArray.push(fetchedEvent);
        }
      }
      setRelatedEvents(relatedEventsArray);
    };
    fetchRelatedEvents();
  }, [event]);

  // Fetch Event by ID
  const fetchEvent = async (id: number) => {
    try {
      const res = await getEvent(id);
      return res;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-250 mx-auto">
      {loading ? (
        <div className="text-center text-2xl pt-50">Loading...</div>
      ) : event &&
        isValidEvent &&
        // check if event is private and user is not logged in
        !(event.permission == "private" && user == null) ? (
        <div className="mx-20">
          <h1 className="text-3xl font-bold text-left">{event.name}</h1>

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

          {/* Link */}
          {user != null ? (
            // User not logged in
            <div className="my-5">
              <a
                href={event.private_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xl text-sky-900 hover:text-sky-700 p-2 border rounded-xl"
              >
                See Event
              </a>
            </div>
          ) : event.public_url ? (
            // User logged in
            <div className="my-5">
              <a
                href={event.public_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xl text-sky-900 hover:text-sky-700 p-2 border rounded-xl"
              >
                See Event
              </a>
            </div>
          ) : null}

          {/* Description */}
          <div className="my-5">
            <p>{event.description}</p>
          </div>

          {/* Speaker list conditionally renders if > 0 speakers */}
          {event.speakers.length > 0 ? (
            <div className="my-20">
              <h1 className="font-bold text-3xl text-center text-sky-900">
                Speakers
              </h1>
              <div className="flex flex-wrap pt-2 gap-3 justify-center">
                {event.speakers.map((speaker: TSpeaker) => {
                  return (
                    <div
                      className="rounded-xl border px-2 py-1 text-xl"
                      key={speaker.name}
                    >
                      <p>{speaker.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Related Events conditionally renders if > 0 events*/}
          {event.related_events.length > 0 ? (
            <div className="my-20">
              <h1 className="font-bold text-3xl text-center text-sky-900">
                Related Events
              </h1>
              <div className="flex flex-col gap-5 pt-3">
                {relatedEvents.map((event: TEvent) => {
                  return (
                    <div key={event.id}>
                      <Event id={event.id} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : isValidEvent ? (
        <div>
          {/* Event is not visible */}
          <div className="text-xl pt-50 text-center mx-auto my-auto">
            <div className=" text-3xl text-red-900">
              <FontAwesomeIcon icon={faLock} className=" w-5 h-5 inline mr-2" />
              Please login to view this event
            </div>
            <button className="text-sky-900" onClick={() => login(admin)}>
              Login
            </button>
          </div>
        </div>
      ) : (
        // Event does not exist
        <div className="text-xl pt-50 text-center mx-auto my-auto">
          <div className=" text-3xl">Event not found</div>
          <Link href="/" className="text-sky-900 ">
            Return Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventPage;
