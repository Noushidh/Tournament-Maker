import express from "express";
const router = express.Router();

import * as dashboard from "../admincontroller/dashboard.js"

router.get('/dashboard',dashboard.loadDashboard)
export default router;
