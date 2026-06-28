/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.
//My API Endpoint: https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players
/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
const playerEndpoint =
  "https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players";
let players = [];
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
    players = data;
  } catch (error) {
    console.log(error);
  }
};

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
      `https://fsa-puppy-bowl.herokuapp.com/api/2605-JEARON/players/${id}`,
    );
    const { data } = await response.json();
    a_party = data;
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

const addNewPlayer = async (newPlayer) => {};

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

const removePlayer = async (playerId) => {};

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
  const html = players.map((player) => {
    return `<p class="playerName" data-playerid=${player.imageURL}>${player.name}</p>`;
  });
  playerList.innerHTML = html.join("");
  if (!a_player) {
    individualPlayer.innerHTML = "Please Select A Player!";
  } else {
    individualPlayer.innerHTML = `
        <div id=individual>
            
            <h3>'${a_player.name}</h3>
            <p>
                ${a_player.id}
            </p>    
            <p>
                ${a_player.breed}
            </p>
            <p>
                ${a_player.team}
            </p>
            <p>
                ${a_player.status}
            </p>
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
  fetchAllPlayers();
  render();
};

init();
