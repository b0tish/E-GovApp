import express from "express";
import { verifyToken, authorizeRole,authorizeDashboard } from "../controllers/authMiddleware.js";

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

import {
  register,
  login,
  logout,
  getlevelnames,
} from "../controllers/authController.js";
import { addbudget,getDataByLevel,getDataByName,updateBudgetById} from "../controllers/budgetController.js";

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
router.get("/getlevelnames/:level",getlevelnames);
router.post("/addbudget", addbudget);
router.get("/getdatabylevel/:identifier", getDataByLevel);
router.get("/getdatabyname/:identifier", getDataByName);
router.put('/updatebudget/:id', updateBudgetById);

//Protected Routes
//Protected Routes
router.get(
  "/dashboardrequestbyname/:identifier",
  verifyToken,
  authorizeDashboard(), // Use the new custom middleware here
  getDataByName
);
router.get(
  "/dashboardrequestbylevel/:identifier",
  verifyToken,
  authorizeDashboard(), // Use the new custom middleware here
  getDataByLevel
);
router.post("/province", verifyToken, authorizeRole("admin"), addProvince);
export { router };
