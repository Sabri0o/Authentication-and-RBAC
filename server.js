const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes/app").routes;
const cors = require("cors")
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// creating x-access-token header where we store the token value
app.use((req, res, next) => {
  res.set({ "x-access-token": "" });
  next()
});

// allow one origin to serve and block the rest
const corsOption = {
  origin : "http://localhost:3000"
}

// cors middleware
app.use(cors(corsOption))

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

// app routes
apiRoutes(app);

app.get("/", (req, res) => {
  res.status(200).json({ status: "testing" });
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
