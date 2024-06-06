"use client";
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { EventsTabContext } from "./EventsTabContext"


const EventButtons = () => {
    const { activeCategory, updateActiveCategory } = useContext(EventsTabContext);
  return (
    <section className="w-full flex flex-row items-center justify-center gap-2">
        <Button onClick={() => updateActiveCategory("all")} className={` transition-colors duration-300 ${activeCategory == "all" ? "bg-white border border-figma-orange text-figma-orange hover:bg-interactive-green hover:text-white hover:border-0" : "bg-interactive-green text-white hover:bg-interactive-green hover:bg-opacity-80 "}`}>All Categories</Button>
        <Button className=" bg-interactive-green text-white hover:bg-interactive-green hover:bg-opacity-80 transition-colors duration-300">Create Event</Button>
    </section>
  )
}

export default EventButtons