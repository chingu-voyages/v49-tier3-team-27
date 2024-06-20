import React, { ReactNode } from "react";
import OrderMealContextProvider from "../ui/OrderMealContext";

const OrderMealLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="w-full h-full">
      <OrderMealContextProvider>{children}</OrderMealContextProvider>
    </div>
  );
};

export default OrderMealLayout;
