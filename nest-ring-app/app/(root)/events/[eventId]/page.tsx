"use client";

import { useContext, useEffect, useState } from "react";
import { EventsTabContext } from "../ui/EventsTabContext";
import { EventsObjType } from "../ui/interface";
import Image from "next/image";
import PrevPageBtn from "../../order-meal/[searchTerm]/ui/PrevPageBtn";

const nameMap = [
  {
    eventType: "birthday",
    eventName: "Birthday Event",
  },
  {
    eventType: "dowry",
    eventName: "Dowry Event",
  },
  {
    eventType: "wedding",
    eventName: "Wedding Event",
  },
  {
    eventType: "baby-shower",
    eventName: "Baby Shower Event",
  },
  {
    eventType: "fundraising",
    eventName: "Fundraising Event",
  },
  {
    eventType: "business",
    eventName: "Business Event",
  },
  {
    eventType: "other",
    eventName: "Event",
  },
]
const EventViewPage = ({ params: { eventId } }: Readonly<{params: { eventId: string }}>) => {
    const {events} = useContext(EventsTabContext);
    const [activeEvent, setActiveEvent] = useState<EventsObjType | null>(null);

    useEffect(() => {
      const actEvt = events.find(event => event.eventId = eventId);
      actEvt && setActiveEvent(actEvt);

    }, [events]);

  return (
    <main className=" w-full h-[91%] max-md:h-full max-md:pb-12 bg-white rounded-t-lg p-4 overflow-hidden overflow-y-auto">
      {activeEvent ? (
        <div className="w-full h-full flex flex-col items-center gap-2 sm:p-5">
          <div className="w-full sm:pl-5 pl-8 flex flex-row justify-start">
            <PrevPageBtn />
          </div>
          <span className=" text-center font-bold font-serif text-4xl text-figma-brown">{nameMap.find(ent => ent.eventType == activeEvent.category)?.eventName || "Event"}</span>
          <span className=" font-bold text-figma-brown text-xl text-center">{activeEvent.subject}</span>
          <span className=" text-sm">{activeEvent.description}</span>
          <Image 
            src={activeEvent.imageUrl || "/events/event-photo-thumbnail.png"}
            alt=""
            width={700}
            height={700}
            className="max-w-[400px] max-sm:max-w-[250px] h-auto"
          />

          <div>

          </div>
        </div>
      ) : (
        <span className="font-bold text-sm">Event not found; Check again later.</span>
      )}
    </main>
  )
}

export default EventViewPage