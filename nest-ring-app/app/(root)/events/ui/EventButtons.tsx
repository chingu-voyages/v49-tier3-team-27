"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { EventsTabContext } from "../../ui/EventsTabContext";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const EventButtons = () => {
  const router = useRouter();
  const { activeCategory, updateActiveCategory } = useContext(EventsTabContext);
  return (
    <section className="w-full flex flex-row items-center justify-center gap-2">
      <Button
        onClick={() => updateActiveCategory("all")}
        className={clsx(` transition-colors duration-300 `, {
          "bg-white border border-figma-orange text-figma-orange hover:bg-interactive-green hover:text-white hover:border-0":
            activeCategory === "all",
          "bg-interactive-green text-white hover:bg-interactive-green hover:bg-opacity-80 ":
            activeCategory != "all",
        })}
      >
        All Categories
      </Button>
      <Button
        onClick={() => router.push("/events/create")}
        className=" bg-interactive-green text-white hover:bg-interactive-green hover:bg-opacity-80 transition-colors duration-300"
      >
        Create Event
      </Button>
    </section>
  );
};

export default EventButtons;
