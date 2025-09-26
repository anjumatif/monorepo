import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

const app = express();

app.use(express.json());
dotenv.config();

app.use(cors());

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get("/", (req, res) => {
  res.status(200).json("Youre looking at my root route. ow roude....");
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});

app.get("/jokes", async (req, res) => {
  const result = await db.query("select * from jokes");
  res.json(result.rows);
});

app.post("/jokes", async (req, res) => {
  const body = req.body;

  const jokeFromClient = req.body.joke;
  const punchlineFromClient = req.body.punchline;

  const data = await db.query(
    "insert into jokes(joke,punchline)values ($1,$2)",
    [jokeFromClient, punchlineFromClient]
  );
  res.json({ status: "Joke inserted into database" });
});
