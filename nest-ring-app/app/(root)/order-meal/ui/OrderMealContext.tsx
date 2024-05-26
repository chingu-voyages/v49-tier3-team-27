"use client";
import { createContext, ReactNode, useMemo } from "react";

export const OrderMealContext = createContext({});

export const OrderMealContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const contextValues = useMemo(() => {
    return {};
  }, []);
  return (
    <OrderMealContext.Provider value={contextValues}>
      {children}
    </OrderMealContext.Provider>
  );
};

export default OrderMealContextProvider;
