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