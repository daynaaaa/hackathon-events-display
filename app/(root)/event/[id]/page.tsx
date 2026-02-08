"use client";
import { getEvent, getEvents } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
const EventPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { id } = use(params);

  // Check if ID is valid and if user has permission to view
  // Fetch Event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEvent(id);
      if (res != eventDNEResponse) setEvent(res);
      else {
      }
    };

    if (!id || isNaN(Number(id))) return; //.....
    fetchEvent();
  }, []);

  return <div>{id}hi</div>;
};

export default EventPage;
