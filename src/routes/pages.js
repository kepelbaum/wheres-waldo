import { Router } from "express";
// import Highscore from "../models/highscore";

const router = Router();

router.get("/", async (req, res) => {
  let scores = await req.context.models.Highscore.find({})
    .sort({ score: 1 })
    .limit(10);
  res.render("index", { scores });
});
router.get("/beach", async (req, res) => {
  res.render("beach");
});

export default router;
