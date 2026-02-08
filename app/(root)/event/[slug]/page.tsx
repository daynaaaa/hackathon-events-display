import { getEvent, getEvents } from "@/app/_lib/api";
import { TEvent } from "@/app/_lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events
  const { id } = useParams();
  // Fetch Event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEvent(id);
      setEvent(res);
    };
    fetchEvent();
  }, []);

  return <div>{}</div>;
};

export default EventPage;
