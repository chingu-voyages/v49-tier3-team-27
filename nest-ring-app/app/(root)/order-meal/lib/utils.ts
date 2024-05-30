/*
    1. function to insert an array of food object documents to the db
    2. function to retrive food object documents from db
    3. function to restructure the retrived food documents to be ready for ui.
*/
"use server";
import Food, { IFood } from "@/lib/models/Food";
import dbConnect from "@/lib/mongo";
import { foodMenu } from "./deliveryMenu";
import { DeliveryMenuType } from "./interface";

export const insertFoodToDb = async () => {
  try {
    await dbConnect();
    console.log("json data: ", foodMenu);
    const result = await Food.insertMany([...foodMenu]);

    console.log("insert to db result: ", result);
  } catch (error) {
    console.log("error inserting to db: ", error);
  }
};

export const getDeliveryMenu = async () => {
  try {
    await dbConnect();

    const result = (await Food.find()) as IFood[];

    if (!result) {
      return {};
    }

    const deliveryMenu: DeliveryMenuType = {
      chefsChoice: {} as IFood,
      categories: [],
    };

    const categoryMap = new Map();

    result.forEach((item: IFood) => {
      // Handle chef's choice
      if (item.isChefsChoice) {
        deliveryMenu.chefsChoice = item;
      }

      // Find or create category
      let category = categoryMap.get(item.category);
      if (!category) {
        category = {
          name: item.category,
          subCategories: [],
        };
        categoryMap.set(item.category, category);
        deliveryMenu.categories.push(category);
      }

      // Find or create subcategory within category
      let subCategory = category.subCategories.find(
        (subCat: any) => subCat.name === item.subCategory
      );
      if (!subCategory) {
        subCategory = {
          name: item.subCategory,
          values: [],
        };
        category.subCategories.push(subCategory);
      }
      // Add the food item to the subcategory
      subCategory.values.push(item);
    });

    return { ...deliveryMenu, categories: deliveryMenu.categories.reverse() };
  } catch (error) {
    console.log("getDelivery Menu error: ", error);
  }
};
