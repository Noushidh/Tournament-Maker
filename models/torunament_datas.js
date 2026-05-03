import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    
    type: {
      type: String,
      default: "League",
      enum: ["League", "Knockout", "Groups + Knockout"]
    },

    players: {
      type: Number,
      required: true,
      min: 2 
    },

    pointsSystem: {
      win: {
        type: Number,
        default: 3
      },
      draw: {
        type: Number,
        default: 1
      },
      loss: {
        type: Number,
        default: 0
      }
    },

    startDate: {
      type: Date,
      required: true
    },

    members: [
      {
        playerName: {
          type: String,
          required: true
        },
        team: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true 
  }
);

export default mongoose.model("Tournament", tournamentSchema);