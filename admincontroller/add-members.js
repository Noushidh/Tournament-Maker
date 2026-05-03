import asyncHandler from "../utils/asyncHandler.js";

import Tournament from "../models/torunament_datas.js";

export const loadAddMembers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);

    if (!tournament) {
        return res.status(404).send("Tournament not found");
    }

    const successMessage = req.session.successMessage;
    const errorMessage = req.session.errorMessage;
    delete req.session.successMessage;
    delete req.session.errorMessage;

    res.render("admin/add-members", {
        title: "Add Members",
        tournament,
        successMessage,
        errorMessage
    })
})

export const addMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { playerName, team } = req.body;
    
    const tournament = await Tournament.findById(id);

    if (!tournament) {
        return res.status(404).send("Tournament not found");
    }

    // Backend validation: Check player count limit
    if (tournament.members.length >= tournament.players) {
        req.session.errorMessage = `Tournament is full. Maximum ${tournament.players} players allowed.`;
        return res.redirect(`/admin/add-members/${id}`);
    }

    // Backend validation: Check if team is already taken
    const isTeamTaken = tournament.members.some(
        (member) => member.team.trim().toLowerCase() === team.trim().toLowerCase()
    );

    if (isTeamTaken) {
        req.session.errorMessage = "This team is already taken in this tournament.";
        return res.redirect(`/admin/add-members/${id}`);
    }

    tournament.members.push({ playerName, team });
    await tournament.save();

    req.session.successMessage = "Player added successfully! ✅";
    res.redirect(`/admin/add-members/${id}`);
})

export const updateMember = asyncHandler(async (req, res) => {
    const { id, memberId } = req.params;
    const { playerName, team } = req.body;

    const tournament = await Tournament.findById(id);

    if (!tournament) {
        return res.status(404).send("Tournament not found");
    }

    // Date validation
    const today = new Date();
    today.setHours(0,0,0,0);
    if (new Date(tournament.startDate) <= today) {
        req.session.errorMessage = "Cannot edit players after the tournament has started.";
        return res.redirect(`/admin/add-members/${id}`);
    }

    // Find and update member
    const member = tournament.members.id(memberId);
    if (!member) {
        req.session.errorMessage = "Player not found.";
        return res.redirect(`/admin/add-members/${id}`);
    }

    // Check if team is already taken by ANOTHER player
    const isTeamTaken = tournament.members.some(
        (m) => m._id.toString() !== memberId && m.team.trim().toLowerCase() === team.trim().toLowerCase()
    );

    if (isTeamTaken) {
        req.session.errorMessage = "This team is already taken by another player.";
        return res.redirect(`/admin/add-members/${id}`);
    }

    member.playerName = playerName;
    member.team = team;
    
    await tournament.save();

    req.session.successMessage = "Player updated successfully! ✅";
    res.redirect(`/admin/add-members/${id}`);
})

export const removeMember = asyncHandler(async (req, res) => {
    const { id, memberId } = req.params;
    
    const tournament = await Tournament.findById(id);

    if (!tournament) {
        return res.status(404).send("Tournament not found");
    }

    // Remove member by filter
    tournament.members = tournament.members.filter(member => member._id.toString() !== memberId);
    await tournament.save();

    req.session.successMessage = "Player removed successfully. ✅";
    res.redirect(`/admin/add-members/${id}`);
})
