import express from "express";
import { verifyToken, authorizeRole } from "../controllers/authMiddleware.js";

import {
  addProvince,
  getAllProvince,
  updateProvince,
  deleteProvince,
  addLocal,
  getAllLocal,
  updateLocal,
  deleteLocal,
} from "../controllers/controller.js";

import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/auth-check", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/provinces", getAllProvince);
router.put("/province/:provinceId", updateProvince);
router.delete("/province/:provinceId", deleteProvince);
router.post("/province/:provinceId/local", addLocal);
router.get("/province/:provinceId/locals", getAllLocal);
router.put("/province/:provinceId/local/:localId", updateLocal);
router.delete("/province/:provinceId/local/localId", deleteLocal);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//Protected Routes
router.post("/province", verifyToken, authorizeRole("admin"), addProvince);
export { router };
