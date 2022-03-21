const { findGameById, createGame, updateGameById } = require("./mongoDb");

let gameState = {
  inventory: [""],
  name: "",
};

const start = () => {
  return `<h1 style="font-family:middleearth;font-size:24px">Welcome to the game >>Lord of the Things<<</h1><img src="/images/toastermap.jpg"><br><br>Please enter your name: <input id="name"/>
  <a id="link"><button>Go</button></a>
  <script> 
    let nameInput = document.getElementById('name')
    nameInput.addEventListener('keyup', (e) => {
    let link = document.getElementById('link')
    link.setAttribute('href', "http://localhost:4000/name?name=" + e.target.value)
    });
    </script>`;
};

const load = () => {
  return `<h1 style="font-family:middleearth;font-size:24px">Welcome to the game >>Lord of the Things<<</h1><img src="/images/loading.gif"><br><br>To reload game please enter your ID: <input id="gameId"/>
  <a id="link"><button>Go</button></a>
  <script> 
    let idInput = document.getElementById('gameId')
    idInput.addEventListener('keyup', (e) => {
    let link = document.getElementById('link')
    link.setAttribute('href', "http://localhost:4000/loadId?gameId=" + e.target.value)
    });
    </script>`;
  };

const loadGameState = async (id) => {
  let loadedGameState = await findGameById(id);
  gameState = loadedGameState;
  let message = `<img src="/images/frodo1.jpg"> <img src="/images/gandalf1.jpg"> <br><br><p>Hello again ${gameState.name}!</p>Please choose your character (a or b): <br>a) Fraudo <a href="http://localhost:4000/char?character=a">click here</a> <br>b) Gundalf <a href="http://localhost:4000/char?character=b">click here</a><br><br>`; 
  return message;
  };

const createGameState = async (name, inventory) => {
  let newGameState = await createGame({ name: name, inventory: ""});
  let newGameId = newGameState._Id;
  let game = await findGameById(newGameId);
  gameState = game;
  let message = `<img src="/images/frodo1.jpg"> <img src="/images/gandalf1.jpg"> <br><br><p>Hello ${name}!</p>Please choose your character (a or b): <br>a) Fraudo <a href="http://localhost:4000/char?character=a">click here</a> <br>b) Gundalf <a href="http://localhost:4000/char?character=b">click here</a><br><br>`; 
  return message;
};

const chooseCharacter = (character) => {
  if (character === "a" || character === "A") {
    return '<img src="/images/shire.gif"><br><br>You chose Fraudo! Let`s start an adventure! <br><br>You live in a peaceful village of Squire.<br>One day wizard Gundalf came to the village and told you that you have to leave Squire immediately,<br>and take the toaster to the Elven haven of Ravendell.<br><br>Choose (a or b):<br>a) if you are accepting quest <a href="http://localhost:4000/wood?quest1=a">click here</a><br>b) if you are refusing quest <a href="http://localhost:4000/wood?quest1=b">click here</a>';
  } else if (character === "b" || character === "B") {
    return "You chose Gundalf. Let's start an adventure. Go to http://localhost:4000/startgundalf";
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const wood = (quest1) => {
  if (quest1 === "a" || quest1 === "A") {
    gameState.inventory = { $push: { inventory: "toaster"} }
    return '<img src="/images/druzina1.jpg"><br><br>You accepted the quest!<br>Items are added to your inventory: toaster and bread. <br>Gundalf told you to meet him at the Inn Pranking Horse in the village of Brie.<br>You set off with your friends SamNotWise, MerryGoRound and Pooppin.<br><br><img src="/images/roots.jpg"><br><br>In the woods you hear somebody is coming! You tell your friends to hide behind the tree roots but you see the rabbit hole next to it.<br><br>Choose (a or b):<br>a) jump into the rabbit hole <a href="http://localhost:4000/tree?quest2=a">click here</a><br>b) hide under the tree roots <a href="http://localhost:4000/tree?quest2=b">click here</a>';
  } else if (quest1 === "b" || quest1 === "B") {
    return '<img src="/images/sauron.jpg"><br><br>You su*k. Dark Lord Saufron is now king of the leftFlatEarth. <br><br>Choose (a or b): <br>a) To restart the game <a href="http://localhost:4000/loadGame">click here</a> <br>b) To end game <a href="http://localhost:4000/end">click here<a/>';
  } else {
    return "You have to enter a or b. Try again.";
  }
  updateGameById(gameState._id, gameState.inventory);
};

const tree = (quest2) => {
  if (quest2 === "a" || quest2 === "B") {
    return '<img src="/images/rabbit.jpg"><br><br>Why would you jump into the rabbit hole?!? This is not Alice in Wonderland. <br>You are dead now (or at least broken and can`t finish the game).<br><br>Choose (a or b):<br> a) To restart the game <a href="http://localhost:4000/loadGame">click here</a><br> b) End game <a href="http://localhost:4000/end">click here</a>';
  } else if (quest2 === "b" || quest2 === "B") {
    return 'You and your friends start to running but Blank Riders saw you and start chasing you. You came to river and saw Ferry.<br><br>Choose (a or b):<br> a) Fight Blank Riders <a href="http://localhost:4000/ferry?quest3=a">click here</a><br> b) Hop on Ferry <a href="http://localhost:4000/ferry?quest3=b">click here</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const ferry = (quest3) => {
  if (quest3 === "a" || quest3 === "A") {
    return '<img src="/images/facepalm.jpg"><br>Really?? You dead...<br><br>Choose (a or b): <br>a) To restart the game <a href="http://localhost:4000/loadGame"">click here</a> <br>b) To end game <a href="http://localhost:4000/end">click here</a>';
  } else if (quest3 === "b" || quest3 === "B") {
    return '<img src="images/rivendell.jpg"><br><br>After you escaped from Blank Riders, you came to village of Brie. <br>At the inn you asked for Gundalf, but last time he was seen here was six months ago. <br>Ranger Spider joined your group. You came to city of Ravendell, where all races <br>were making decision who gonna take the toaster to Murdor. Everybody are yelling, <br>you are thinking what to do. <br><br>Choose (a or b): <br> a) You say that you will take the toaster to Murdor! <a href="http://localhost:4000/ravendell?quest4=a">click here</a><br> b) You are silent... <a href="http://localhost:4000/chicken?quest5=b">click here</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const ravendell = (quest4) => {
  if (quest4 === "a" || quest4 === "A") {
    return '>click here</a> <br>b) To restart the game <a href="http://localhost:4000/loadGame">click here</a>';
  } else if (quest4 === "b" || quest4 === "B") {
    return 'aaa <a href="http://localhost:4000/start">click here</a><br> b) FYI you`ll be dead soon<a href="http://localhost:4000/end">click here</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const chicken = (quest5) => {
  if (quest5 === "a" || quest5 === "A") {
    return "";
  } else if (quest5 === "b" || quest5 === "B") {
    return '<img src="/images/chicken.jpg"><br><br><a Choose (a or b): <br>a) To end game <a href="http://localhost:4000/end">click here</a> <br>b) To restart the game <a href="http://localhost:4000/start">click here</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

module.exports = {
  start,
  load,
  loadGameState,
  createGameState,
  chooseCharacter,
  wood,
  tree,
  ferry,
  ravendell,
  chicken
  };
