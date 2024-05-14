import express from "express";
import { signupUser, loginUser } from "../controller/userController.js";
import { uploadImage, getImage } from "../controller/imageController.js";
import { createPost } from "../controller/postController.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

// upload.single("file") is ,middleware here that is most important method we need here,
//  before hit on API call it has to passed through middleware
router.post("/file/upload", upload.single("file"), uploadImage);

// getImage from mongodb
router.get("/file/:filename", getImage);

// cratePost
router.post("/create", authenticateToken, createPost);

export default router;
