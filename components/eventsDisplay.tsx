import { getEvents } from "@/lib/api";
import { TEvent } from "@/lib/types";
import { useEffect, useState } from "react";
import Event from "@/components/event";

const EventsDisplay = () => {
    const [events, setEvents] = useState<TEvent[]>([]); // Array of all events
    
    useEffect(() => {
        const fetchEvents = async () => {
            const res = await getEvents();
            setEvents(res);
        };
        fetchEvents();
    }, [])
    return ( 
        <div>
            {
                events.map((e: TEvent) => (
                    <a key={e.id}>
                        <Event id={e.id}/>
                    </a>
                ))
            }
        </div>
    );
}
 
export default EventsDisplay;