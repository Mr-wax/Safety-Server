import express from "express";
import authRoutes from "./authRoute/AuthRoute.js"; 
// import eventRoutes from "./event/eventRoute.js"
// import paymentRoutes from "./payment/paymenRoute.js"
// import adminRoutes from "./admin/adminRoute.js"

const router = express.Router(); 

router.use("/auth", authRoutes); 
// router.use("/ticket", ticketRoutes)
// router.use("/event", eventRoutes); 
// router.use("/payment", paymentRoutes);
// router.use("/admin", adminRoutes); 
export default router;
