import { Router } from "express";
// import Highscore from "../models/highscore";
// import Temp from "../models/temporary";

const router = Router();
router.get("/", async (req, res) => {
  res.json({ result: "Hello World" });
});

router.post("/", async (req, res, next) => {
  const record = await req.context.models.Temp.create({
    waldo: false,
    odlaw: false,
    whitebeard: false,
    map: req.body.map,
    date: Date.now(),
  }).catch((error) => {
    error.statusCode = 400;
    next(error);
  });
  res.json({ result: record._id });
});

router.post("/waldo", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 1834 &&
    req.body.x <= 1874 &&
    req.body.y >= 860 &&
    req.body.y <= 940
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      waldo: true,
    });
    res.json({ result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});
router.post("/odlaw", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 310 &&
    req.body.x <= 330 &&
    req.body.y >= 820 &&
    req.body.y <= 900
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      odlaw: true,
    });
    res.json({ result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});
router.post("/wizard", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 795 &&
    req.body.x <= 845 &&
    req.body.y >= 815 &&
    req.body.y <= 880
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      whitebeard: true,
    });
    res.json({ result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});

export default router;
