const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Koffie-Dash: Server API");
});

app.listen(PORT, function () {
  console.log(`server running on http://localhost:${PORT}`);
})

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

const allowList = [
  "http://localhost:3000",
  "https://koffie-dash-react.uc.r.appspot.com"
];

const  corsOptions = {
  origin: function (origin, callback) {
    if (allowList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api", require("./services/api"));

app.use("/", (err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "INTERNAL SERVER ERROR");
});