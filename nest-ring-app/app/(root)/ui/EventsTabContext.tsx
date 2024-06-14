"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { EventsObjType } from "../events/ui/interface";
import { useSession } from "next-auth/react";

export const EventsTabContext = createContext({
  isLoading: true as boolean,
  events: [] as EventsObjType[],
  activeCategory: "" as string,
  updateActiveCategory: (category: string) => {},
});

export const EventsTabContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { data } = useSession() as any;
  const [events, setEvents] = useState<EventsObjType[] | any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
    fetchEvents();
  });

  const contextValues = useMemo(() => {
    const updateActiveCategory = (category: string) => {
      setActiveCategory(category);
    };

    return {
      isLoading,
      events,
      activeCategory,
      updateActiveCategory,
    };
  }, [isLoading, events, activeCategory]);
  return (
    <EventsTabContext.Provider value={contextValues}>
      {children}
    </EventsTabContext.Provider>
  );
};
