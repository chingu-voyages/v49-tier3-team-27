import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="w-full h-screen border rounded-lg outline-dashed -outline-offset-8 bg-white flex flex-col items-center justify-center gap-4 outline-figma-brown">
      <Image
        src={"/random-images/not-found.jpg"}
        alt=""
        width={50}
        height={50}
      />
      <span className="font-bold text-xl text-figma-orange">
        This resource is not found
      </span>
      <Link
        href={"/order-meal"}
        className=" bg-interactive-green hover:bg-interactive-green hover:scale-95 text-white rounded-md w-[100px] p-3 text-center no-underline"
      >
        Dismiss
      </Link>
    </section>
  );
};

export default NotFound;
