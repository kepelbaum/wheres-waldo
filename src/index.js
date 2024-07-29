import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { connectDb } from "./models";
import routes from "./routes";

const eraseDatabaseOnSync = true;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(async (req, res, next) => {});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", routes.pages);
app.use(express.static(__dirname + "/assets"));

app.get("*", function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

// app.use((error, req, res, next) => {
//   if (!error.statusCode) error.statusCode = 500;

//   if (error.statusCode === 301) {
//     return res.status(301).redirect("/not-found");
//   }

//   return res.status(error.statusCode).json({ error: error.toString() });
// });

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.Highscore.deleteMany({})]);
    createUsersWithScores();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithScores = async () => {
  const user1 = new models.Highscore({
    user: "Wally",
    score: 100500,
  });

  const user2 = new models.Highscore({
    user: "fluffycat",
    score: 24200,
  });

  await user1.save();
  await user2.save();
};
