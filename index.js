const express = require("express");
const app = express();
const port = 8000;

const data_router = require("./routers/data_static");
app.use("/student", data_router);
app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
