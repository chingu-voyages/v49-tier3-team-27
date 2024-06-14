"use client";
import Image from "next/image";
import { useContext } from "react";
import { EventsTabContext } from "../../ui/EventsTabContext";

const labels = [
  {
    name: "Birthday",
    slug: "birthday",
    icon: "/events/birthday-icon.svg",
  },
  {
    name: "Dowry",
    slug: "dowry",
    icon: "/events/dowry-icon.svg",
  },
  {
    name: "Wedding",
    slug: "wedding",
    icon: "/events/wedding-icon.svg",
  },
  {
    name: "Fundraising",
    slug: "fundraising",
    icon: "/events/fundraising-icon.svg",
  },
  {
    name: "Baby Shower",
    slug: "baby-shower",
    icon: "/events/baby-shower-icon.svg",
  },
  {
    name: "Business",
    slug: "business",
    icon: "/events/business-icon.svg",
  },
];

const EventCategories = () => {
  const { activeCategory, updateActiveCategory } = useContext(EventsTabContext);
  return (
    <section className="w-full flex flex-col gap-2 p-3">
      <div className="w-full flex flex-row gap-3 justify-around max-sm:overflow-hidden max-sm:overflow-x-auto">
        {labels.map((category) => (
          <button
            type="button"
            onClick={() => updateActiveCategory(`${category.slug}`)}
            key={`events-category-${category.name}`}
            className={`flex flex-col gap-1 items-center justify-between hover:bg-figma-brown hover:bg-opacity-10 p-2 rounded-sm transition-colors duration-300 ${
              activeCategory == category.slug && " bg-figma-brown bg-opacity-10"
            }`}
          >
            <Image src={category.icon} alt="" width={39} height={31} />
            <span className="text-xs">{category.name}</span>
          </button>
        ))}
      </div>

      <hr className=" w-full h-[2px]" />
    </section>
  );
};

export default EventCategories;
