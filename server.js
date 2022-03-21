const express = require("express");
const path = require("path");

const {
  start,
  load,
  chooseCharacter,
  wood,
  tree,
  ferry,
  ravendell,
  chicken,
  createGameState,
  loadGameState
} = require("./fraudo");

const app = express();
const PORT = 4000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/start", (req, res) => {
  let startmsg = start();
  res.send(startmsg)
});

app.get("/loadGame", (req, res) => {
  // let gameId = req.query.gameId;
  let loadedGameMessage = load();
  res.send(loadedGameMessage);
});

app.get("/loadId", async (req, res) => {
  let gameId = req.query.gameId;
  let loadedGameMessage = await loadGameState(gameId);
  res.send(loadedGameMessage);
});

app.get("/name", async (req, res) => {
  let name = req.query.name;
  let responseMessage = await createGameState(name)
  res.send(responseMessage);
});

app.get("/char", (req, res) => {
  let character = req.query.character;
  let answer = chooseCharacter(character);
  res.send(answer);
});

app.get("/wood", (req, res) => {
  let quest1 = req.query.quest1;
  let answer = wood(quest1);
  res.send(answer);
});

app.get("/tree", (req, res) => {
  let quest2 = req.query.quest2;
  let answer = tree(quest2);
  res.send(answer);
});

app.get("/ferry", (req, res) => {
  let quest3 = req.query.quest3;
  let answer = ferry(quest3);
  res.send(answer);
});

app.get("/ravendell", (req, res) => {
  let quest4 = req.query.quest4;
  let answer = ravendell(quest4);
  res.send(answer);
});

app.get("/chicken", (req, res) => {
  let quest5 = req.query.quest5;
  let answer = chicken(quest5);
  res.send(answer);
});

app.get("/end", (req, res) => {
  res.send('<img src="/images/end.jpg">');
});

