import express from "express";
const router = express.Router();

import * as dashboard from "../admincontroller/dashboard.js"
import * as tournament from "../admincontroller/torunament.js"
import * as addMembers from "../admincontroller/add-members.js"

router.get('/dashboard', dashboard.loadDashboard)
router.get('/tournament', tournament.loadTournament)
router.post('/createtournament', tournament.createTournament)
router.get('/add-members/:id', addMembers.loadAddMembers)
export default router;
