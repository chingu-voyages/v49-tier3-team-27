import mongoose, { Schema, Types } from "mongoose";

export interface IOrder extends mongoose.Document {
    food: {
        foodId: Types.ObjectId,
        quantity: number
    }[],
    rating?: number | null,
    comment?: string | null,
    totalAmount: number,
    discount?: number | null,
    payment: {
        option: string,
        credentials?: string | null
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
        rating: { type: Number, default: null },
        comment: { type: String, default: null },
        totalAmount: { type: Number },
        discount: { type: Number, default: null },
        payment: {
            option: { 
                type: String,
                default: "cashOnDelivery",
                enum: ["paypal", "card", "mpesa", "cashOnDelivery"],
            },
            credentials: { type: String, default: null }
        }
    },

    { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", OrderSchema);



