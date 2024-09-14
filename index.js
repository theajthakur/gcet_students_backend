const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const data_router = require("./routers/data_static");

app.use("/student", data_router);
app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
