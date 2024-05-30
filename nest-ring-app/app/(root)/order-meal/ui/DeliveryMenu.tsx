import Image from "next/image";
import { getDeliveryMenu } from "../lib/utils";
import { DeliveryMenuType } from "../lib/interface";
// import InsertToMenuDBBtn from "./InsertBtn";

const DeliveryMenu = async () => {
  const deliveryMenu = (await getDeliveryMenu()) as DeliveryMenuType;

  return (
    <section className="w-full h-full flex flex-col mt-5 mb-20 gap-7">
      {/* <InsertToMenuDBBtn /> */}
      {/* Chefs choice */}
      <div className=" w-full flex items-center justify-center">
        <div className="w-[350px] h-52 bg-figma-orange rounded-2xl flex flex-row justify-between gap-3 p-3 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ease-in">
          <Image
            src={
              deliveryMenu?.chefsChoice?.imageUrl ||
              "/order-meal/food-image.png"
            }
            alt=""
            width={500}
            height={500}
            className="w-[45%] h-auto rounded-lg"
          />
          <div className="w-1/2 text-black flex flex-col justify-between items-start overflow-y-auto">
            <h3 className=" font-bold text-xl text-center self-center underline mb-2">
              Chefs Choice
            </h3>
            <div className=" flex flex-col">
              <h4 className="font-bold text-lg">
                {deliveryMenu.chefsChoice.name}
              </h4>
              <span>{deliveryMenu?.chefsChoice.description}</span>
            </div>
            <span className=" font-bold text-2xl">
              Ksh. {deliveryMenu?.chefsChoice.price}
            </span>
            <div className=" flex flex-row items-center gap-1 self-end -mt-2">
              <Image
                src={"/order-meal/icons/star-icon.svg"}
                alt=""
                width={15}
                height={15}
              />
              <span>{deliveryMenu.chefsChoice.rating}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className="w-full h-full flex flex-col items-start gap-6 overflow-hidden px-2">
        {deliveryMenu.categories.map((category) => (
          <div
            key={category.name}
            id={`category-${category.name}`}
            className="w-full flex flex-col gap-2 items-start shrink-0"
          >
            <label
              htmlFor={`category-${category.name}`}
              className=" text-5xl font-semibold self-center font-serif"
            >
              {category.name}
            </label>
            {category.subCategories.map((subCategory) => (
              <div
                key={`${category.name}-${subCategory.name}`}
                id={`subCategory-${category.name}-${subCategory.name}`}
                className="w-full flex flex-col gap-2"
              >
                <label
                  htmlFor={`subCategory-${category.name}-${subCategory.name}`}
                  className=" text-xl font-bold font-serif"
                >
                  {subCategory.name}
                </label>
                <div className=" w-full flex flex-row items-center gap-3 overflow-hidden md:hover:overflow-x-auto max-md:overflow-x-auto shrink-0">
                  {subCategory.values.map((foodObj) => (
                    <div
                      key={`${category.name}-${subCategory.name}-${foodObj.name}`}
                      className="w-[200px] h-[220px] border hover:border-figma-brown border-b-4 shrink-0 rounded-sm rounded-t-lg transition-colors duration-300 hover:text-figma-brown cursor-pointer"
                    >
                      <div className=" w-full h-1/2">
                        <Image
                          src={foodObj.imageUrl || "/order-meal/food-image.png"}
                          alt=""
                          width={500}
                          height={500}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full h-1/2 p-2 flex flex-col justify-between">
                        <span className=" font-semibold text-md">
                          {foodObj.name}
                        </span>
                        <div className=" flex flex-row justify-between">
                          <span className=" text-lg">Ksh. {foodObj.price}</span>
                          <div className=" flex flex-row items-center gap-1 self-end">
                            <Image
                              src={"/order-meal/icons/star-icon.svg"}
                              alt=""
                              width={15}
                              height={15}
                            />
                            <span className=" text-xs">{foodObj.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryMenu;
