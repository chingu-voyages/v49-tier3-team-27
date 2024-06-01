"use client";

import { useContext, useEffect, useState } from "react";
import { OrderMealContext } from "../../ui/OrderMealContext";
import { useSession } from "next-auth/react";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { data } = useSession() as any;
  const { cartItems } = useContext(OrderMealContext);
  const [orderAmount, setOrderAmount] = useState(0);

  useEffect(() => {
    console.log(data);
    let amount = 0;
    cartItems.forEach((item) => {
      amount = amount + item.price;
    });
    setOrderAmount(amount);
  }, [cartItems, data]);
  return (
    <main className=" w-full h-full pb-20 flex flex-col gap-5 overflow-hidden overflow-y-auto">
      {/* Customer Address */}
      <section
        id="checkout-customer-address"
        className="w-full bg-white rounded-lg p-2 flex flex-col"
      >
        <label
          htmlFor="checkout-customer-address"
          className="flex flex-row gap-4 items-center"
        >
          <CheckIcon className="w-[20px] h-[20px] text-interactive-green" />{" "}
          <span className="font-bold text-sm">1. CUSTOMER ADDRESS</span>
        </label>
        <hr className="w-full h-[2px] bg-slate-100" />
        <div>
          <span>{data?.user?.name}</span>
          <span>{data?.user?.location?.deliveryAddress}</span>
        </div>
      </section>
      {/* Cart Summary */}
      <section
        id="checkout-customer-address"
        className="w-full bg-white rounded-lg p-2 flex flex-col"
      >
        <label
          htmlFor="checkout-customer-address"
          className="flex flex-row gap-4 items-center"
        >
          <CheckIcon className="w-[20px] h-[20px] text-interactive-green" />{" "}
          <span className="font-bold text-sm">2. CART SUMMARY</span>
        </label>
        <hr className="w-full h-[2px] bg-slate-100" />
        <div className="w-full flex flex-col gap-2 mt-3">
          {cartItems.map((item) => (
            <div
              key={item.slug}
              className=" rounded-md border  p-2 flex flex-row gap-2"
            >
              <Image
                src={item.imageUrl || "/order-meal/food-image.png"}
                alt=""
                width={100}
                height={100}
                className=" rounded-sm"
              />
              <div className=" flex flex-col">
                <span className="font-semibold">{item.name}</span>
                <span>{item.description}</span>
                <span>Qty: {item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Order summary */}
      <section
        id="checkout-customer-address"
        className="w-full bg-white rounded-lg p-2 flex flex-col"
      >
        <label
          htmlFor="checkout-customer-address"
          className="flex flex-row gap-4 items-center"
        >
          <CheckIcon className="w-[20px] h-[20px] text-interactive-green" />{" "}
          <span className="font-bold text-sm">3. ORDER SUMMARY</span>
        </label>
        <hr className="w-full h-[2px] bg-slate-100" />
        <div className="w-full flex flex-col gap-2 mt-3">
          <div className=" flex flex-row justify-between">
            <span> Item&apos;s total({cartItems.length}) </span>
            <span>Ksh. {orderAmount}</span>
          </div>
          <div className=" flex flex-row justify-between">
            <span> Delivery Fee </span>
            <span>Ksh. 50/ Km</span>
          </div>
        </div>
        <div className=" flex flex-row items-end gap-5">
          {/* Mpesa Input */}
          <div className=" relative">
            <label
              htmlFor="mpesa-number-input"
              className=" text-xs font-semibold"
            >
              Mpesa Number
            </label>
            <Input
              id="mpesa-number-input"
              placeholder="7........"
              type="tel"
              className=" pl-12 text-sm"
            />
            <span className=" absolute bottom-[9px] left-3 bg text-sm">
              +254
            </span>
          </div>
          <Button
            disabled={cartItems.length < 1}
            onClick={() => {}}
            className=" bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80"
          >
            Confirm Order
          </Button>
        </div>
      </section>
      <Link
        href={"/order-meal"}
        className=" text-interactive-green hover:underline text-sm"
      >
        &lt; Go back to Menu
      </Link>
    </main>
  );
};

export default CheckoutPage;
