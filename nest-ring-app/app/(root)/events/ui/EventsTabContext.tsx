"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { EventsObjType } from "./interface";
import { useSession } from "next-auth/react";

export const EventsTabContext = createContext({
  events: [] as EventsObjType[],
  activeCategory: "" as string,
  updateActiveCategory: (category: string) => {},
});

const singleEvent = [
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "birthday",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "lfigigiLongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "dowry",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "wedding",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "fundraising",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "baby-shower",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "business",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
  {
    eventId: "Lxun2$ms91%0u5$!!%^LongId",
    subject:
      "Other Sharing Memorable moments as we are celebrating Joshua's 13th Birthday.",
    description:
      "On the Sunday of February 25 2024; Joshua's birthday will be held as heriri village, which is next to All-Saints Church. All Church School and teen age Kids are welcome. Meals will be in lots and Entertainment like Bouncing-Castle, Party DJ, and more will be entirging. The Event will start from 10:00 am and end at 5:00 pm. For more information, contact Rose at +254793562356. Welcome!",
    category: "other",
    creator: {
      userId: "Lxun2$ms91%0u5$!!%7LongId",
      imageUrl: null,
      name: "Creators Name",
    },
    createdAt: null,
    updatedAt: null,
    location: [0.4371, 36.958],
    imageUrl: null,
    eventDate: null,
    likeCount: 0,
    fundSupport: 100,
    fundFee: null,
    invitedGuests: [
      {
        userId: "Lxun2$ms91%0u5$!!%2LongId",
        imageUrl: null,
        name: "Guest 1",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%gLongId",
        imageUrl: null,
        name: "Guest 2",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLongId",
        imageUrl: null,
        name: "Guest 4",
      },
      {
        userId: "Lxun2$ms91%su5$!!%lLongId",
        imageUrl: null,
        name: "Guest 5",
      },
      {
        userId: "Lxun2$ms91%0u5$!!%lLohgId",
        imageUrl: null,
        name: "Guest 6",
      },
      {
        userId: "Lxun2$mb91%0u5$!?%lLongId",
        imageUrl: null,
        name: "Guest 7",
      },
    ],
    isOpenToAll: false,
  },
];

export const EventsTabContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { data } = useSession() as any;
  const [events, setEvents] = useState<EventsObjType[] | any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `/api/events/fetch/events-sessions?userId=${data?.user.userId}`
        );

        if (response.status === 200) {
          const events = (await response.json()) as EventsObjType[];
          setEvents([...events]);
        }
      } catch (error) {
        console.log("UI Failed to get Events from api: ", error);
      }
    }

    fetchEvents();
  }, []);

  const contextValues = useMemo(() => {
    const updateActiveCategory = (category: string) => {
      setActiveCategory(category);
    };

    return {
      events,
      activeCategory,
      updateActiveCategory,
    };
  }, [events, activeCategory]);
  return (
    <EventsTabContext.Provider value={contextValues}>
      {children}
    </EventsTabContext.Provider>
  );
};
