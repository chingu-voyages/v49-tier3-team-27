"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useContext } from "react";
import cartIcon from "@/public/order-meal/icons/cart-icon.svg";
import { MinusIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { OrderMealContext } from "../../ui/OrderMealContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartPopUpDialog = () => {
  const router = useRouter();
  const { cartItems, openCart, updateCartItems, handleOpenCart } =
    useContext(OrderMealContext);

  const handleAggregateCount = (slug: string) => {
    const modifiedCart = cartItems.map((obj) => {
      if (obj.slug == slug) {
        return { ...obj, count: obj.count + 1 };
      } else {
        return obj;
      }
    });
    updateCartItems([...modifiedCart]);
  };

  const handleReduceCount = (slug: string) => {
    const modifiedCart = cartItems.map((obj) => {
      if (obj.slug == slug && obj.count > 1) {
        return { ...obj, count: obj.count - 1 };
      } else {
        return obj;
      }
    });
    updateCartItems([...modifiedCart]);
  };

  const handleRemoveFood = (slug: string) => {
    let deletedItem = cartItems.find((item) => item.slug == slug);
    const modifiedCart = cartItems.filter((obj) => obj.slug != slug);

    if (modifiedCart && deletedItem) {
      updateCartItems([...modifiedCart]);
      toast({
        title: "Cart Item Deleted!",
        description: `${deletedItem.name} Removed from cart!`,
      });
    } else {
      toast({
        title: "Cart Operation Error!",
        description: `Failed to delete ${slug} from cart list`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={openCart} onOpenChange={handleOpenCart}>
      <DialogTrigger asChild>
        <button aria-label="cart items">
          <Image src={cartIcon} alt="" width={30} height={40} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            Modify your order here and stress free
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[50vh] overflow-hidden overflow-y-auto bg-white flex flex-col gap-3">
          {cartItems.map((foodObj) => (
            <div
              key={foodObj.slug}
              className=" w-full h-[100px] flex flex-row gap-3 items-start"
            >
              <Image
                src={foodObj.imageUrl || "/order-meal/food-image.png"}
                alt=""
                width={100}
                height={100}
                className=" rounded-sm"
              />
              <div className=" w-full flex flex-row items-center justify-between">
                <div className="flex flex-col justify-between ">
                  {/* food name */}
                  <span className=" font-bold text-md">{foodObj.name}</span>
                  <div className=" flex flex-row gap-2 text-sm">
                    {/* price x qty */}
                    <span>
                      Ksh. {foodObj.price} x {foodObj.count}
                    </span>
                    {/* total */}
                    <span className=" font-bold">
                      Ksh {foodObj.price * foodObj.count}
                    </span>
                  </div>
                </div>

                <div className=" flex flex-col gap-1 items-end">
                  <Button
                    size={"icon"}
                    onClick={() => handleRemoveFood(foodObj.slug)}
                    className=" h-[25px] p-[11px] bg-transparent  hover:bg-transparent text-red-500 hover:bg-interactive-green hover:bg-opacity-20"
                  >
                    <Trash2Icon />
                  </Button>
                  <div className=" flex flex-row gap-0">
                    <Button
                      size={"icon"}
                      onClick={() => handleAggregateCount(foodObj.slug)}
                      className="  h-[25px] p-[11px] bg-transparent hover:bg-interactive-green hover:bg-opacity-20 hover:text-figma-brown text-interactive-green "
                    >
                      <PlusIcon />
                    </Button>
                    <Button
                      size={"icon"}
                      onClick={() => handleReduceCount(foodObj.slug)}
                      className=" h-[25px] p-[11px] bg-transparent hover:bg-interactive-green hover:bg-opacity-20 hover:text-figma-brown text-interactive-green "
                    >
                      <MinusIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            disabled={cartItems.length < 1}
            onClick={() => {
              router.push("/order-meal/checkout");
            }}
            className=" bg-interactive-green hover:bg-interactive-green hover:bg-opacity-80"
          >
            Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SearchCartBar = () => {
  const { cartItems } = useContext(OrderMealContext);
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
          {cartItems.length}
        </span>
        <CartPopUpDialog />
      </div>
    </section>
  );
};

export default SearchCartBar;
