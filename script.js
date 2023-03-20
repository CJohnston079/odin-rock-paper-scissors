let playerChoice = '';
let pcChoice = '';

let playerWins = 0;
let pcWins = 0;
let draws = 0;
let roundsPlayed = 0;

let playerName = 'Player';
let winningScore = 3;
let roundsRemaining = 3;
let gameMode = 'first-to';
let gameSpeed = 'normal';

const playerChoiceIcon = document.getElementById('player-choice');
const pcChoiceIcon = document.getElementById('pc-choice');
const playerChoiceHighlight = document.getElementById('player-choice').firstElementChild;
const pcChoiceHighlight = document.getElementById('pc-choice').firstElementChild;

const optionRock = document.querySelector('#choice-rock');
const optionPaper = document.querySelector('#choice-paper');
const optionScissors = document.querySelector('#choice-scissors');
const playerOptions = [optionRock, optionPaper, optionScissors];

const optionRockDisabled = document.querySelector('#choice-rock-disabled');
const optionPaperDisabled = document.querySelector('#choice-paper-disabled');
const optionScissorsDisabled = document.querySelector('#choice-scissors-disabled');
const playerOptionsDisabled = [optionRockDisabled, optionPaperDisabled, optionScissorsDisabled];

const infoMessage = document.getElementById('player-box').firstElementChild;
const confirmOverlay = document.createElement('p');
const vsCountdown = document.getElementById('vs-countdown');
const nextRoundOption = document.getElementById('next-round')

const overlay = document.getElementById('overlay');
const gameOverScreen = document.getElementById('game-over-screen');
const gameStartScreen = document.getElementById('game-start-screen');

const counterPlayerWins = document.getElementById('score-player');
const counterPcWins = document.getElementById('score-pc');
const counterDraws = document.getElementById('score-neutral');
const counterRoundsPlayed = document.getElementById('score-rounds');
counterPlayerWins.textContent = playerWins;
counterPcWins.textContent = pcWins;
counterDraws.textContent = draws;
counterRoundsPlayed.textContent = roundsPlayed;

const startGameButton = document.querySelector('#start-game-button');
const playAgainButton = document.querySelector('#play-again-button');

const optionArrows = document.querySelectorAll('.side-arrow');

const scoreSelector = document.querySelector('#score-selector');
const increaseWinningScoreSelector = document.querySelector('#rounds-increase');
const decreaseWinningScoreSelector = document.querySelector('#rounds-decrease');

// Play sound functions

const gameOptionSound = document.getElementById('audio-option');
const blipSound = document.getElementById('audio-blip');
const getConfirmSound = document.getElementById('audio-get-confirm');
const confirmTrueSound = document.getElementById('confirm-true');
const countdownSound = document.getElementById('countdown');
const roundStartSound = document.getElementById('round-start');
const roundWinSound = document.getElementById('round-win');
const roundLossSound = document.getElementById('round-loss');
const roundDrawSound = document.getElementById('round-draw');
const nextRoundSound = document.getElementById('next-round-sound');

const playGameOptionSound = () => {
    gameOptionSound.currentTime = 0;
    gameOptionSound.play();
}
const playBlipSound = () => {
    blipSound.currentTime = 0;
    blipSound.play();
}
const playGetConfirmSound = () => {
    getConfirmSound.currentTime = 0;
    getConfirmSound.play();
}
const playCountdownSound = () => {
    countdownSound.currentTime = 0;
    countdownSound.play();
}
const playConfirmTrueSound =() => confirmTrueSound.play();
const playRoundStartSound = () => roundStartSound.play();
const playRoundWinSound = () => roundWinSound.play();
const playRoundLossSound = () => roundLossSound.play();
const playRoundDrawSound = () => roundDrawSound.play();
const playNextRoundSound = () => nextRoundSound.play();

// Menu screen

for (let i = 0; i < optionArrows.length; i++) {
    optionArrows[i].addEventListener('mousedown', playCountdownSound);
}

const updateScoreSelectorDisplay = () => scoreSelector.textContent = winningScore;

