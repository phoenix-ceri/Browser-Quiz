// Various constants and variables
const scoreboardTable = document.getElementById('scoreboard-table'    );
const enterNameInput = document.getElementById('enter-name-input'    );
const enterNameButton = document.getElementById('enter-name-btn'      );
const clearScoreboardButton = document.getElementById('clear-scoreboard-btn');
const playAgainButton = document.getElementById('again-btn');
// Event listeners
enterNameButton      .addEventListener('click', enterNameButtonClick      );
clearScoreboardButton.addEventListener('click', clearScoreboardButtonClick);
playAgainButton.addEventListener('click', playagain);
// Populate scoreboard
var scoreboard         ; // This holds the scoreboard array
var scoreboardAsString ; // We use this to help move the data in and out of local storage
// 1. Try to get our scores array from localStorage
scoreboardAsString = localStorage.getItem('scoreboard');
// 2. If this is the first time this code has run, there will be no data in local storage
if (!scoreboardAsString)
{
    scoreboard = [];
}
// 3. This isn't the first time this code has run; so there was data in local storage
else
{
    scoreboard = JSON.parse(scoreboardAsString);
}
populateScoreboard();
// Populates scoreboard table with scoreboard information
function populateScoreboard ()
{
    // Sort scoreboard by points
    scoreboard.sort((a, b) => (a.points < b.points) ? 1 : -1)
    // Reset scoreboard rows
    scoreboardTable.innerHTML = '<tr> <th>Rank</th> <th>Name</th> <th>Score</th> </tr>';
    // Append score rows
    scoreboard.forEach((score, index) =>
    {
        if (score.name)
        {
           scoreboardTable.innerHTML += '<tr> <td>' + (index + 1) + '</td> <td>' + score.name + '</td> <td>' + score.points + '</td> </tr>';
        }
    }) ;
}
// Updates scoreboard with entered name                 
function enterNameButtonClick (e)
{
    console.log('Entering name on scoreboard') ;
    // Replace any instances in scoreboard where name is empty with name provided by player
    scoreboard.forEach((score, index) =>
    {
      if (!score.name)
      {
          score.name = enterNameInput.value;
      }
    }) ;  
    // Store scoreboard again
    scoreboardAsString = JSON.stringify(scoreboard);
    localStorage.setItem('scoreboard', scoreboardAsString);
    // Reset scorebard
    populateScoreboard();
}
// Clears scoreboard and returns to the quiz page
function clearScoreboardButtonClick ()
{
  console.log('Clearing scoreboard');
  localStorage.removeItem('scoreboard');
  window.location.href = "index.html";
}
function playagain(){window.location.href = "index.html"}

//finally after 15 hours straight this thing is done. finally just finally