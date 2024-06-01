"use client";
import { createContext, ReactNode, useMemo, useState } from "react";
import { DeliveryFoodType } from "../order-meal/lib/interface";

export const OrderMealContext = createContext({
  cartItems: [] as DeliveryFoodType[],
  openCart: false as boolean,
  updateCartItems: (data: DeliveryFoodType[]) => {},
  handleOpenCart: () => {},
});

export const OrderMealContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [cartItems, setCartItems] = useState<DeliveryFoodType[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const contextValues = useMemo(() => {
    const updateCartItems = (data: DeliveryFoodType[]) => {
      setCartItems(data);
    };

    const handleOpenCart = () => {
      setOpenCart(!openCart);
    };

    return {
      cartItems,
      openCart,
      updateCartItems,
      handleOpenCart,
    };
  }, [cartItems, openCart]);
  return (
    <OrderMealContext.Provider value={contextValues}>
      {children}
    </OrderMealContext.Provider>
  );
};

export default OrderMealContextProvider;
