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

export const createSlug = async (name: string) => {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters except hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
};

export const insertFoodToDb = async () => {
  try {
    await dbConnect();

    const foodWithSlug = await Promise.all(
      foodMenu.map(async (obj) => {
        const slug = await createSlug(obj.name);
        return {
          ...obj,
          slug,
        };
      })
    );

    console.log("inserting food objs with slug; to db.", foodWithSlug[0]);
    const result = await Food.insertMany(foodWithSlug);

    console.log("insert to db result: ", result[0]);
  } catch (error) {
    console.log("error inserting to db: ", error);
  }
};

export const fetchDeliveryFood = async (slug: string | null = null) => {
  try {
    await dbConnect();

    let result = null;
    if (slug) {
      result = await Food.find({ slug });
      result = result[0];
    } else {
      result = await Food.find();
    }

    return result;
  } catch (error) {
    console.log("Error Fetch delivery menu: ", error);
    throw error;
  }
};

export const getDeliveryMenu = async () => {
  try {
    const result = (await fetchDeliveryFood()) as IFood[];
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

    return {
      ...deliveryMenu,
      categories: deliveryMenu.categories.toReversed(),
    };
  } catch (error) {
    console.log("getDelivery Menu error: ", error);
  }
};
