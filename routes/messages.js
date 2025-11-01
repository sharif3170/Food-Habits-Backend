import express from "express";
import Message from "../models/message.js";

const router = express.Router();

// Send message (anyone can send)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields are required" 
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "Please provide a valid email address" 
      });
    }
    
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: "Message saved successfully!",
      data: newMessage 
    });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

// Get all messages (Public access)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

// Get single message by ID (Public access)
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        error: "Message not found" 
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (err) {
    console.error("Error fetching message:", err);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid message ID" 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

// Delete message by ID (Public access)
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        error: "Message not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid message ID" 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

export default router;