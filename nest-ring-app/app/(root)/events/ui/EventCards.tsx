"use client";
import { useContext } from "react";
import { EventsTabContext } from "./EventsTabContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";


const EventCards = () => {
    const {events, activeCategory} = useContext(EventsTabContext);
    const router = useRouter();
  return (
    <section className="  h-full w-full bg-white mt-3 px-5 sm:grid xl:grid-cols-3 sm:grid-cols-2 gap-2 md:overflow-hidden md:overflow-y-auto max-sm:flex max-sm:flex-col sm:items-center max-lg:px-10">
        {events.filter( obj => {
            if (activeCategory == "all") {
                return obj
            } else {
                return obj.category == activeCategory
            }
        }).map(event => (
            <div key={event.eventId} className="w-[250px] max-lg:w-[200px] h-[250px] max-lg:h-[200px] rounded-md relative shrink-0">
                <Image 
                    src={event.imageUrl || "/events/event-photo-thumbnail.png"}
                    alt=""
                    fill
                />
                {/* metadata */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-figma-brown pb-1 px-3 flex flex-col justify-end gap-1">
                    {/* attendees */}
                    <div className="flex flex-row items-center justify-between">
                        <Image 
                            src={event.creator.imageUrl || "/random-images/profile-avatar.png"}
                            alt={event.creator.name}
                            width={30}
                            height={30}
                            className=" bg-white rounded-full"
                        />
                        <div className=" flex flex-row">
                            {event.invitedGuests.slice(0, 3).map(guest => (
                                <Image
                                    src={guest.imageUrl || "/random-images/profile-avatar.png"}
                                    alt=""
                                    width={30}
                                    height={30}
                                    className=" bg-white rounded-full -ml-2"
                                />
                            ))}
                            {event.invitedGuests.length > 2 && (<div className="w-[30px] h-[30px] -ml-2 bg-figma-brown text-white rounded-full flex flex-row items-center justify-center text-xs gap-[2px] font-bold">
                                <span>+</span>
                                <span>{event.invitedGuests.length - 2}</span>
                            </div>)}
                        </div>
                    </div>
                    {/* subject */}
                    <span className="text-white text-sm line-clamp-2">{event.subject}</span>
                    {/* view event button */}
                    <div className="flex flex-row items-center justify-between">
                        <button>
                            <Image 
                                src={"/events/like-inactive-icon.svg"}
                                alt=""
                                width={20}
                                height={20}
                            />
                        </button>
                        <button onClick={() => {
                            router.push(`/events/${event.eventId}`)
                        }} className=" text-xs p-[2px] px-2 bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80 flex flex-row items-center justify-center gap-1 rounded-md text-white transition-colors duration-300">
                            <span>view event</span>
                            <MoveRight />
                        </button>
                    </div>
                    {/* location and monetization */}
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="text-white bg-slate-200 bg-opacity-50 rounded-md flex flex-row items-center justify-center gap-1 p-1">
                            <Image 
                                src={"/events/geo-location-pin-icon.svg"}
                                alt=""
                                width={15}
                                height={15}
                            />
                            <span className=" text-xs">City Name</span>
                        </div>
                        <div className="text-white bg-slate-200 bg-opacity-50 rounded-md flex flex-row items-center justify-center gap-1 p-1">
                            <Image 
                                src={"/events/money-icon.svg"}
                                alt=""
                                width={15}
                                height={15}
                            />
                            <span className=" text-xs">Ksh. {event.fundFee || event.fundSupport}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </section>
  )
}

export default EventCards