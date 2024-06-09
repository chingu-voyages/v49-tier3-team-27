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

export type EventFoodType = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  calories: number;
  imageUrl: string;
  description: string;
  rating: number;
  price: number;
  count: number;
  equivalence: string;
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

export type CategoryItems = {
  name: string;
  values: EventFoodType[];
};
