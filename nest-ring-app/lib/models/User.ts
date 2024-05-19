import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;  
  password: string;  
}

const UserSchema = new mongoose.Schema<IUser>({    
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export default mongoose.models.users || mongoose.model("users", UserSchema);
