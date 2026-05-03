import asyncHandler from "../utils/asyncHandler.js";
import Tournamet from "../models/torunament_datas.js"

export const loadTournament = asyncHandler(async (req, res) => {
    const tournaments = await Tournamet.find().sort({ createdAt: -1 });

    res.render("admin/tournament", {
        title: "Tournament",
        tournaments // 🔥 Passing real data
    });
});

export const createTournament = asyncHandler(async (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 INCOMING DATA FROM FRONTEND:");
    console.log(req.body);
    console.log("-----------------------------------------");

    const { name, type, players, pointsSystem, startDate } = req.body;

    const newTournament = new Tournamet({
        name,
        type,
        players,
        pointsSystem,
        startDate
    });

    await newTournament.save();

    res.status(201).json({
        success: true,
        message: "Tournament created successfully",
        tournament: newTournament
    });
});

export const updateTournament = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, type, players, pointsSystem, startDate } = req.body;

    const tournament = await Tournamet.findById(id);

    if (!tournament) {
        return res.status(404).json({ success: false, message: "Tournament not found" });
    }

    // Check if tournament has already started
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tournamentStartDate = new Date(tournament.startDate);
    tournamentStartDate.setHours(0, 0, 0, 0);

    if (tournamentStartDate <= today) {
        return res.status(400).json({ 
            success: false, 
            message: "Cannot edit tournament on or after it has started" 
        });
    }

    tournament.name = name;
    tournament.type = type;
    tournament.players = players;
    tournament.pointsSystem = pointsSystem;
    tournament.startDate = startDate;

    await tournament.save();

    res.status(200).json({
        success: true,
        message: "Tournament updated successfully",
        tournament
    });
});

export const deleteTournament = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Tournamet.findByIdAndDelete(id);
    res.redirect("/admin/tournament");
});