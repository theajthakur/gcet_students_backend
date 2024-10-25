const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const auth = require("./middlewares/auth");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());

const staticRouter = require("./routers/static");
app.use("/static", staticRouter);
app.use(auth);

const data_router = require("./routers/data_static");
const auth_router = require("./routers/auth");
const user_router = require("./routers/user");
const follow_router = require("./routers/follow");

app.use("/student", data_router);
app.use("/", auth_router);
app.use("/user", user_router);
app.use("/follow", follow_router);

app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
