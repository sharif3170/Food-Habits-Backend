import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model("User", userSchema);
