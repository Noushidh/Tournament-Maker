import express from "express";
const router = express.Router();

import * as dashboard from "../admincontroller/dashboard.js"
import * as tournament from "../admincontroller/torunament.js"
import * as addMembers from "../admincontroller/add-members.js"

router.get('/dashboard', dashboard.loadDashboard)
router.get('/tournament', tournament.loadTournament)
router.post('/createtournament', tournament.createTournament)
router.post('/update-tournament/:id', tournament.updateTournament)
router.post('/delete-tournament/:id', tournament.deleteTournament)
router.get('/add-members/:id', addMembers.loadAddMembers)
router.post('/add-member/:id', addMembers.addMember)
router.post('/update-member/:id/:memberId', addMembers.updateMember)
router.post('/remove-member/:id/:memberId', addMembers.removeMember)
export default router;
