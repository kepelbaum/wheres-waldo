import mongoose from "mongoose";

const highScoreSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: { type: Date, required: true },
  map: {
    type: String,
    required: true,
  },
});

const Highscore = mongoose.model("Highscores", highScoreSchema);

export default Highscore;