function increaseWinningScore() {
    resetAnimation(scoreSelector)
    if (winningScore < 9) {
        winningScore++;
        updateScoreSelectorDisplay();
        scoreSelector.style.animation = 'option-change 500ms';
    }
}

function descreaseWinningScore() {
    if (winningScore > 1) {
        winningScore--;
        updateScoreSelectorDisplay()
        scoreSelector.style.animation = 'option-change 500ms';
    }
}

increaseWinningScoreSelector.addEventListener('mousedown', () => {
    increaseWinningScore()
    setTimeout(resetAnimation, 500, scoreSelector)
});
decreaseWinningScoreSelector.addEventListener('mousedown', () => {
    descreaseWinningScore()
    setTimeout(resetAnimation, 500, scoreSelector)
});

function startGame() {
    overlay.style.animation = 'fade-in 1s reverse'
    setTimeout(() => {
        overlay.setAttribute('class', 'disabled');
        gameStartScreen.setAttribute('class', 'disabled');
    }, 1000)
    playRoundStartSound();
}

startGameButton.addEventListener('mousedown', startGame)
// document.getElementById("player-name-input").addEventListener('keydown', startGame)

function setPlayerName() {
    playerName = document.getElementById("player-name-input").value;
    return playerName
}

// For player options, highlight, play a sound and display an arena preview on hover

function highlightOption(option) {
    if (option === optionRock) {
        optionRock.setAttribute('class', 'rock-yellow');
    } else if (option === optionPaper) {
        optionPaper.setAttribute('class', 'paper-yellow');        
    } else if (option === optionScissors) {
        optionScissors.setAttribute('class', 'scissors-yellow');
    }
    option.addEventListener('mouseleave', resetOption)
}

function resetOption() {
    optionRock.setAttribute('class', 'rock-light');
    optionPaper.setAttribute('class', 'paper-light');        
    optionScissors.setAttribute('class', 'scissors-light');
    }

function showPreview(option) {
    if (option === optionRock) {
        playerChoiceIcon.setAttribute('class', 'rock-dark');
    } else if (option === optionPaper) {
        playerChoiceIcon.setAttribute('class', 'paper-dark');        
    } else if (option === optionScissors) {
        playerChoiceIcon.setAttribute('class', 'scissors-dark');
    }
    option.addEventListener('mouseleave', resetPreview);
}

function resetPreview() {
    playerChoiceIcon.setAttribute('class', 'unknown-choice');
}

function resetChoiceDescriptionOpacity() {
    document.querySelector('#rock-description').style.opacity = 1;
    document.querySelector('#paper-description').style.opacity = 1;
    document.querySelector('#scissors-description').style.opacity = 1;
}

playerOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        playBlipSound(),
        highlightOption(option),
        showPreview(option)
        });
})

// When player clicks on an option, ask player to confirm choice and highlight the arena preview

function getConfirmMessage(option) {
    if (option === optionRock) {
        infoMessage.textContent = 'Choose Rock?'
    } else if (option === optionPaper) {
        infoMessage.textContent = 'Choose Paper?'
    } else if (option === optionScissors) {
        infoMessage.textContent = 'Choose Scissors?'
    };
    option.addEventListener('mouseleave', resetInfoMessage);
    option.addEventListener('mouseleave', resetChoiceDescriptionOpacity)
}

function resetInfoMessage() {
    infoMessage.style.color = ('white');
    infoMessage.textContent = 'Make your choice:';
}

function getConfirmIcon(option) {
    if (option === optionRock) {
        optionRock.setAttribute('class', 'rock-yellow-overlay');
        document.querySelector('#rock-description').style.opacity = 0.5;
    } else if (option === optionPaper) {
        optionPaper.setAttribute('class', 'paper-yellow-overlay');
        document.querySelector('#paper-description').style.opacity = 0.5;
    } else if (option === optionScissors) {
        optionScissors.setAttribute('class', 'scissors-yellow-overlay');
        document.querySelector('#scissors-description').style.opacity = 0.5
    }
}

