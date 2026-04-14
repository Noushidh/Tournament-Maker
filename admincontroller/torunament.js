import asyncHandler from "../utils/asyncHandler.js";

export const loadTournament = asyncHandler(async (req, res) => {
    res.render("admin/tournament", {
        title: "Tournament",
    });
});