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

import {
  addProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectsByName
} from "../controllers/projectController.js"
import{
  addComplaint,
  getComplaintByName
} from "../controllers/complaintController.js"

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
  verifyToken,
  authorizeRole("admin"),
  restrictToOwnEntity,
  updateBudgetById
);

//router.post("/register", verifyToken, authorizeRole("superadmin"), register);
router.post("/register", register);
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

router.get("/projects", getAllProjects);
router.get("/projects/:allocatedBy", getProjectsByName);

router.post(
  "/projects",
  addProject,
);
router.put(
  "/projects/:identifier",
  verifyToken,
  restrictToOwnEntity,
  updateProject,
)
router.post("/addComplaint",addComplaint);
router.get("/getComplaintByName/:identifier",verifyToken,authorizeDashboard(),getComplaintByName)

export { router };
