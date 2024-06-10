"use client";

import { useContext, useEffect, useState } from "react";
import { CheckCheck, PlusIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { EventFoodType } from "@/app/(root)/order-meal/lib/interface";
import { CreateEventContext } from "./CreateEventContext";

const AddEventFoodToCart = ({
  foodObj,
}: Readonly<{ foodObj: EventFoodType }>) => {
  const { cartItems, updateCartItems } = useContext(CreateEventContext);
  const [itemIsInCart, setItemIsInCart] = useState(false);

  useEffect(() => {
    const itemFound = cartItems.find((item: any) => item.slug == foodObj.slug);
    if (itemFound) {
      setItemIsInCart(true);
    } else {
      setItemIsInCart(false);
    }
  }, [cartItems, foodObj.slug]);

  return (
    <div className=" mt-3">
      {itemIsInCart ? (
        <div className=" text-interactive-green">
          <CheckCheck />
        </div>
      ) : (
        <button
          onClick={() => {
            updateCartItems([...cartItems, foodObj]);
            toast({
              title: "New Order!",
              description: `${foodObj.name} has been added to Event cart`,
            });
          }}
          disabled={itemIsInCart}
          className=" p-1 rounded-lg bg-interactive-green text-white hover:scale-105 hover:bg-opacity-95 transition-all duration-300"
        >
          <PlusIcon className=" w-[15px] h-[15px]" />
        </button>
      )}
    </div>
  );
};

export default AddEventFoodToCart;
