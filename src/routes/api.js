import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  res.json({ result: "Hello World" });
});

router.post("/beach", async (req, res, next) => {
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
  res.json({ record: record, result: record._id, date: record.date });
});

router.post("/beach/waldo", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 1834 &&
    req.body.x <= 1874 &&
    req.body.y >= 710 &&
    req.body.y <= 790
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      waldo: true,
    });
    res.json({ record: record, result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});
router.post("/beach/odlaw", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 300 &&
    req.body.x <= 340 &&
    req.body.y >= 670 &&
    req.body.y <= 750
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      odlaw: true,
    });
    res.json({ record: record, result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});
router.post("/beach/wizard", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (
    req.body.x >= 795 &&
    req.body.x <= 845 &&
    req.body.y >= 665 &&
    req.body.y <= 730
  ) {
    record = await req.context.models.Temp.findByIdAndUpdate(req.body.id, {
      whitebeard: true,
    });
    res.json({ record: record, result: "Right!" });
  } else {
    res.json({ result: "Wrong!" });
  }
});
router.post("/beach/time", async (req, res, next) => {
  let now = Date.now();
  let record = await req.context.models.Temp.findById(req.body.id);
  if (record.waldo && record.odlaw && record.whitebeard) {
    let result = now - record.date;
    let updatedRecord = await req.context.models.Temp.findByIdAndUpdate(
      req.body.id,
      {
        score: result,
      },
    );
    res.json({ record: record, result: result });
  } else {
    res.json({
      result: "You haven't found all the characters yet! ...Cheater!",
    });
  }
});

router.post("/beach/score", async (req, res, next) => {
  let record = await req.context.models.Temp.findById(req.body.id);
  if (record.score) {
    let newScore = await req.context.models.Highscore.create({
      user:
        req.body.user === null || req.body.user === ""
          ? "Anonymous"
          : req.body.user,
      score: record.score,
      map: record.map,
    }).catch((error) => {
      error.statusCode = 400;
      next(error);
    });
    res.json({ record: record, result: "Score submitted" });
  } else {
    res.json({
      result: "You haven't found all the characters yet! ...Cheater!",
    });
  }
});
export default router;
