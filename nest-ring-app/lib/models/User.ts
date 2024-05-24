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
  address?: string;
  dob?: Date;
  foodOrders?: Types.ObjectId[];
  userRole?: string;
  authenticationCode?: string;
  isAuthenticated?: string;
  isEmailVerified?: string;
  isProfileComplete?: string; 
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
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  foodOrders: {
    type: [Schema.Types.ObjectId],
    ref: "orders",
  },  
  userRole: {
    type: String,
    default: "customer",
    enum: ["customer", "admin", "customerSupport"]
  },
  authenticationCode: {
    type: String,
  },
  isAuthenticated: {
    type: String,
  },
  isEmailVerified: { 
    type: String, 
  }, 
  isProfileComplete: { 
    type: String 
  } 
},

  { timestamps: true }

);

export default mongoose.models.users || mongoose.model("users", UserSchema);
