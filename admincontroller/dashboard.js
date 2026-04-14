import asyncHandler from "../utils/asyncHandler.js";

export const loadDashboard = asyncHandler(async (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard",
  });
});