function getConfirmPreview(option) {
    if (option === optionRock) {
        playerChoiceIcon.setAttribute('class', 'rock-yellow');
    } else if (option === optionPaper) {
        playerChoiceIcon.setAttribute('class', 'paper-yellow');        
    } else if (option === optionScissors) {
        playerChoiceIcon.setAttribute('class', 'scissors-yellow');
    }
}

function displayConfirmOverlay(option) {
    confirmOverlay.textContent = 'Click to confirm';
    confirmOverlay.setAttribute('class', 'confirm-overlay')
    option.appendChild(confirmOverlay);
    option.addEventListener('mouseleave', () => {
        confirmOverlay.remove()
    });
}

playerOptions.forEach(option => {
    option.addEventListener('click', playGetConfirmSound)
    option.addEventListener('click', () => {
        getConfirmMessage(option),
        getConfirmIcon(option),
        getConfirmPreview(option),
        displayConfirmOverlay(option)
    });
})

// Confirm player choice and activate arena

function confirmplayerChoice() {
    if (playerChoiceIcon.getAttribute('class') === 'rock-yellow') {
        playerChoiceIcon.setAttribute('class', 'rock-light');
        playerChoice = 'ROCK'
    } else if (playerChoiceIcon.getAttribute('class') === 'paper-yellow') {
        playerChoiceIcon.setAttribute('class', 'paper-light')
        playerChoice = 'PAPER'
    } else if (playerChoiceIcon.getAttribute('class') === 'scissors-yellow') {
        playerChoiceIcon.setAttribute('class', 'scissors-light')
        playerChoice = 'SCISSORS'
    }
}

function activateArena() {
    playerChoiceHighlight.style.animation = 'highlight-white 2s';
    pcChoiceIcon.style.transition = 'background-image 500ms';
    pcChoiceIcon.setAttribute('class', 'unknown-choice-light-flipped');
    vsCountdown.style.color = 'white';
}

function roundStartInfoMessage() {
    infoMessage.textContent = 'Good luck!'
    infoMessage.style.animation = 'flicker 150ms steps(3, start) 1100ms 6'
}

confirmOverlay.addEventListener('mousedown', () => {
    confirmOverlay.remove()
    confirmplayerChoice()
    getPcChoice()
    playConfirmTrueSound()
    hideEnabledOptions()
    showDisabledOptions()
    resetChoiceDescriptionOpacity()
    roundStartInfoMessage()
    activateArena()
    setTimeout(countdown3, 2000)
    setTimeout(() => {
        infoMessage.style.color = 'var(--grey-blue)';
        infoMessage.style.animation = '';
        infoMessage.textContent = 'Round in progress...'
      }, 2000);

})

// Countdown to round 3... 2... 1...

function hideVsCountdown(element) {
    element.style.transition = 'padding 1s ease-out, width 1s ease-out';
    element.style.width = '4rem';
    element.style.padding = 0;
    element.style.opacity = 0;
    element.textContent = '';
}

function countdown3() {
    vsCountdown.textContent = '3'
    vsCountdown.style.animation = 'highlight-white-text 1s, grow-shrink 1s'
    playCountdownSound()
    setTimeout(resetAnimation, 900, vsCountdown)
    setTimeout(countdown2, 1000)
}

function countdown2() {
    vsCountdown.textContent = '2'
    vsCountdown.style.animation = 'highlight-white-text 1s, grow-shrink 1s'
    playCountdownSound()
    setTimeout(resetAnimation, 900, vsCountdown)
    setTimeout(countdown1, 1000)
}

function countdown1() {
    vsCountdown.textContent = '1'
    vsCountdown.style.animation = 'highlight-white-text 1s, grow-shrink 1s'
    playCountdownSound()
    setTimeout(resetAnimation, 900, vsCountdown)
    setTimeout(hideVsCountdown, 1000, vsCountdown)
    setTimeout(playRoundStartSound, 1000)
    setTimeout(displayPcChoice, 1000)
    setTimeout(determineWinner, 2500)
}

// Get pc choice and reveal it to player

