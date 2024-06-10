"use client";
import { useContext } from "react";
import { EventsTabContext } from "./EventsTabContext";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EventCards = () => {
  const { events, activeCategory } = useContext(EventsTabContext);
  const router = useRouter();
  return (
    <section className="w-full bg-white mt-3 px-10 flex flex-row flex-wrap max-md:justify-center gap-2 ">
      {events
        .filter((obj) => {
          if (activeCategory == "all") {
            return obj;
          } else {
            return obj.category == activeCategory;
          }
        })
        .map((event) => (
          <div
            key={event._id}
            className="w-[230px] h-[230px] max-lg:w-[200px] max-lg:h-[200px] rounded-md relative shrink-0"
          >
            <Image
              src={event.imageUrl ?? "/random-images/profile-banner.jpeg"}
              alt=""
              fill
            />
            {/* metadata */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-figma-brown pb-1 px-3 flex flex-col justify-end gap-1">
              {/* attendees */}
              <div className="flex flex-row items-center justify-between">
                <Image
                  src={
                    event.creator.imageUrl ??
                    "/random-images/profile-avatar.png"
                  }
                  alt={event.creator.name}
                  width={30}
                  height={30}
                  className=" bg-white rounded-full"
                />
                <div>
                  {event.isOpenToAll ? (
                    <span className="bg-white text-black rounded-full p-1 px-2 font-bold text-xs">
                      Everyone is Invited
                    </span>
                  ) : (
                    <div className=" flex flex-row">
                      {event.invitedGuests.slice(0, 3).map((guest) => (
                        <Image
                          key={guest.userId}
                          src={
                            guest.imageUrl ??
                            "/random-images/profile-avatar.png"
                          }
                          alt=""
                          width={100}
                          height={100}
                          className="w-[30px] h-[30px] bg-white rounded-full -ml-2 object-fill"
                        />
                      ))}
                      {event.invitedGuests.length > 2 && (
                        <div className="w-[30px] h-[30px] -ml-2 bg-figma-brown text-white rounded-full flex flex-row items-center justify-center text-xs gap-[2px] font-bold">
                          <span>+</span>
                          <span>{event.invitedGuests.length - 2}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* subject */}
              <span className="text-white text-sm line-clamp-2">
                {event.subject}
              </span>
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
                <button
                  onClick={() => {
                    router.push(`/events/${event._id}`);
                  }}
                  className=" text-xs p-[2px] px-2 bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80 flex flex-row items-center justify-center gap-1 rounded-md text-white transition-colors duration-300"
                >
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
                  <span className=" text-xs">{event.location}</span>
                </div>
                <div className="text-white bg-slate-200 bg-opacity-50 rounded-md flex flex-row items-center justify-center gap-1 p-1">
                  <Image
                    src={"/events/money-icon.svg"}
                    alt=""
                    width={15}
                    height={15}
                  />
                  {event.monetization.type != "off" && (
                    <span className=" text-xs">
                      Ksh. {event.monetization.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default EventCards;
