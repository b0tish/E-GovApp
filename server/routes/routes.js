import express from "express";

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

const router = express.Router();

router.post("/province", addProvince);
router.get("/provinces", getAllProvince);
router.put("/province/:provinceId", updateProvince);
router.delete("/province/:provinceId", deleteProvince);
router.post("/province/:provinceId/local", addLocal);
router.get("/province/:provinceId/locals", getAllLocal);
router.put("/province/:provinceId/local/:localId", updateLocal);
router.delete("/province/:provinceId/local/localId", deleteLocal);

export { router };