function getPcChoice () {
    function randomNumber() {
        return Math.floor(Math.random() * 3)
    }
    if (randomNumber() === 1) {
        pcChoice = 'ROCK';
    } else if (randomNumber() === 2) {
        pcChoice = 'PAPER';
    } else {
        pcChoice = 'SCISSORS';
    }
}

function displayPcChoice() {
    pcChoiceIcon.style.transition = 'background-image 500ms, transform 1s';
    if (pcChoice === 'ROCK') {
        pcChoiceIcon.setAttribute('class', 'rock-light');
    } else if (pcChoice === 'PAPER') {
        pcChoiceIcon.setAttribute('class', 'paper-light');
    } else if (pcChoice === 'SCISSORS') {
        pcChoiceIcon.setAttribute('class', 'scissors-light');
    }
}

// Determine winner

function determineWinner() {
    if (playerChoice === pcChoice) {
        drawIcon(playerChoiceIcon);
        playRoundDrawSound();
        setTimeout(addDraw, 1000);
        declareDraw();
        setTimeout(showNextRoundOption, 1000);
        (playerChoice === 'ROCK') ? numPlayerRockChoices ++ :
        (playerChoice === 'PAPER') ? numPlayerPaperChoices ++ :
        numPlayerScissorsChoices ++ ;
        return
    }
    if (playerChoice === 'ROCK') {
        if (pcChoice === 'SCISSORS') {
            winningIcon(playerChoiceIcon)
            losingIcon(pcChoiceIcon)
            playRoundWinSound()
            setTimeout(addPlayerWin, 1000)
            declarePlayerWin()
        } else {
            winningIcon(pcChoiceIcon)
            losingIcon(playerChoiceIcon)
            playRoundLossSound()
            setTimeout(addPcWin, 1000)
            declarePcWin()
        }
        numPlayerRockChoices ++
    }
    if (playerChoice === 'PAPER') {
        if (pcChoice === 'ROCK') {
            winningIcon(playerChoiceIcon)
            losingIcon(pcChoiceIcon)
            playRoundWinSound()
            setTimeout(addPlayerWin, 1000)
            declarePlayerWin()
        } else {
            winningIcon(pcChoiceIcon)
            losingIcon(playerChoiceIcon)
            playRoundLossSound()
            setTimeout(addPcWin, 1000)
            declarePcWin()
        }
        numPlayerPaperChoices ++
    }
    if (playerChoice === 'SCISSORS') {
        if (pcChoice === 'PAPER') {
            winningIcon(playerChoiceIcon)
            losingIcon(pcChoiceIcon)
            playRoundWinSound()
            setTimeout(addPlayerWin, 1000)
            declarePlayerWin()
        } else {
            winningIcon(pcChoiceIcon)
            losingIcon(playerChoiceIcon)
            playRoundLossSound()
            setTimeout(addPcWin, 1000)
            declarePcWin()
        }
        numPlayerScissorsChoices ++
    }
    setTimeout(checkForWinner, 2000)
}

function losingIcon(icon) {
    if (icon.getAttribute('class') === 'rock-light') {
        icon.setAttribute('class', 'rock-dark');
    } else if (icon.getAttribute('class') === 'paper-light' === true) {
        icon.setAttribute('class', 'paper-dark');
    } else if (icon.getAttribute('class') === 'scissors-light' === true) {
        icon.setAttribute('class', 'scissors-dark');
    }
    icon.style.transition = 'background-image 200ms'
    icon.style.animation = 'flicker 200ms steps(4, start) 400ms 3'
    setTimeout(() => {
        icon.style.width = '0'
        icon.style.visibility = 'hidden'
        icon.style.transition = 'width 1s'
    }, 1000)
}

