const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const config = require("./config/config");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api", userRouter);
// app.use(express.json());
app.listen(config.port);
