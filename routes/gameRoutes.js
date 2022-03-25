const express = require("express");
const router = express.Router();

const {
    start,
    chooseCharacter,
    wood,
    inventory,
    tree,
    ferry,
    ravendell,
    inventory1,
    inventory2,
    inventory3,
    ravendell2,
    end,
    end2,
    createGameState,
    loadGameState
  } = require("../model/game");

router.get("/start", (req, res) => {
  let startmsg = start();
  res.send(startmsg);
});

router.get("/loadGame", async (req, res) => {
  let gameId = req.query.gameId;
  let loadedGameMessage = await loadGameState(gameId);
  res.send(loadedGameMessage);
});

router.get("/loadId", async (req, res) => {
  let gameId = req.query.gameId;
  let loadedGameMessage = await loadGameState(gameId);
  res.send(loadedGameMessage);
});

router.get("/name", async (req, res) => {
  let name = req.query.name;
  let responseMessage = await createGameState(name);
  res.send(responseMessage);
});

router.get("/char", (req, res) => {
  let character = req.query.character;
  let answer = chooseCharacter(character);
  res.send(answer);
});

router.get("/wood", (req, res) => {
  let quest1 = req.query.quest1;
  let answer = wood(quest1);
  res.send(answer);
});

router.get("/inventory", (req, res) => {
  let message = inventory();
  res.send(message);
});

router.get("/inventory1", (req, res) => {
  let message = inventory1();
  res.send(message);
});

router.get("/inventory2", (req, res) => {
  let message = inventory2();
  res.send(message);
});

router.get("/tree", (req, res) => {
  let quest2 = req.query.quest2;
  let answer = tree(quest2);
  res.send(answer);
});

router.get("/ferry", (req, res) => {
  let quest3 = req.query.quest3;
  let answer = ferry(quest3);
  res.send(answer);
});

router.get("/ravendell", (req, res) => {
  let quest4 = req.query.quest4;
  let answer = ravendell(quest4);
  res.send(answer);
});

router.get("/inventory3", (req, res) => {
  let message = inventory3();
  res.send(message);
});

router.get("/ravendell2", (req, res) => {
  let quest5 = req.query.quest5;
  let answer = ravendell2(quest5);
  res.send(answer);
});

router.get("/end", (req, res) => {
  let endmsg = end();
  res.send(endmsg);
})

router.get("/end2", (req, res) => {
  let quest6 = req.query.quest6;
  let answer = end2(quest6);
  res.send(answer);
});

module.exports = router;