function winningIcon(icon) {
    if (icon.getAttribute('class') === 'rock-light' && icon.getAttribute('id') === 'player-choice') {
        icon.setAttribute('class', 'rock-green');
    } else if (icon.getAttribute('class') === 'paper-light' && icon.getAttribute('id') === 'player-choice') {
        icon.setAttribute('class', 'paper-green');
    } else if (icon.getAttribute('class') === 'scissors-light' && icon.getAttribute('id') === 'player-choice') {
        icon.setAttribute('class', 'scissors-green');
    } else if (icon.getAttribute('class') === 'rock-light' && icon.getAttribute('id') === 'pc-choice') {
        icon.setAttribute('class', 'rock-red');
    } else if (icon.getAttribute('class') === 'paper-light' && icon.getAttribute('id') === 'pc-choice') {
        icon.setAttribute('class', 'paper-red');
    } else if (icon.getAttribute('class') === 'scissors-light' && icon.getAttribute('id') === 'pc-choice') {
        icon.setAttribute('class', 'scissors-red');
    }
    if (icon.getAttribute('id') === 'player-choice') {
        playerChoiceHighlight.style.animation = 'highlight-green 2s';
        // browserWindow.style.animation = 'highlight-green-window 6s'
        setTimeout(() => {
            icon.style.transform = 'scale(1.2) translateY(-0.4rem)'
            icon.style.transition = 'transform 1s'
            playerChoiceHighlight.style.animation = 'highlight-green 4s linear infinite';
        }, 1000)
    } else if (icon.getAttribute('id') === 'pc-choice') {
        pcChoiceHighlight.style.animation = 'highlight-red 2s linear infinite';
        // browserWindow.style.animation = 'highlight-red-window 6s'
        setTimeout(() => {
            icon.style.transform = 'scaleX(-1.2) scaleY(1.2) translateY(-0.4rem)'
            icon.style.transition = 'transform 1s'
            pcChoiceHighlight.style.animation = 'highlight-red 4s linear infinite';
        }, 1000)
    }
    icon.style.transition = 'background-image 200ms'
    icon.style.animation = 'grow-shrink 1s'
    setTimeout(() => {vsCountdown.style.width = '0rem';}, 1000)
}

function drawIcon(icon) {
    if (icon.getAttribute('class') === 'rock-light') {
        playerChoiceIcon.style.animation = 'draw-rock 1s, player-wobble 400ms linear 200ms 1 normal';
        pcChoiceIcon.style.animation = 'draw-rock 1s, pc-wobble 400ms linear 200ms 1 reverse';
    } else if (icon.getAttribute('class') === 'paper-light') {
        playerChoiceIcon.style.animation = 'draw-paper 1s, player-wobble 400ms linear 200ms 1 normal';
        pcChoiceIcon.style.animation = 'draw-paper 1s, pc-wobble 400ms linear 200ms 1 reverse';
    } else if (icon.getAttribute('class') === 'scissors-light') {
        playerChoiceIcon.style.animation = 'draw-scissors 1s, player-wobble 400ms linear 200ms 1 normal';
        pcChoiceIcon.style.animation = 'draw-scissors 1s, pc-wobble 400ms linear 200ms 1 reverse';
    }
}

function declarePlayerWin() {
    infoMessage.style.color = 'white';
    infoMessage.style.animation = 'player-score-increase 2s';
    // , flicker 200ms steps(4, start) 0s 2';
    infoMessage.textContent = 'Player wins the round!';
}

function declarePcWin() {
    infoMessage.style.color = 'white';
    infoMessage.style.animation = 'pc-score-increase 1s';
    // , flicker 200ms steps(4, start) 0s 2';
    infoMessage.textContent = 'Opponent wins the round!';
}

function declareDraw() {
    infoMessage.style.color = 'white';
    infoMessage.style.animation = 'neutral-score-increase 1s';
    infoMessage.textContent = 'The round is a draw...';
}

// Display players wins, opponent wins, draws and rounds played

function addPlayerWin() {
    playerWins ++
    roundsPlayed ++
    counterRoundsPlayed.textContent = roundsPlayed;
    counterPlayerWins.textContent = playerWins;
    counterPlayerWins.style.animation = 'player-score-increase 1s';
    setTimeout(resetAnimation, 2000, counterPlayerWins)
}

function addPcWin() {
    pcWins ++
    roundsPlayed ++
    counterRoundsPlayed.textContent = roundsPlayed;
    counterPcWins.textContent = pcWins;
    counterPcWins.style.animation = 'pc-score-increase 1s';
    setTimeout(resetAnimation, 2000, counterPcWins)
}

