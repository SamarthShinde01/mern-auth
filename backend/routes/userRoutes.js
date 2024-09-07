import express from "express";
const router = express.Router();
import {
	authUser,
	registerUser,
	logoutUsers,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUsers);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;
