import React from "react";

const OrderAgainCard = () => {
  return (
    <section className=" w-full xl:h-[20vw] md:h-[25vw]  bg-white rounded-lg flex flex-col justify-between p-2">
      <span className=" font-bold text-md text-black">Order Again</span>
      <div className="w-full h-full flex flex-col justify-center">
        <span className=" font-light">
          You don&apos;t have any Food Order history
        </span>
      </div>
    </section>
  );
};

export default OrderAgainCard;
