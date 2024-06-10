"use client";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { DeliveryFoodType } from "../order-meal/lib/interface";
import { toast } from "@/components/ui/use-toast";
import credentials from "next-auth/providers/credentials";

export const OrderMealContext = createContext({
  cartItems: [] as DeliveryFoodType[],
  openCart: false as boolean,
  isUploading: false as boolean,
  orderAmount: 0 as number,
  paymentOption: "" as string | null,
  credentials: "" as string | null,
  updateCartItems: (data: DeliveryFoodType[]) => {},
  handleOpenCart: () => {},
  updatePaymentOption: (data: string) => {},
  updateCredentials: (data: string | null) => {},
  confirmOrder: () => {},
});

export const OrderMealContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [cartItems, setCartItems] = useState<DeliveryFoodType[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [paymentOption, setPaymentOption] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<string | null>("");

  useEffect(() => {
    let amount = 0;
    cartItems.forEach((item) => {
      amount = amount + item.price * item.count;
    });
    setOrderAmount(amount);
  }, [cartItems]);

  const contextValues = useMemo(() => {
    const updateCartItems = (data: DeliveryFoodType[]) => {
      setCartItems(data);
    };

    const handleOpenCart = () => {
      setOpenCart(!openCart);
    };

    const updatePaymentOption = (option: string) => {
      setPaymentOption(option);
    };

    const updateCredentials = (data: string | null) => {
      setCredentials(data);
    };

    const confirmOrder = async () => {
      setIsUploading(true);
      try {
        const payload = {
          food: cartItems.map((item) => ({
            foodId: item._id,
            quantity: item.count,
          })),
          totalAmount: orderAmount,
          payment: {
            option: paymentOption,
            credentials: credentials,
          },
        };

        const response = await fetch("/api/order/create", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (response.status === 201) {
          toast({
            title: "Done!",
            description: "New Order Placed Successfully.",
          });
        } else {
          toast({
            title: "Alert!",
            description: "Something went wrong. Try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log("Failed to send order to BE: ", error);
        toast({
          title: "Confirm Order Failed!",
          description: "Check your internet connection and try again.",
          variant: "destructive",
        });
      }
      setIsUploading(false);
    };

    return {
      cartItems,
      openCart,
      isUploading,
      orderAmount,
      paymentOption,
      credentials,
      updateCartItems,
      handleOpenCart,
      updatePaymentOption,
      updateCredentials,
      confirmOrder,
    };
  }, [
    cartItems,
    openCart,
    isUploading,
    orderAmount,
    paymentOption,
    credentials,
  ]);
  return (
    <OrderMealContext.Provider value={contextValues}>
      {children}
    </OrderMealContext.Provider>
  );
};

export default OrderMealContextProvider;
