import express from "express";
import authRoutes from "./authRoute/AuthRoute.js"; 
import alertRoutes from "./AlertRoute/AlertRoute.js"
import userRoutes from "./userRoute/UserRoute.js"

const router = express.Router(); 

router.use("/auth", authRoutes); 
router.use("/alert", alertRoutes);
router.use("/user", userRoutes);
export default router;
