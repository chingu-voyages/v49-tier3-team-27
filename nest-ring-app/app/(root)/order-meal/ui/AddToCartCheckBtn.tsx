"use client";

import { useContext, useEffect, useState } from "react";
import { OrderMealContext } from "../../ui/OrderMealContext";
import { CheckCheck, PlusIcon } from "lucide-react";
import { DeliveryFoodType, EventFoodType } from "../lib/interface";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const AddToCartCheckBtn = ({
  foodObj,
}: Readonly<{ foodObj: DeliveryFoodType }>) => {
  const { cartItems, updateCartItems, handleOpenCart } =
    useContext(OrderMealContext);
  const [itemIsInCart, setItemIsInCart] = useState(false);

  useEffect(() => {
    const itemFound = cartItems.find((item) => item.slug == foodObj.slug);
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
              title: "Cart",
              description: `${foodObj.name} has been added to cart`,
              action: (
                <ToastAction
                  altText="checkout"
                  onClick={() => {
                    handleOpenCart();
                    // router.back();
                  }}
                  className="bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80 text-white"
                >
                  Checkout Cart
                </ToastAction>
              ),
              duration: 5000,
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

export default AddToCartCheckBtn;
