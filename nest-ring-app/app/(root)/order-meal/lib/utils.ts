/*
    1. function to insert an array of food object documents to the db
    2. function to retrive food object documents from db
    3. function to restructure the retrived food documents to be ready for ui.
*/
"use server";
import DeliveryMenu from "@/lib/models/DeliveryMenu";
import EventMenu, { IEventMenu } from "@/lib/models/EventMenu";
import dbConnect from "@/lib/mongo";
import { foodMenu } from "./deliveryMenu";
import { eventMenu } from "./eventMenu";
import {
  CategoryItems,
  DeliveryFoodType,
  DeliveryMenuType,
  EventFoodType,
} from "./interface";
import { unstable_noStore } from "next/cache";

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
    const result = await DeliveryMenu.insertMany(foodWithSlug);

    console.log("insert to db result: ", result[0]);
  } catch (error) {
    throw error;
  }
};

export const fetchDeliveryFood = async (slug: string | null = null) => {
  unstable_noStore();
  try {
    await dbConnect();

    let result = null;
    if (slug) {
      result = await DeliveryMenu.findOne({ slug });
      if (result) {
        result = {
          _id: String(result._id),
          category: result.category,
          subCategory: result.subCategory,
          name: result.name,
          slug: result.slug,
          price: result.price,
          imageUrl: result.imageUrl,
          description: result.description,
          calories: result.calories,
          rating: result.rating,
          isChefsChoice: result.isChefsChoice,
          count: result.count,
        };
      }
    } else {
      result = await DeliveryMenu.find();
      result = result.map((obj: DeliveryFoodType) => ({
        _id: String(obj._id),
        category: obj.category,
        subCategory: obj.subCategory,
        name: obj.name,
        slug: obj.slug,
        price: obj.price,
        imageUrl: obj.imageUrl,
        description: obj.description,
        calories: obj.calories,
        rating: obj.rating,
        isChefsChoice: obj.isChefsChoice,
        count: obj.count,
      }));
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryMenu = async () => {
  try {
    const result = (await fetchDeliveryFood()) as DeliveryFoodType[];
    if (!result) {
      return {};
    }

    const deliveryMenu: DeliveryMenuType = {
      chefsChoice: {} as DeliveryFoodType,
      categories: [],
    };

    const categoryMap = new Map();

    result.forEach((item: DeliveryFoodType) => {
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
      categories: deliveryMenu.categories.reverse(),
    };
  } catch (error) {
    throw error;
  }
};

export const insertEventMenuToDb = async () => {
  try {
    await dbConnect();

    const foodWithSlug = await Promise.all(
      eventMenu.map(async (obj) => {
        const slug = await createSlug(obj.name);
        return {
          ...obj,
          slug,
        };
      })
    );

    const result = await EventMenu.insertMany(foodWithSlug);

    console.log("insert to db result: ", result[0]);
  } catch (error) {
    throw error;
  }
};

export const fetchEventFood = async (searchTerm: string | null = null) => {
  try {
    await dbConnect();

    let result = null;

    if (searchTerm) {
      result = await EventMenu.findOne({ slug: searchTerm });
      result = {
        _id: String(result._id),
        name: result.name,
        slug: result.slug,
        category: result.category,
        calories: result.calories,
        imageUrl: result.imageUrl,
        description: result.description,
        rating: result.rating,
        price: result.price,
        count: result.count,
        equivalence: result.equivalence,
      };
    } else {
      result = await EventMenu.find();
      result = result.map((obj: EventFoodType) => ({
        _id: String(obj._id),
        name: obj.name,
        slug: obj.slug,
        category: obj.category,
        calories: obj.calories,
        imageUrl: obj.imageUrl,
        description: obj.description,
        rating: obj.rating,
        price: obj.price,
        count: obj.count,
        equivalence: obj.equivalence,
      }));
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getEventMenu = async () => {
  try {
    const result = (await fetchEventFood()) as IEventMenu[];
    if (!result) {
      return {};
    }

    const eventMenu = [] as CategoryItems[];

    const categoryMap = new Map();

    result.forEach((item: IEventMenu) => {
      // Find or create category
      let category = categoryMap.get(item.category);
      if (!category) {
        category = {
          name: item.category,
          values: [],
        };
        categoryMap.set(item.category, category);
        eventMenu.push(category);
      }

      category.values.push(item);
    });

    return eventMenu;
  } catch (error) {
    throw error;
  }
};
