require("dotenv").config();
require("express-async-errors");

// Middleware import
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const authMiddleware = require("./middleware/authentication");

// connectDB
const connectDB = require("./db/connect");

// error
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// express
const express = require("express");
const app = express();

const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");

// Middleware
app.use(morgan("dev"));
// app.set("trust proxy", 1);
// app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 150 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get("/", (req, res) => res.send(`<h1>Social-API</h1>`));
app.use("/auth", authRouter);
app.use("/users", authMiddleware, usersRouter);
app.use("/posts", authMiddleware, postsRouter);

// error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server ON..."));
  } catch (error) {
    console.error(error);
  }
};
start();
