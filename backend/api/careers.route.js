// Name: Alex Paguay
// Date: 02/19/2026
// Course: IT302-452
// Assignment: Phase 2 Read MongoDB data
// Email: ap2869@njit.edu
import express from "express";
import CareersCtrl from "./careers.controller.js";

const router = express.Router();

router.route("/").get(CareersCtrl.apiGetCareers);

export default router;