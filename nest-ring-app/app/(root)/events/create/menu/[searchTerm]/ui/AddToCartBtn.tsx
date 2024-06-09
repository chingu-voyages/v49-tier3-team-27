"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { EventFoodType } from "@/app/(root)/order-meal/lib/interface";
import { CreateEventContext } from "../../../ui/CreateEventContext";

const AddToCartBtn = ({ foodObj }: Readonly<{ foodObj: EventFoodType }>) => {
  const { cartItems, updateCartItems } = useContext(CreateEventContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const itemFound = cartItems.find((item) => item.slug === foodObj.slug);
    if (itemFound) {
      setIsAddedToCart(true);
    }
  }, [cartItems, foodObj]);

  return (
    <Button
      onClick={() => {
        updateCartItems([...cartItems, foodObj]);
        toast({
          title: "Cart",
          description: `${foodObj.name} has been added to the Event cart`,
        });
      }}
      disabled={isAddedToCart}
      className={` border-2 border-interactive-green text-interactive-green bg-transparent hover:bg-transparent hover:scale-105 transition-transform duration-700 `}
    >
      {isAddedToCart ? "Added to cart" : "Add To Cart"}
    </Button>
  );
};

export default AddToCartBtn;
