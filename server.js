const express = require("express");
const app = express();
const cors = require("cors");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: "testing" });
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
