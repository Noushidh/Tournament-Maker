import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
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
    }
  },
  {
    timestamps: true 
  }
);

export default mongoose.model("Tournament", tournamentSchema);