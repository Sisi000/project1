const { findGameById, createGame, updateGameById } = require("../db/gameModel");

let gameState = {
  inventory: "",
  name: "",
};

const start = () => {
  return `<h1 style="font-family:middleearth;font-size:20px">Welcome to the game >>Lord of the Things<<</h1><h2 style="color:red;margin-left:4.5em">---DEMO VERSION---</h2><p style="margin-left:2.5em;"><img src="/images/toastermap.jpg"><br><br>Please enter your name: <input id="name"/>
  <a id="link"><button>Go</button></a>
  <script> 
    let nameInput = document.getElementById('name')
    nameInput.addEventListener('keyup', (e) => {
    let link = document.getElementById('link')
    link.setAttribute('href', "http://localhost:4000/api/name?name=" + e.target.value)
    });
    </script></p>`;
};

const loadGameState = async (id) => {
  let loadedGameState = await findGameById(id);
  gameState = loadedGameState;
  gameState.inventory = [];
  updateGameById(gameState._id, gameState);
  let returnMessage = `<img src="/images/frodo1.jpg"> <img src="/images/gandalf2.jpg"> <br><br><p>Hello again ${gameState.name}!</p>Please choose your character (a or b): <br>a) Fraudo <a href="http://localhost:4000/api/char?character=a">click here</a> <br>b) Gundalf <a href="http://localhost:4000/api/char?character=b"><span style="color:red"> not available</span></a>`;
  return returnMessage;
};

const createGameState = async (name) => {
  let newGameState = await createGame({ name: name });
  let newGameId = newGameState._id;
  let game = await findGameById(newGameId);
  gameState = game;
  let message = `<img src="/images/frodo1.jpg"> <img src="/images/gandalf2.jpg"> <br><br><p>Hello ${name}!</p>This is DEMO version. In DEMO version you can play only with Fraudo. <br>For more information please visit the following <a href="http://localhost:4000/api/char?character=b">link.</a><br><br>Please choose your character (a or b): <br>a) Fraudo <a href="http://localhost:4000/api/char?character=a">click here</a> <br>b) Gundalf <span style="color:red"> not available</span>`
  return message;
};

