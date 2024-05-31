import mongoose from "mongoose";

export interface IFood extends mongoose.Document {
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
}

const FoodSchema = new mongoose.Schema<IFood>(
  {
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    calories: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    isChefsChoice: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.models.food ||
  mongoose.model("food", FoodSchema, "deliveryMenu");
