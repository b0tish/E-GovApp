import express from "express";
import {
  verifyToken,
  authorizeRole,
  authorizeDashboard,
  restrictToOwnEntity,
} from "../controllers/authMiddleware.js";

import {
  register,
  login,
  logout,
  getlevelnames,
  getUserByName,getUserForNational,

} from "../controllers/authController.js";

import {
  addbudget,
  getDataByLevel,
  getDataByName,
  updateBudgetById,
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/auth-check", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/getlevelnames/:level", getlevelnames);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getdatabylevel/:identifier", getDataByLevel);
router.get("/getdatabyname/:identifier", getDataByName);
router.get("/getuserbyname/:name",getUserByName);
router.get("/getuserfornational",getUserForNational);

//Protected Routes
router.put(
  "/updatebudget/:id",
  updateBudgetById,
  verifyToken,
  authorizeRole("admin"),
  restrictToOwnEntity,
);

router.post("/register", verifyToken, authorizeRole("superadmin"), register);
router.post(
  "/addbudget",
  verifyToken,
  authorizeRole("admin"),
  restrictToOwnEntity,
  addbudget,
);

router.get(
  "/dashboardrequestbyname/:identifier",
  verifyToken,
  authorizeDashboard(), // Use the new custom middleware here
  getDataByName,
);

router.get(
  "/dashboardrequestbylevel/:identifier",
  verifyToken,
  authorizeDashboard(), // Use the new custom middleware here
  getDataByLevel,
);
export { router };
