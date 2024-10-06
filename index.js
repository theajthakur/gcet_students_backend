const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const auth = require("./middlewares/auth");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

app.use(auth);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const data_router = require("./routers/data_static");
const auth_router = require("./routers/auth");
const user_router = require("./routers/user");

app.use("/student", data_router);
app.use("/", auth_router);
app.use("/user", user_router);

app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
