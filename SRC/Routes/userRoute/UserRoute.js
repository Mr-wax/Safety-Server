import express from "express";
import { protectRoute } from "../../Middlewares/ProtectRoute.js";
import { getCurrentUser, getUserById, updateEmergencyContacts } from "../../Controllers/UserController.js";

const router = express.Router();

// Get the currently authenticated user
router.get("/me", protectRoute, getCurrentUser);

// Get a user by id (requires authentication; tighten with roles later if needed)
router.get("/:id", protectRoute, getUserById);

// Update emergency contacts for the current user
router.put("/emergency-contacts", protectRoute, updateEmergencyContacts);

export default router; 