function addDraw() {
    draws ++
    roundsPlayed ++
    counterRoundsPlayed.textContent = roundsPlayed;
    counterDraws.textContent = draws;
    counterDraws.style.animation = 'neutral-score-increase 1s';
    setTimeout(resetAnimation, 2000, counterDraws)
}

// Show options to progress to the next round once results has been declared

nextRoundOption.addEventListener('mousedown', nextRound)

function showNextRoundOption() {
    document.querySelectorAll('.tool-choice')[0].style.opacity = 0.5;
    document.querySelectorAll('.tool-choice')[1].style.opacity = 0.5;
    document.querySelectorAll('.tool-choice')[2].style.opacity = 0.5;
    nextRoundOption.removeAttribute('class')
    nextRoundOption.textContent = 'Begin next round';
    nextRoundOption.style.animation = 'fade-in 2s, grow-shrink-gentle 2s linear 0s infinite';
}

function hideNextRoundOption() {
    document.querySelectorAll('.tool-choice')[0].style.opacity = ''
    document.querySelectorAll('.tool-choice')[1].style.opacity = ''
    document.querySelectorAll('.tool-choice')[2].style.opacity = ''
    nextRoundOption.style.animation = 'zoom-out 500ms';
    setTimeout(() => {
        nextRoundOption.setAttribute('class', 'disabled');
        nextRoundOption.textContent = '';
        nextRoundOption.style.animation = '';
    }, 500)
}

// Show end game screen once an overall winner is determined

function checkForWinner() {
    if (playerWins !== winningScore && pcWins !== winningScore) {
        showNextRoundOption()
    } else {
        showGameOver()
    }
}

function showGameOver() {
    if (playerWins === winningScore) {
        overlay.removeAttribute('class')
        gameOverScreen.removeAttribute('class')
        overlay.style.animation = 'fade-in 2s'
        displayGameStatistics()
        return
    } else if (pcWins === winningScore) {
        overlay.removeAttribute('class')
        gameOverScreen.removeAttribute('class')
        overlay.style.animation = 'fade-in 2s'
        displayGameStatistics()
        return
    } else return
}

function calcGameStatistics() {
    calcPercentage(playerWins);
    calcPercentage(pcWins);
    calcDrawerPercentage()
    calcFavouritePlayerChoice();
    calcFavouriteChoicePercentage()
    console.log(playerWinPercentage)
    console.log(pcWins)
    console.log(drawPercentage)
}

function displayGameStatistics() {
    calcGameStatistics()
    document.querySelectorAll('.result-number')[0].textContent = playerWins;
    document.querySelectorAll('.result-number')[1].textContent = pcWins;
    document.querySelectorAll('.result-number')[2].textContent = draws;
    document.querySelectorAll('.result-number')[3].textContent = roundsPlayed;
    document.querySelectorAll('.result-number')[4].textContent = playerWinPercentage;
    document.querySelectorAll('.result-number')[5].textContent = pcWinPercentage;
    document.querySelectorAll('.result-number')[6].textContent = drawPercentage;
    document.querySelectorAll('.result-number')[7].textContent = favouritePlayerChoice;
    document.querySelectorAll('.result-number')[8].textContent = favouriteChoicePercentage;
}

// Game statistics

let numPlayerRockChoices = 0;
let numPlayerPaperChoices = 0;
let numPlayerScissorsChoices = 0;

let favouritePlayerChoice = '';
let favouriteChoicePercentage = 0;

function checkPlayerChoices() {
    console.log(`Chose ROCK ${numPlayerRockChoices} times, chose PAPER ${numPlayerPaperChoices} times, chose SCISSORS ${numPlayerScissorsChoices} times.`)
}

