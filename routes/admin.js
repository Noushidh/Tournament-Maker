import express from "express";
const router = express.Router();

import * as dashboard from "../admincontroller/dashboard.js"
import * as tournament from "../admincontroller/torunament.js"

router.get('/dashboard', dashboard.loadDashboard)
router.get('/tournament', tournament.loadTournament)
export default router;
