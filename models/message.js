import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  subject: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  message: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 2000
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Index for better query performance
messageSchema.index({ createdAt: -1 });

export default mongoose.model("Message", messageSchema);