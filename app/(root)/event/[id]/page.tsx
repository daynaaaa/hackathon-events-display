"use client";
import { getEvent } from "@/app/_lib/api";
import { TEvent, TSpeaker, User } from "@/app/_lib/types";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/_hooks/useAuth";
import { toTitleCase } from "@/app/_lib/toTitleCase";

const admin: User = { username: "hacker", password: "htn2026" };

const EventPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { id } = use(params);
  const [isValidEvent, setIsValidEvent] = useState<boolean>(true);
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);

  // Check if ID is valid and if user has permission to view
  // Fetch Event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(id);
        setEvent(res);
      } catch {
        setIsValidEvent(false);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center text-2xl pt-50">Loading...</div>
      ) : event &&
        isValidEvent &&
        //check if event is private and user is not logged in
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
            <p className="">
              <span className="font-bold">
                {new Date(event.start_time).toLocaleDateString()}:{" "}
              </span>
              {new Date(event.start_time).toLocaleTimeString()} -{" "}
              {new Date(event.end_time).toLocaleTimeString()}
            </p>
          </div>
          {/* Description */}
          <div className="my-5">
            <p>{event.description}</p>
          </div>
          {/* Speaker list conditionally renders if > 0 speakers */}
          {event.speakers.length > 0 ? (
            <div className="my-5">
              <h1 className="font-bold text-xl ">Speakers</h1>
              <div className="flex flex-wrap pt-2 gap-3">
                {event.speakers.map((speaker: TSpeaker) => {
                  return (
                    <div
                      className="rounded-xl border px-2 py-1"
                      key={speaker.name}
                    >
                      <p>{speaker.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          {/* Link */}
          {user == null ? (
            // User not logged in
            <div className="my-5">
              <a href={event.public_url} className="font-bold text-xl ">
                {event.public_url}
              </a>
            </div>
          ) : (
            // User logged in
            <div className="my-5">
              <a
                href={event.private_url}
                className="font-bold text-xl text-sky-900 hover:text-sky-700 p-2 border rounded-xl"
              >
                See Event
              </a>
            </div>
          )}
          {/* Related Events conditionally renders if > 0 events*/}
          {event.related_events.length > 0 ? (
            <div className="my-5">
              <h1 className="font-bold text-xl ">Related Events</h1>
              <div className="flex flex-wrap pt-2 gap-3">
                {event.related_events.map((id: number) => {
                  return (
                    <div className="rounded-xl border px-2 py-1" key={id}>
                      <Link href={`/event/${id}`}>event</Link>
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
            <div className=" text-3xl">Please login to view this event</div>
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
