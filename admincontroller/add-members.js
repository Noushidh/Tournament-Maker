import asyncHandler from "../utils/asyncHandler.js";

import Tournament from "../models/torunament_datas.js";

export const loadAddMembers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);

    if (!tournament) {
        return res.status(404).send("Tournament not found");
    }

    res.render("admin/add-members", {
        title: "Add Members",
        tournament // 🔥 Passing real tournament data
    })
})