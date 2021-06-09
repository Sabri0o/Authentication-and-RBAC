const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/app").routes
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err, res) => {
    if (err) {
      console.log("Error connecting to database. " + err);
    } else {
      console.log("Connected to Database");
    }
  }
);

apiRoutes(app)

app.get("/", (req, res) => {
  res.status(200).json({ status: "testing" });
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
