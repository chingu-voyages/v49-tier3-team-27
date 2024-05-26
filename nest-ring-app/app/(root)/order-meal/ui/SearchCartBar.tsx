"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import cartIcon from "@/public/order-meal-icons/cart-icon.svg";
import { SearchIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SearchCartBar = () => {
  return (
    <section className="w-full flex flex-row justify-between gap-2 px-2">
      <div className=" grow relative flex items-center ">
        <Input
          placeholder="Search by meal name"
          className=" pl-10 peer text-sm focus:outline-figma-brown"
        />
        <SearchIcon className=" absolute ml-3 text-gray-400 peer-focus:text-figma-brown" />
      </div>
      <div className=" relative ">
        <span className=" absolute -top-2 -right-3 py-[2px] px-1 text-white bg-figma-orange rounded-full text-xs">
          0
        </span>
        <button
          aria-label="cart items"
          aria-atomic
          onClick={() => {
            toast({
              title: "Cart",
              description: "Cart is still under development!",
            });
          }}
        >
          <Image src={cartIcon} alt="" width={30} height={40} />
        </button>
      </div>
    </section>
  );
};

export default SearchCartBar;