function calcFavouritePlayerChoice() {
    if (numPlayerRockChoices >= numPlayerPaperChoices && numPlayerRockChoices >= numPlayerScissorsChoices) {
        favouritePlayerChoice = 'ROCK';
    } else if (numPlayerPaperChoices >= numPlayerScissorsChoices && numPlayerPaperChoices >= numPlayerRockChoices) {
        favouritePlayerChoice = 'PAPER';
    } else if (numPlayerScissorsChoices >= numPlayerRockChoices && numPlayerScissorsChoices >= numPlayerPaperChoices) {
        favouritePlayerChoice = 'SCISSORS';
    }
    return favouritePlayerChoice;
}

function calcFavouriteChoicePercentage() {
    if (numPlayerRockChoices >= numPlayerPaperChoices && numPlayerRockChoices >= numPlayerScissorsChoices) {
        favouriteChoicePercentage = 100 / roundsPlayed * numPlayerRockChoices;
    } else if (numPlayerPaperChoices >= numPlayerScissorsChoices && numPlayerPaperChoices >= numPlayerRockChoices) {
        favouriteChoicePercentage = 100 / roundsPlayed * numPlayerPaperChoices;
    } else if (numPlayerScissorsChoices >= numPlayerRockChoices && numPlayerScissorsChoices >= numPlayerPaperChoices) {
        favouriteChoicePercentage = 100 / roundsPlayed * numPlayerScissorsChoices;
    }
    favouriteChoicePercentage = Math.floor(favouriteChoicePercentage);
    return favouriteChoicePercentage;
}

let playerWinPercentage = '';
let pcWinPercentage = '';
let drawPercentage = '';

function calcPercentage(score) {
    let percentage = 100 / roundsPlayed * score;
    if (score === playerWins) {
        playerWinPercentage = Math.floor(percentage);
        return playerWinPercentage;
    }
    if (score === pcWins) {
        pcWinPercentage = Math.floor(percentage)
        return pcWinPercentage;
    }
}

function calcDrawerPercentage() {
    let percentage = 100 / roundsPlayed * draws;
    drawPercentage = Math.floor(percentage);
    return drawPercentage;
}

// Hide/show enabled/disabled options

function hideEnabledOptions() {
    optionRock.setAttribute('class', 'disabled')
    optionPaper.setAttribute('class', 'disabled')
    optionScissors.setAttribute('class', 'disabled')
}

function showDisabledOptions() {
    playerOptions.forEach(option => {
        option.nextElementSibling.style.color = ('var(--grey-blue)')
    });
    optionRockDisabled.setAttribute('class', 'rock-dark');
    optionPaperDisabled.setAttribute('class', 'paper-dark');
    optionScissorsDisabled.setAttribute('class', 'scissors-dark');
}

function hideDisabledOptions() {
    optionRockDisabled.setAttribute('class', 'disabled');
    optionPaperDisabled.setAttribute('class', 'disabled');
    optionScissorsDisabled.setAttribute('class', 'disabled');
}

function showEnabledOptions() {
    playerOptions.forEach(option => {
        option.nextElementSibling.style.color = ('var(--white)')
    });
    optionRock.setAttribute('class', 'rock-light');
    optionPaper.setAttribute('class', 'paper-light');
    optionScissors.setAttribute('class', 'scissors-light');
}

// Reset functons

function resetOptions() {
    hideDisabledOptions();
    showEnabledOptions();
    infoMessage.style.animation = 'flicker 150ms steps(3, start) 250ms 3'
    setTimeout(resetInfoMessage, 700)
    setTimeout(resetAnimation, 700, infoMessage)
}

function resetAnimation(element) {
    element.style.animation = '';
}

function resetInlineStyles(element) {
    element.style = '';
}

function resetArena() {
    resetInlineStyles(playerChoiceIcon)
    resetInlineStyles(pcChoiceIcon)
    resetInlineStyles(vsCountdown)
    resetAnimation(playerChoiceHighlight)
    resetAnimation(pcChoiceHighlight)
    playerChoiceIcon.setAttribute('class', 'unknown-choice');
    pcChoiceIcon.setAttribute('class', 'unknown-choice-flipped');
    vsCountdown.textContent = 'vs'
}

