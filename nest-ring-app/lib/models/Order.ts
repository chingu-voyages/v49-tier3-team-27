import mongoose, { Schema, Types } from "mongoose";

export interface IOrder extends mongoose.Document {
    food: {
        foodId: Types.ObjectId,
        quantity: number
    }[],
    rating: number,
    comment: string,
    totalAmount: number,
    discount: number,
    payment: {
        option: string,
        credentials: string
    }    
}

const OrderSchema = new mongoose.Schema<IOrder>(
    {
        food: [
            { 
                foodId: { type: Schema.Types.ObjectId, ref: 'DeliveryMenu' },
                quantity: { type: Number }
            }
        ],
        rating: { type: Number },
        comment: { type: String },
        totalAmount: { type: Number },
        discount: { type: Number },
        payment: {
            option: { 
                type: String,
                default: "cashOnDelivery",
                enum: ["paypal", "card", "mpesa", "cashOnDelivery"],
            },
            credentials: { type: String }
        }
    },

    { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", OrderSchema);



