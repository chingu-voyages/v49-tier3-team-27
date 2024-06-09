import Image from "next/image";
import { eventMenu } from "../lib/eventMenu";
import { CategoryItems } from "../lib/interface";
import { getEventMenu } from "../lib/utils";
import Link from "next/link";
import AddToCartCheckBtn from "./AddToCartCheckBtn";

const EventsMenu = async () => {
  const eventMenu = (await getEventMenu()) as CategoryItems[];

  return (
    <section className="w-full h-full flex flex-col mt-5 mb-20 gap-7">
      {/* Menu */}
      <div className="w-full h-full flex flex-col items-start gap-6 overflow-hidden px-2">
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
                      <Link href={`/order-meal/${foodObj.slug}`}>
                        <span className=" font-semibold text-md hover:underline">
                          {foodObj.name}
                        </span>
                      </Link>
                    </div>
                    <div className=" flex flex-row justify-between items-end">
                      {/* Price */}
                      <span className="text-lg">Ksh. {foodObj.price}</span>
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
    </section>
  );
};

export default EventsMenu;
