import React from "react";

const deliveryMenu = {
  chefsChoice: {
    id: "foodId",
    // more properties of the food object
  },
  categories: [
    {
      name: "Beverages",
      subCategories: [
        {
          name: "cold Beverages",
          values: ["foodId_1", "foodId_2", "foodId_3"],
        },
        {
          name: "hot Beverages",
          values: ["foodId_1", "foodId_2", "foodId_3"],
        },
      ],
    },
    {
      name: "Snacks",
      subCategories: [
        {
          name: "Backed Snacks",
          values: ["foodId_1", "foodId_2", "foodId_3"],
        },
      ],
    },
    {
      name: "Main Dish",
      subCategories: [
        {
          name: "With Ugali",
          values: ["foodId_1", "foodId_2", "foodId_3"],
        },
        {
          name: "With Chapati",
          values: ["foodId_1", "foodId_2", "foodId_3"],
        },
      ],
    },
  ],
};

const DeliveryMenu = () => {
  return (
    <section className="w-full ">
      {/* Chefs choice */}

      {/* Menu */}
    </section>
  );
};

export default DeliveryMenu;
