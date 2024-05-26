import mongoose, { Types, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  firstname: string;
  middlename?: string;
  lastname?: string;
  email: string;
  password: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  location?: {
    country: string;
    state: string;
    city: string;
    deliveryAddress: string; 
  };
  dob?: Date;
  foodOrders?: Types.ObjectId[];
  acountType?: string;
  authToken?: string;
  isAuthenticated?: boolean;
  isEmailVerified?: boolean;
  isProfileComplete?: boolean; 
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },  
  firstname: {
    type: String,    
  }, 
  middlename: {
    type: String,    
  }, 
  lastname: {
    type: String,    
  }, 
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  bannerUrl: {
    type: String,
  },
  location: {
    country: {
      type: String
    },
    state: {
      type: String,
    },
    city: {
      type: String
    },
    deliveryAddress: {
      type: String
    }      
  },
  dob: {
    type: Date,
  },
  foodOrders: {
    type: [Schema.Types.ObjectId],
    ref: "orders",
  },  
  acountType: {
    type: String,
    default: "Customer",
    enum: ["Customer", "Admin", "Customer Support"]
  },
  authToken: {
    type: String,
  },
  isAuthenticated: {
    type: Boolean,
  },
  isEmailVerified: { 
    type: Boolean, 
  }, 
  isProfileComplete: { 
    type: Boolean, 
  } 
},

  { timestamps: true }

);

export default mongoose.models.users || mongoose.model("users", UserSchema);
