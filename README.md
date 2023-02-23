# odin-rock-paper-scissors
My first JavaScript project from scratch. This began as a game to play in the browser console, which took prompts from the player each round and alerted of an overall winner after five rounds. I was then tasked with created a UI for the program, which I decided to add a few additional features to.

<div float="left">
  <img src="./images/rock-hover.svg" width="100" />
  <img src="./images/paper-hover.svg" width="100" /> 
  <img src="./images/scissors-hover.svg" width="100" />
</div>

### Site layout
- ✔️ At the top of the page, h1 will read: Rock, Paper, Scissors
- ✔️ In the centre of the page is the 'arena', where the player choice and the PC choice will face off.
- ✔️ The arena will contain two boxes, one for the player choice and one for the PC choice, with space for a countdown timer in between.
- ✔️ Beneath the arena should be three images where the player will select their tool.
- ✔️ Beneath the tool selection, there should be a scoreboard.

### Setting up the game
- The player should see a pop-up on site load that asks for their name
- There should be an option to skip this step and assign a name of "player".
- There should also be an option to generate a random name from an array.
- There could possible be an option to select game type, e.g. number of rounds to play.

### Choosing a tool
- ✔️ Player starts the round by choosing a tool (rock, paper or scissors).
- ✔️ Tools should have an effect when hovered over and change to an "active" state when clicked.
- ✔️ The player should be prompted to confirm choice before facing the PC.
- ✔️ Upon player choice, the unchosen tools should become greyed out.

### Facing off
- ✔️ The player choice should appear in their box in the arena.
- ✔️ countdown of ...3 ...2 ...1 should appear before the PC choice is revealed.
- Upon revealing the PC choice, the program should wait for one second before declaring a winner.

### Declaring a winner
- The winning tool should change colour, grow and move to the centre of the arena. The losing tool should disappear.
- If the player wins, the tool should change colour to green, if the PC wins, red.
- The player should be promtped to start the next round.

### Keeping score
- The score should keep track of player wins, PC wins, draws and the number of rounds played.
- The score should update at the end of each round.

### Ending the game
- Once either side has met the win condition of 5 wins (or the player-specified win condition), a pop-up declaring the overall winner should display.
- OPTIONAL: the pop-up might feature stats about the game, for instance rounds played, % win rate, favourite tool from each side.
- The player should be invited to play again, taking them back to the initial pop-up.
