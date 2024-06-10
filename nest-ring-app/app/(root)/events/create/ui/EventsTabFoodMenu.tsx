"use client";
import { CategoryItems } from "@/app/(root)/order-meal/lib/interface";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import LoadingUI from "@/app/LoadingUI";
import AddEventFoodToCart from "./AddEventFoodToCart";

const EventsTabFoodMenu = () => {
  const [eventMenu, setEventMenu] = useState<CategoryItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEventMenu() {
      try {
        const response = await fetch("/api/events/fetch/events-menu");

        if (response.status === 200) {
          const menuData = (await response.json()) as CategoryItems[];
          setEventMenu(menuData);
        } else {
          toast({
            title: "Error!",
            description: "Failed to fetch Events menu. Try Again later.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Error getting Events Menu: ", error);
        toast({
          title: "Alert!",
          description: "Reconnect to the internet and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }

    fetchEventMenu();
  }, []);

  return (
    <div className="w-full flex flex-col gap-7 overflow-hidden overflow-y-auto">
      {/* Menu */}
      {isLoading ? (
        <LoadingUI />
      ) : (
        <div className="w-full h-full flex flex-col items-start gap-6 overflow-hidden px-2 overflow-y-auto">
          {eventMenu.length < 1 && (
            <span className="w-full text-md font-bold text-center">
              Sorry, the Menu has not been Updated yet!
            </span>
          )}
          {eventMenu?.map((category) => (
            <div
              key={`${category.name}-${category.values.length}-${category.values[0].name}`}
              id={`category-${category.name}`}
              className="w-full flex flex-col gap-2 items-start shrink-0"
            >
              <label
                htmlFor={`category-${category.name}`}
                className=" lg:text-5xl md:text-3xl text-2xl font-semibold self-center font-serif"
              >
                {category.name}
              </label>

              <div className=" w-full flex flex-row items-center gap-3 overflow-hidden md:hover:overflow-x-auto max-md:overflow-x-auto shrink-0">
                {category.values.map((foodObj) => (
                  <div
                    key={`${foodObj.name}-${category.name}-${foodObj.name.length}`}
                    className=" w-[200px] h-[220px] border hover:border-figma-brown border-b-4 shrink-0 rounded-sm rounded-t-lg transition-colors duration-300 hover:text-figma-brown "
                  >
                    {/* Food image */}
                    <div className=" w-full h-1/2">
                      <Image
                        src={foodObj.imageUrl || "/order-meal/food-image.png"}
                        alt=""
                        width={500}
                        height={500}
                        className="w-full h-full rounded-t-lg"
                      />
                    </div>
                    {/* metadata */}
                    <div className="w-full h-1/2 p-2 flex flex-col justify-between">
                      <div className="flex flex-row items-start justify-between">
                        <Link
                          href={`/events/create/menu/${foodObj.slug}`}
                          //   target="_blank"
                        >
                          <span className=" font-semibold text-md hover:underline">
                            {foodObj.name}
                          </span>
                        </Link>
                        <AddEventFoodToCart foodObj={foodObj} />
                      </div>
                      <div className=" flex flex-row justify-between items-end">
                        {/* Price */}
                        <span className="text-sm">
                          Ksh. {foodObj.price} per unit
                        </span>
                        {/* Rating */}
                        <div className=" flex flex-col items-center gap-1">
                          <div className=" flex flex-row items-center gap-1 ">
                            <Image
                              src={"/order-meal/icons/star-icon.svg"}
                              alt=""
                              width={15}
                              height={15}
                            />
                            <span className=" text-xs">{foodObj.rating}</span>
                          </div>
                          <div className=" flex flex-row items-center ">
                            <Image
                              src={"/order-meal/icons/calories-icon.png"}
                              alt=""
                              width={30}
                              height={30}
                            />
                            <span className=" text-xs -ml-1">
                              {foodObj.calories}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsTabFoodMenu;
