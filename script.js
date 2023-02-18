const playerChoice = document.getElementById('player-choice')
const pcChoice = document.getElementById('pc-choice')

const optionRock = document.getElementById('choice-rock');
const optionPaper = document.getElementById('choice-paper');
const optionScissors = document.getElementById('choice-scissors');
const playerOptions = [optionRock, optionPaper, optionScissors];

const playerMessage = document.getElementById('player-box').firstElementChild;

const blipSound = document.getElementById('audio-blip');
const getConfirmSound = document.getElementById('audio-get-confirm');
const confirmTrue = document.getElementById('confirm-true');

// Play sound functions

function playBlip() {
    blipSound.currentTime = 0;
    blipSound.play();
}

function playGetConfirm() {
    getConfirmSound.currentTime = 0;
    getConfirmSound.play();
}

function playConfirmTrue() {
    confirmTrue.currentTime = 0;
    confirmTrue.play();
}

// For player options, highlight, play a sound and display an arena preview on hover

function highlightOption (option) {
    if (option === optionRock) {
        optionRock.setAttribute('class', 'rock-yellow');
    } else if (option === optionPaper) {
        optionPaper.setAttribute('class', 'paper-yellow');        
    } else if (option === optionScissors) {
        optionScissors.setAttribute('class', 'scissors-yellow');
    }
    option.addEventListener('mouseleave', resetOption)
}

function resetOption () {
    optionRock.setAttribute('class', 'rock-light');
    optionPaper.setAttribute('class', 'paper-light');        
    optionScissors.setAttribute('class', 'scissors-light');
    }

function showPreview (option) {
    if (option === optionRock) {
        playerChoice.setAttribute('class', 'rock-dark');
    } else if (option === optionPaper) {
        playerChoice.setAttribute('class', 'paper-dark');        
    } else if (option === optionScissors) {
        playerChoice.setAttribute('class', 'scissors-dark');
    }
    option.addEventListener('mouseleave', resetPreview);
}

function resetPreview () {
    playerChoice.setAttribute('class', 'unknown-choice');
}

playerOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        playBlip(),
        highlightOption(option),
        showPreview(option)
    });
})

// On click of player options, ask player to confirm choice and highlight the arena preview

function getConfirmMessage(option) {
    if (option === optionRock) {
        playerMessage.textContent = 'Choose Rock?'
    } else if (option === optionPaper) {
        playerMessage.textContent = 'Choose Paper?'    
    } else if (option === optionScissors) {
        playerMessage.textContent = 'Choose Scissors?'
    };
    option.addEventListener('mouseleave', resetPlayerMessage);
}

function resetPlayerMessage () {
    playerMessage.textContent = 'Make your choice:';
}

function getConfirmOption (option) {
    if (option === optionRock) {
        optionRock.setAttribute('class', 'rock-yellow-overlay');
    } else if (option === optionPaper) {
        optionPaper.setAttribute('class', 'paper-yellow-overlay');        
    } else if (option === optionScissors) {
        optionScissors.setAttribute('class', 'scissors-yellow-overlay');
    }
}

function getConfirmOptionMessage (option) {
    option.textContent = 'Click to confirm'
    option.addEventListener('mouseleave', () => {option.textContent = ''})
}

function getConfirmPreview (option) {
    if (option === optionRock) {
        playerChoice.setAttribute('class', 'rock-yellow');
    } else if (option === optionPaper) {
        playerChoice.setAttribute('class', 'paper-yellow');        
    } else if (option === optionScissors) {
        playerChoice.setAttribute('class', 'scissors-yellow');
    }
}

playerOptions.forEach(option => {
    option.addEventListener('click', () => {
        playGetConfirm(),
        getConfirmMessage(option),
        getConfirmOption(option),
        getConfirmOptionMessage(option),
        getConfirmPreview(option)
    });
})

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