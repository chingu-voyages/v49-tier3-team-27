/*
    1. function to insert an array of food object documents to the db
    2. function to retrive food object documents from db
    3. function to restructure the retrived food documents to be ready for ui.
*/
"use server";
import DeliveryMenu, { IDeliveryMenu } from "@/lib/models/DeliveryMenu";
import EventMenu, { IEventMenu } from "@/lib/models/EventMenu";
import dbConnect from "@/lib/mongo";
import { foodMenu } from "./deliveryMenu";
import { eventMenu } from "./eventMenu";
import { CategoryItems, DeliveryMenuType, EventFoodType } from "./interface";

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
    console.log("error inserting to db: ", error);
  }
};

export const fetchDeliveryFood = async (slug: string | null = null) => {
  try {
    await dbConnect();

    let result = null;
    if (slug) {
      result = await DeliveryMenu.find({ slug });
      result = result[0];
    } else {
      result = await DeliveryMenu.find();
    }

    return result;
  } catch (error) {
    console.log("Error Fetch delivery menu: ", error);
    throw error;
  }
};

export const getDeliveryMenu = async () => {
  try {
    const result = (await fetchDeliveryFood()) as IDeliveryMenu[];
    if (!result) {
      return {};
    }

    const deliveryMenu: DeliveryMenuType = {
      chefsChoice: {} as IDeliveryMenu,
      categories: [],
    };

    const categoryMap = new Map();

    result.forEach((item: IDeliveryMenu) => {
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
    console.log("getDelivery Menu error: ", error);
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
    console.log("error inserting to db: ", error);
  }
};

export const fetchEventFood = async (searchTerm: string | null = null) => {
  try {
    await dbConnect();

    let result = null;

    if (searchTerm) {
      result = await EventMenu.findOne({ slug: searchTerm });
    } else {
      result = await EventMenu.find();
    }

    if (searchTerm) {
      return result as EventFoodType;
    } else {
      return result as EventFoodType[];
    }
  } catch (error) {
    console.log("Error Fetch event menu: ", error);
    throw error;
  }
};

export const getEventMenu = async () => {
  try {
    const result = (await fetchEventFood()) as IEventMenu[];
    if (!result) {
      return {};
    }

    // const eventMenu: EventMenuType = {
    //   categories: [],
    // };

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
    console.log("getEventMenu error: ", error);
  }
};
