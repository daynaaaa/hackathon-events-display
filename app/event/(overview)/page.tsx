import { getEvents } from "@/lib/api";
import { TEvent } from "@/lib/types";
import { useEffect, useState } from "react";
import Event from "@/components/event";

const Events = () => {
    const [events, setEvents] = useState<TEvent[]>([]); // Array of all events
    
    // Fetch Events array
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
 
export default Events;