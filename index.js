/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.
//My API Endpoint: https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players
/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
const playerEndpoint =
  "https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players";
let all_players = [];
let a_player = null;
const appBody = document.querySelector("#app");
const playerList = document.createElement("div");
playerList.id = "dataList";
appBody.append(playerList);
const individualPlayer = document.createElement("div");
individualPlayer.id = "individual";
appBody.append(individualPlayer);
const titleHeader = document.createElement("div");
titleHeader.id = "title";
titleHeader.innerHTML = `<h1>Puppy Bowl 2026</h1>`;
document.body.prepend(titleHeader);
const columnNamesContainer = document.createElement("div");
columnNamesContainer.id = "columnNames";
titleHeader.insertAdjacentElement("afterend", columnNamesContainer);
columnNamesContainer.innerHTML = `<div id=theList><h2>Roster</h2></div><div id=theData><h2>Player Details</h2></div>`;
const playerForm = document.createElement("div");
playerForm.id = "playerCreationForm";
playerForm.innerHTML = `
<h2 id=formHeader>Invite A Puppy</h2>
<form id=newPlayerForm>
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" required><br>
  <label for="breed">Breed:</label><br>
  <input type="text" id="breed" name="breed" required><br>
  <label for="status">Status:</label>
  <select id="status" name="status" required>
    <option value="bench">bench</option>
    <option value="field">field</option>
  </select>
    <label for="imageUrl">Image URL:</label><br>
  <input type="text" id="imageUrl" name="imageUrl" required><br>
  <label for="teamId">Team:</label>
  <select id="teamId" name="teamId" required>
    <option value="14030">Fluff</option>
    <option value="14029">Ruff</option>
  </select>
  <button type="submit">Submit</button>
</form>
`;
appBody.append(playerForm);

////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players",
    );
    const { data } = await response.json();
    const layer1 = data;
    const { players } = layer1;
    all_players = players;
  } catch (error) {
    console.log(error);
  }
};

dataList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("playerName")) {
    console.log("YES!!!");
    await fetchSinglePlayer(event.target.dataset.playerid);
    render();
  }
});

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 * @param {number} playerId
 */
/**
 * Note: In order to call fetchSinglePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to fetch, we cannot call fetchSinglePlayer()
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players/${playerId}`,
    );
    const { data } = await response.json();
    const { player } = data;
    a_player = player;
    console.log(a_player);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * What does that sound like we need?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  try {
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      },
    );
    const { data } = await response.json();
    console.log(data);
    players.push(data);
  } catch (error) {
    console.log(error);
  }
};

newPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(newPlayerForm);
  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
    status: formData.get("status"),
    imageUrl: formData.get("imageUrl"),
    teamId: formData.get("teamId"),
  };
  await addNewPlayer(newPlayer);
  await fetchAllPlayers();
  render();
});

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to remove, we cannot call removePlayer()
 */

const removePlayer = async (playerId) => {
  console.log("PlayerId");
  console.log(playerId);
  try {
    await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players/${playerId}`,
      {
        method: "DELETE",
      },
    );
    all_players = all_players.filter((player) => {
      return player.id !== playerId * 1;
    });
    a_player = null;
  } catch (error) {
    console.log(error);
  }
};

individualPlayer.addEventListener("click", async (event) => {
  console.log(event.target.id);
  if (event.target.id === "deleteButton") {
    console.log("Does This Work???");
    await removePlayer(event.target.dataset.playerid);
    render();
  }
});

/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked such as: name, id, breed, status, image, and team or unassigned if no team
 * - Remove from roster. When a button is clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  const html = all_players.map((player) => {
    return `<div class= listView>
    <img class = playerImage src=${player.imageUrl}>
    <p class = playerName data-playerid=${player.id}>${player.name}</p>
    </div>`;
  });
  playerList.innerHTML = html.join("");
  if (!a_player) {
    individualPlayer.innerHTML = "Please Select A Player!";
  } else {
    individualPlayer.innerHTML = `
        <div id=individual>
            <div class = playerCardImageContainer>
            <img class = playerCardImage src = ${a_player.imageUrl}>
            </div>
            <h3>Name: ${a_player.name}</h3>
            <p>
               <strong>ID:</strong> ${a_player.id}
            </p>    
            <p>
                <strong>Breed:</strong> ${a_player.breed}
            </p>
            <p>
                <strong>Team:</strong> ${a_player.team.name}
            </p>
            <p>
                <strong>Status:</strong> ${a_player.status}
            </p>
            <br>
            <br>
              <button id="deleteButton" data-playerId=${a_player.id}>Remove From Roster</button>
        </div>
      `;
  }
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need?
  await fetchAllPlayers();
  render();
};

init();
