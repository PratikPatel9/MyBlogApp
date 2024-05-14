import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";
import bodyparser from "body-parser";
import Connection from "../Server/DB/db.js";
import Router from "./routes/route.js";

dotenv.config();
// const app = express("express");
const app = express();

app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", Router);
app.options("*", cors());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.magenta(`Server is rinning on PORT : ${PORT}`));
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
