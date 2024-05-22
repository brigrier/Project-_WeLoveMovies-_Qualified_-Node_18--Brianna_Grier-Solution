if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./errors/errorHandler")
const moviesRouter = require("../src/movies/movies.router")


app.use(express.json());

app.use("/movies", moviesRouter);

app.use(errorHandler);

module.exports = app;
