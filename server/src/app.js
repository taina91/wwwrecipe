const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
// const { sequelize } = require("./controllers");
const config = require("./config/config");

const app = express();
app.use(morgan("combined"));
// app.use(bodyParser.json());
app.use(cors());

// require("./routes")(app);

app.use("/api", userRouter);
app.use(express.json());
app.listen(config.port);
//   console.log("OK");

// sequelize.sync().then(() => {
//   app.listen(config.port);
//   console.log("OK");
// });
