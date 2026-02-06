import { useEffect, useState } from "react";
import { getEvent } from "@/lib/api";
import { TEvent } from "@/lib/types";

const Event = ({ id }: { id: number }) => {
  const [event, setEvent] = useState<TEvent>(); // Array of all events

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEvent(id);
      setEvent(res);
    };
    fetchEvent();
  }, []);

  return (
    <div className="bg-white">
      {event && event?.id != -1 ? (
        <div>
          {event.name}
          <div></div>
        </div>
      ) : (
        <div> event does not exist </div>
      )}
    </div>
  );
};

export default Event;
