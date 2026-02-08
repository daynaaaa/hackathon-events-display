"use client";

import EventsDisplay from "@/app/_components/eventsDisplay";
import Header from "@/app/_components/header";

export default function Home() {
  return (
    <div className="bg-sky-50 font-sans">
      <Header />
      <EventsDisplay />
    </div>
  );
}
