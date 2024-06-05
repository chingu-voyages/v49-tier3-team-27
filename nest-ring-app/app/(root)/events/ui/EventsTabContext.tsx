"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { EventsObjType } from "./interface";

export const EventsTabContext = createContext({});

const singleEvent = [{
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject: "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description: "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "birthday",
    creator: {
        userId: "Lxun2$ms91%0u5$!!%7LongId",
        imageUrl: null,
        name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.9580],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
        {
        userId:"Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1"
    },
        {
        userId:"Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2"
    },
        {
        userId:"Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4"
    },
    ],
    isOpenToAll: false,
},]

export const EventsTabContextProvider = ({children}: Readonly<{children: ReactNode}>) => {
    const [events, setEvents] = useState<EventsObjType[] | any[]>([]);

    useEffect(() => {
        setEvents([...singleEvent])
    }, [])
    const contextValues = useMemo(() => {

        return {
            events
        }
    }, [events])
    return <EventsTabContext.Provider value={contextValues}>
        {children}
    </EventsTabContext.Provider>
}