"use client";

import { useContext } from "react";
import { OrderMealContext } from "../../ui/OrderMealContext";
import { useSession } from "next-auth/react";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const CheckoutPage = () => {
  const { data } = useSession() as any;
  const {
    isUploading,
    cartItems,
    orderAmount,
    paymentOption,
    updatePaymentOption,
    updateCredentials,
    confirmOrder,
  } = useContext(OrderMealContext);

  return (
    <main className=" w-full h-full pb-20 flex flex-col gap-5 overflow-hidden overflow-y-auto">
      {/* Customer Address */}
      <section
        id="checkout-customer-address"
        className="w-full bg-white rounded-lg p-2 flex flex-col gap-2"
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
        className="w-full bg-white rounded-lg p-2 flex flex-col gap-2"
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
        className="w-full bg-white rounded-lg p-2 flex flex-col gap-3"
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

        <hr className="w-full h-[2px]" />

        <Select
          onValueChange={(value) => {
            updatePaymentOption(value);
            if (value == "cashOnDelivery") {
              updateCredentials(null);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a payment option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment options</SelectLabel>
              <SelectItem value="paypal">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Image
                    src={"/random-images/paypal-icon.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>PayPal</span>
                </div>
              </SelectItem>
              <SelectItem value="card">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Image
                    src={"/random-images/credit-card-icon.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Bank Card</span>
                </div>
              </SelectItem>
              <SelectItem value="mpesa">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Image
                    src={"/random-images/mpesa-icon.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Mpesa</span>
                </div>
              </SelectItem>
              <SelectItem value="cashOnDelivery">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Image
                    src={"/random-images/cash-on-delivery-icon.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span>Cash On Delivery</span>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {paymentOption !== null && (
          <div className=" flex flex-row items-end gap-5">
            {/* paypal Input */}
            {paymentOption == "paypal" && (
              <div className=" relative">
                <label
                  htmlFor="paypal-email-input"
                  className=" text-xs font-semibold"
                >
                  PayPal account
                </label>
                <Input
                  id="paypal-email-input"
                  type="email"
                  className=" pl-14 text-sm"
                />
                <span className=" absolute bottom-[9px] left-3 bg text-sm">
                  email:
                </span>
              </div>
            )}
            {/* Bank card input */}
            {paymentOption == "card" && (
              <div className=" relative">
                <label
                  htmlFor="bank-card-input"
                  className=" text-xs font-semibold"
                >
                  Bank Card
                </label>
                <Input
                  id="paypal-email-input"
                  type="email"
                  className=" pl-16 text-sm"
                />
                <span className=" absolute bottom-[9px] left-3 bg text-sm">
                  A/C No:
                </span>
              </div>
            )}
            {/* Mpesa Input */}
            {paymentOption == "mpesa" && (
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
            )}
            <Button
              disabled={cartItems.length < 1}
              onClick={confirmOrder}
              className=" bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80"
            >
              {isUploading ? (
                <Image
                  src={"/random-images/dot-loader.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
              ) : (
                <span>Confirm Order</span>
              )}
            </Button>
          </div>
        )}
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