const chooseCharacter = (character) => {
  if (character === "a" || character === "A") {
    return `<img src="/images/shire.gif"><br><br>You chose Fraudo! Let's start an adventure! <br><br>You live in a peaceful village of Squire.<br>One day wizard Gundalf came to the village and told you that you have to leave Squire immediately,<br>and take the toaster to the Elven haven of Ravendell.<br><br>Choose (a or b):<br>a) if you are accepting quest <a href="http://localhost:4000/api/wood?quest1=a">click here</a><br>b) if you are refusing quest <a href="http://localhost:4000/api/wood?quest1=b">click here</a>`;
  } else if (character === "b" || character === "B") {
    return `<img src="/images/gandalf1.jpg"><br><br>In DEMO version you can play only with Fraudo.<br>If you would like to play with Gundalf, please activate your game by paying $100. <br>For now we are accepting only interac e-transfers. <br>You can send money to <a href = "mailto: sivansic@gmail.com">sivansic@gmail.com</a> and we will send you an activation code. <br>Thank you!<br><br>Please enter your activation code: <input id="name"/>
    <a id="link"><input type="button" value="Go"
    onClick="alert( 'Please enter valid activation code' )"><br><br><button onclick="goBack()">Go Back</button>
      <script>
      function goBack() {
         window.history.back();
      }
      </script>`;
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const wood = (quest1) => {
  if (quest1 === "a" || quest1 === "A") {
    const addInv = "Toaster";
    if (!gameState.inventory.includes(addInv)) {
      gameState.inventory.push(addInv);
    }
    {
      const addInv2 = " Bread";
      if (!gameState.inventory.includes(addInv2)) {
        gameState.inventory.push(addInv2);
      }
    }
    updateGameById(gameState._id, gameState);
    return '<br>You accepted the quest!<br><i>Items are added to your inventory: Toaster and Bread. Check your inventory. </i> <br><br>Gundalf told you to meet him at the Inn Pranking Horse in the village of Brie.<br>You set off with your friends SamNotWise, MerryGoRound and Pooppin.<br><br><img src="/images/roots.jpg"><br><br>In the woods you hear somebody is coming! <br>You tell your friends to hide behind the tree roots but you see the rabbit hole next to it.<br><br>Choose (a or b):<br>a) jump into the rabbit hole <a href="http://localhost:4000/api/tree?quest2=a">click here</a><br>b) hide under the tree roots <a href="http://localhost:4000/api/tree?quest2=b">click here</a><br><br><a href="http://localhost:4000/api/inventory"><b><i>Inventory</a>';
  } else if (quest1 === "b" || quest1 === "B") {
    return `<img src="/images/sauron.jpg"><br><br>You su*k. Dark Lord Saufron is now king of the leftFlatEarth. <br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const inventory = () => {
  let seeInv = gameState.inventory;
  // console.log(seeInv);
  return `<i>In your inventory you have: ${seeInv}<br><br><img src="/images/inventory.jpg"><br><br><button onclick="goBack()">Go Back</button>
  <script>
  function goBack() {
     window.history.back();
  }
  </script>`;
};

const tree = (quest2) => {
  if (quest2 === "a" || quest2 === "A") {
    return `<img src="/images/rabbit.jpg"><br><br>Why would you jump into the rabbit hole?!? This is not Alice in Wonderland. <br>You are dead now (or at least broken and can't finish the game).<br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else if (quest2 === "b" || quest2 === "B") {
    let indexForRemoval = 1;
    let numArray = gameState.inventory;
    numArray.splice(indexForRemoval, 1);
    updateGameById(gameState._id, gameState);
    // console.log(gameState.inventory);
    return '<img src="/images/ferry.jpg"><br><br>You and your friends start to running but Blank Riders saw you and start chasing you. <br>You were running so fast that your bread droped from your inventory. <br><i>Your inventory has been updated.</i> <br><br>You came to river and saw Ferry.<br><br>Choose (a or b):<br> a) Fight Blank Riders <a href="http://localhost:4000/api/ferry?quest3=a">click here</a><br> b) Hop on Ferry <a href="http://localhost:4000/api/ferry?quest3=b">click here</a><br><br><a href="http://localhost:4000/api/inventory1"><b><i>Inventory</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const inventory1 = () => {
  let seeInv = gameState.inventory;
  // console.log(seeInv);
  return `<i>In your inventory you have: ${seeInv}<br><br><img src="/images/inventory1.jpg"><br><br><button onclick="goBack()">Go Back</button>
  <script>
  function goBack() {
     window.history.back();
  }
  </script>`;
};

const ferry = (quest3) => {
  if (quest3 === "a" || quest3 === "A") {
    return `<img src="/images/facepalm.jpg"><br>Really?? You dead...<br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else if (quest3 === "b" || quest3 === "B") {
    const addInv = " Barrow blade";
    if (!gameState.inventory.includes(addInv)) {
      gameState.inventory.push(addInv);
    }
    updateGameById(gameState._id, gameState);
    return `<br>After you escaped from Blank Riders, you came to the village of Brie. <br>At the inn you asked for Gundalf, but last time he was seen here six months ago. <br>Ranger Spider joined your group. He gave you some barrow swords so you and your friends can defend you.<br><i> Your inventory is updated.</i><br><br><img src="/images/weatherbottom.jpg"><br><br>You left village of Brie and on Weatherbottom hill you are ambushed by the Nazgoal. <br><br>Choose (a or b): <br> a) You fight them <a href="http://localhost:4000/api/ravendell?quest4=a">click here</a><br> b) You decide to put your hand in toaster <a href="http://localhost:4000/api/ravendell?quest4=b">click here</a><br><br><a href="http://localhost:4000/api/inventory2"><b><i>Inventory</a>`;
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const inventory2 = () => {
  let seeInv = gameState.inventory;
  // console.log(seeInv);
  return `<i>In your inventory you have: ${seeInv}</i><br><br><img src="/images/inventory2.jpg"><br><br><button onclick="goBack()">Go Back</button>
<script>
function goBack() {
   window.history.back();
}
</script>`;
};

const ravendell = (quest4) => {
  if (quest4 === "a" || quest4 === "A") {
    return `<img src="/images/frododied.jpg"><br><br>Oh please..they killed you next second. <br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else if (quest4 === "b" || quest4 === "B") {
    const addInv = " String";
    if (!gameState.inventory.includes(addInv)) {
      gameState.inventory.push(addInv);
    }
    {
      const addInv2 = " Methril";
      if (!gameState.inventory.includes(addInv2)) {
        gameState.inventory.push(addInv2);
      }
    }
    updateGameById(gameState._id, gameState);
    return 'As you put your hand in the toaster, you entered into the Wreathworld. <br>The Watch King, stabs you with a Morgoal blade. Arwine, an Alf, locates Spider and rescues you, <br>summoning flood-waters that sweep the Nazgoal away. She takes you to Ravendell, where you are healed by the Alfses. <br>You meet there Gundalf and your uncle Bulbo. <br>Bulbo gives you his sword String and chainmail shirt made of methril. <i>Your inventory is updated.</i><br><img src="/images/rivendell.jpg"><br>You attended council of Elves, Men and Dwarves.<br>They were making decision who gonna take the toaster to Murdor. Everybody are yelling, <br>you are thinking what to do. <br><br>Choose (a or b): <br> a) You say that you will take the toaster to Murdor! <a href="http://localhost:4000/api/ravendell2?quest5=a">click here</a><br> b) You are silent... <a href="http://localhost:4000/api/ravendell2?quest5=b">click here</a><br><br><a href="http://localhost:4000/api/inventory3"><b><i>Inventory</a>';
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const inventory3 = () => {
  let seeInv = gameState.inventory;
  // console.log(seeInv);
  return `<i>In your inventory you have: ${seeInv}</i><br><br><img src="/images/inventory3.jpg"><br><br><button onclick="goBack()">Go Back</button>
<script>
function goBack() {
   window.history.back();
}
</script>`;
};

const ravendell2 = (quest5) => {
  if (quest5 === "a" || quest5 === "A") {
    return '<img src="/images/frodomordor.jpg"><br><br>Accompanied by Fellowship of the toaster, you continued your adventure. <br>Long story short, you came to mount Damn.<br><br>Choose (a or b): <br>a) Throw the toaster into the fires <a href="http://localhost:4000/api/end2?quest6=a">click here</a> <br>b) Keep the toaster for yourself <a href="http://localhost:4000/api/end2?quest6=b">click here</a><br><br><a href="http://localhost:4000/api/inventory3"><b><i>Inventory</a>';
  } else if (quest5 === "b" || quest5 === "B") {
    return `<img src="/images/chicken.jpg"><br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else {
    return "You have to enter a or b. Try again.";
  }
};

const end = () => {
  return `<img src="/images/end.jpg">`
}

const end2 = (quest6) => {
  if (quest6 === "a" || quest6 === "A") {
    return `<img src="/images/happyend2.jpg"><br><br>You saved the world!! Congratulations!<br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else if (quest6 === "b" || quest6 === "B") {
    return `<img src="/images/really.jpg"><br><br>Choose (a or b):<br>a) To restart the game <a href="http://localhost:4000/api/loadId?gameId=${gameState._id}">click here</a><br>b) To end the game <a href="http://localhost:4000/api/end">click here</a>`;
  } else {
    return "You have to enter a or b. Try again.";
  }
};

module.exports = {
  start,
  loadGameState,
  createGameState,
  chooseCharacter,
  wood,
  inventory,
  inventory1,
  tree,
  ferry,
  inventory2,
  ravendell,
  inventory3,
  ravendell2,
  end,
  end2,
};