function resetScoreboard() {
    playerWins = 0
    pcWins = 0
    draws = 0
    roundsPlayed = 0
    counterPlayerWins.textContent = playerWins;
    counterPcWins.textContent = pcWins;
    counterDraws.textContent = draws;
    counterRoundsPlayed.textContent = roundsPlayed;
}

function nextRound() {
    resetOptions()
    resetArena()
    hideNextRoundOption()
    playNextRoundSound()
}

function resetGame() {
    resetOptions()
    resetArena()
    resetScoreboard()
}

/*
console.log('Hello, welcome to ROCK, PAPER, SCISSORS');
function getComputerChoice () {
    function randomNumber3 () {
        return Math.floor(Math.random() * 3)
    }
    if (randomNumber3() === 1) {
        return 'ROCK';
    } else if (randomNumber3() === 2) {
        return 'PAPER';
    } else {
        return 'SCISSORS';
    }
}
function getUserChoice() {
    let userInput = prompt('Please input rock, paper or scissors').toUpperCase();
    if (userInput === 'ROCK' || userInput === 'PAPER' || userInput === 'SCISSORS') {
        return userInput;
    } else {
        alert('Error: please input rock, paper or scissors');
        return getUserChoice();
    }
}
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It\'s a draw!';
    }
    if (userChoice === 'ROCK') {
        if (computerChoice === 'SCISSORS') {
            return 'ROCK beats SCISSORS: you win!';
        } else {
            return 'ROCK is beaten by PAPER, you lose!';
        }
    }
    if (userChoice === 'PAPER') {
        if (computerChoice === 'ROCK') {
            return 'PAPER beats ROCK: you win!';
        } else {
            return 'PAPER is beaten by SCISSORS, you lose!';
        }
    }
    if (userChoice === 'SCISSORS') {
        if (computerChoice === 'PAPER') {
            return 'SCISSORS beats PAPER: you win!';
        } else {
            return 'SCISSORS is beaten by ROCK, you lose!';
        }
    }
}
function playRound () {
    computerChoice = getComputerChoice();
    userChoice = getUserChoice();
    console.log(`The computer has chosen: ${computerChoice}`)
    console.log(`You have chosen: ${userChoice}`)
    console.log(`${determineWinner(userChoice, computerChoice)}`)
}
function tallyUserScore(result) {
    if (result === 'ROCK beats SCISSORS: you win!' ||
        result === `PAPER beats ROCK: you win!` ||
        result === `SCISSORS beats PAPER: you win!`) {
        return 1;
    } else if (result === 'ROCK is beaten by PAPER, you lose!' ||
        result === `PAPER is beaten by SCISSORS, you lose!` ||
        result === `SCISSORS is beaten by ROCK, you lose!`) {
        return 0;
    } else {
        return 0;
    }
}
function tallyComputerScore(result) {
    if (result === 'ROCK beats SCISSORS: you win!' ||
        result === `PAPER beats ROCK: you win!` ||
        result === `SCISSORS beats PAPER: you win!`) {
        return 0;
    } else if (result === 'ROCK is beaten by PAPER, you lose!' ||
        result === `PAPER is beaten by SCISSORS, you lose!` ||
        result === `SCISSORS is beaten by ROCK, you lose!`) {
        return 1;
    } else {
        return 0;
    }
    
}
let userScore = 0;
let computerScore = 0;
for (let i = 0; i < 5; i++) {
    playRound();
    let result = determineWinner(userChoice, computerChoice);
    tallyUserScore(result);
    tallyComputerScore(result);
    userScore += tallyUserScore(result);
    computerScore += tallyComputerScore(result);
    console.log(`Player: ${userScore} | Computer: ${computerScore}`)
}
function overallWinner (userScore, computerScore) {
    if (userScore > computerScore) {
        console.log(`Congratulations! You are the champion!`);
        alert(`Congratulations! You are the champion!`);
    } else if (userScore < computerScore) {
        console.log(`Game over! Better luck next time!`);
        alert(`Game over! Better luck next time!`);
    } else {
        console.log(`It's a draw! Try again to beat the computer!`);
        alert(`It's a draw! Try again to beat the computer!`);
    }
}
overallWinner(userScore, computerScore)
location.reload();
*/