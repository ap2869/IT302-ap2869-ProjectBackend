// Name: Alex Paguay
// Date: 03/22/2026
// Course: IT302-452
// Assignment: Phase 3 MongoDB Data using Node.js
// Email: ap2869@njit.edu
import express from "express";
import CareersCtrl from "./careers.controller.js";
import OpinionsCtrl from "./opinions.controller.js";

const router = express.Router();

router.route("/").get(CareersCtrl.apiGetCareers);
router.route("/opinions")
  .post(OpinionsCtrl.apiPostOpinion)
  .put(OpinionsCtrl.apiUpdateOpinion)
  .delete(OpinionsCtrl.apiDeleteOpinion);

export default router;