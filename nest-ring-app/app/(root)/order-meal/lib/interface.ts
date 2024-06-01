export type DeliveryFoodType = {
  category: string;
  subCategory: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  description: string;
  calories: number;
  rating: number;
  isChefsChoice: boolean;
  count: number;
};

export type SubCategoryType = {
  name: string;
  values: DeliveryFoodType[];
};

export type CategoriesType = {
  name: string;
  subCategories: SubCategoryType[];
};

export type DeliveryMenuType = {
  chefsChoice: DeliveryFoodType;
  categories: CategoriesType[];
};
