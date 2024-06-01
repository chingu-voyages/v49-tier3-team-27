import { fetchDeliveryFood } from "../lib/utils";
import Image from "next/image";
import BuyAddToCartBtns from "./ui/BuyAddToCartBtns";
import PrevPageBtn from "./ui/PrevPageBtn";
import { DeliveryFoodType } from "../lib/interface";

const SearchTerm = async ({
  params: { searchTerm },
}: Readonly<{ params: { searchTerm: string } }>) => {
  const result = (await fetchDeliveryFood(searchTerm)) as DeliveryFoodType;

  const foodObj = {
    category: result.category,
    subCategory: result.subCategory,
    name: result.name,
    slug: result.slug,
    price: result.price,
    imageUrl: result.imageUrl,
    description: result.description,
    calories: result.calories,
    rating: result.rating,
    isChefsChoice: result.isChefsChoice,
    count: result.count,
  };

  return (
    <main className="w-full h-full flex flex-col gap-10 bg-white p-2 pb-20 px-12 rounded-t-xl overflow-hidden overflow-y-auto relative">
      <PrevPageBtn />
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
        <div className=" flex flex-row justify-between">
          {/* Price */}
          <span className=" text-2xl">Ksh. {foodObj.price}</span>
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

        {/* Interactivity */}
        <BuyAddToCartBtns foodObj={foodObj} />

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
