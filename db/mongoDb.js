const { MongoClient, ObjectId } = require("mongodb");

let dbName = "games";
let connectionString = "mongodb://localhost:27017";
const getDb = async () => {
  let connection = await MongoClient.connect(connectionString);
  let db = connection.db(dbName);
  return db;
};

const getCollection = async (name) => {
  let db = await getDb();
  let collection = db.collection(name);
  return collection;
};

const createGame = async (newGameData) => {
  let gameCollection = await getCollection("Lott");
  let result = await gameCollection.insertOne(newGameData);
  return result;
};

const findGameById = async (id) => {
  let gameCollection = await getCollection("Lott");
  let game = await gameCollection.findOne({ _id: ObjectId(id) });
  return game;
};

const updateGameById = async (id, newGameData) => {
  let gameCollection = await getCollection("Lott");
  let updated = await gameCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: newGameData }
  );
  return updated;
};

const findAllGames = async () => {
  let gameCollection = await getCollection("Lott");
  let gameCursor = await gameCollection.find({});
  let gameArray = await gameCursor.toArray();
  return gameArray;
};

const deleteGameById = async (id) => {
  let gameCollection = await getCollection("Lott");
  let deletedGame = await gameCollection.deleteOne({ _id: ObjectId(id) });
  return deletedGame;
};

module.exports = {
  deleteGameById,
  findAllGames,
  findGameById,
  updateGameById,
  createGame,
};
