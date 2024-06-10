import Image from "next/image";
import BuyAddToCartBtns from "@/app/(root)/order-meal/[searchTerm]/ui/BuyAddToCartBtns";
import PrevPageBtn from "@/app/(root)/order-meal/[searchTerm]/ui/PrevPageBtn";
import { EventFoodType } from "@/app/(root)/order-meal/lib/interface";
import { fetchEventFood } from "@/app/(root)/order-meal/lib/utils";
import AddToCartBtn from "./ui/AddToCartBtn";

const SearchTerm = async ({
  params: { searchTerm },
}: Readonly<{ params: { searchTerm: string } }>) => {
  const eventMenu = (await fetchEventFood(searchTerm)) as EventFoodType;

  const foodObj = {
    category: eventMenu.category,
    name: eventMenu.name,
    slug: eventMenu.slug,
    price: eventMenu.price,
    imageUrl: eventMenu.imageUrl,
    description: eventMenu.description,
    calories: eventMenu.calories,
    rating: eventMenu.rating,
    count: eventMenu.count,
    equivalence: eventMenu.equivalence,
  };

  return (
    <main className="w-full h-full max-sm:h-[91%] flex flex-col gap-10 bg-white p-2 pb-20 sm:px-12 px-5 rounded-t-xl overflow-hidden overflow-y-auto relative">
      <div className="-ml-5">
        <PrevPageBtn />
      </div>
      <div className=" w-full h-[380px] flex justify-end -mt-10">
        <Image
          src={foodObj.imageUrl || "/order-meal/food-image.png"}
          alt=""
          width={1400}
          height={1000}
          className="w-auto h-full"
        />
      </div>

      {/* metadata */}
      <div className="w-full h-1/2 p-2 flex flex-col gap-4">
        <span className=" font-bold text-5xl">{foodObj.name}</span>
        <div className=" flex flex-row items-center justify-between">
          {/* Price */}
          <span className=" md:text-2xl sm:text-xl text-lg">
            Ksh. {foodObj.price}
            {foodObj?.equivalence && " per unit"}
          </span>
          {/* Rating */}
          <div className=" flex flex-row gap-5">
            <div className=" flex flex-row items-center gap-1 ">
              <Image
                src={"/order-meal/icons/star-icon.svg"}
                alt=""
                width={20}
                height={20}
              />
              <span className=" text-lg">{foodObj.rating}</span>
            </div>
            <div className=" flex flex-row items-center ">
              <Image
                src={"/order-meal/icons/calories-icon.png"}
                alt=""
                width={40}
                height={40}
              />
              <span className=" text-lg -ml-2">{foodObj.calories}</span>
            </div>
          </div>
        </div>
        {foodObj?.equivalence && (
          <span>1 unit is equivalent to: {foodObj.equivalence}</span>
        )}
        {/* Interactivity */}
        <AddToCartBtn foodObj={foodObj} />

        {/* Description */}
        <div className=" flex flex-col">
          <label htmlFor="food-description" className="text-md font-bold">
            Description
          </label>
          <span className=" text-md ">{foodObj.description}</span>
        </div>
      </div>
    </main>
  );
};

export default SearchTerm;
