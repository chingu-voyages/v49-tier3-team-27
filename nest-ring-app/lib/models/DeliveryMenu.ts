import mongoose from "mongoose";

export interface IDeliveryMenu extends mongoose.Document {
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

const DeliveryMenuSchema = new mongoose.Schema<IDeliveryMenu>(
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

export default mongoose.models.deliveryMenu ||
  mongoose.model("deliveryMenu", DeliveryMenuSchema, "deliveryMenu");
