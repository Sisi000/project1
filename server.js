const express = require("express");
const path = require("path");



const gameRouter = require('./routes/gameRoutes')
const app = express();
const PORT = 4000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", gameRouter);
