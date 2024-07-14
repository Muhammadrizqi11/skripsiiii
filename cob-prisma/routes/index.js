import express from "express";
import multer from "multer";
import { uploadSingle } from "../middleware/uploadMiddleware.js";
import { getStudio, getStudioById, createStudio, updateStudio, deleteStudio } from "../controllers/StudioModel.js";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken, authorizeRole } from "../middleware/VerifyToken.js";
import { createPemesanan, getPemesanan, getPemesananById, updatePemesanan, deletePemesanan } from "../controllers/pemesananController.js";
import { getPembayaran, getPembayaranById, createPembayaran, updatePembayaran, deletePembayaran } from "../controllers/PembayaranController.js";
// import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// verifyToken, authorizeRole("OWNER")
// route studio
router.get("/studio", getStudio);
router.get("/studio/:id", getStudioById);
router.post("/studio", upload.single("image"), createStudio);
router.patch("/studio/:id", upload.single("image"), updateStudio);
router.delete("/studio/:id", deleteStudio);

// route user
router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
// router.get("/token", refreshToken);
router.delete("/logout", Logout);

// route pemesanan
router.post("/pemesanan", createPemesanan);
router.get("/pemesanan", getPemesanan);
router.get("/pemesanan/:id", getPemesananById);
router.put("/pemesanan/:id", updatePemesanan);
router.delete("/pemesanan/:id", deletePemesanan);

//route pembayaran
router.get("/pembayaran", getPembayaran);
router.get("/pembayaran/:id", getPembayaranById);
router.post("/pembayaran", createPembayaran);
router.put("/pembayaran/:id", updatePembayaran);
router.delete("/pembayaran/:id", deletePembayaran);

export default router;
