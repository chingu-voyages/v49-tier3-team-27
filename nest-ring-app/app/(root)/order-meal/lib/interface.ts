import { IFood } from "@/lib/models/Food";

export type SubCategoryType = {
  name: string;
  values: IFood[];
};

export type CategoriesType = {
  name: string;
  subCategories: SubCategoryType[];
};

export type DeliveryMenuType = {
  chefsChoice: IFood;
  categories: CategoriesType[];
};
