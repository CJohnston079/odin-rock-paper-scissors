const rpsArray = ['ROCK', 'PAPER', 'SCISSORS']

const optionRock = document.querySelector('.rps-rock');
const optionPaper = document.querySelector('.rps-paper');
const optionScissors = document.querySelector('.rps-scissors');

const playerChoiceHeading = document.querySelector('#player-box').firstElementChild;

const playerChoice = document.querySelector('#player-choice');
const pcChoice = document.querySelector('#pc-choice');

const choiceConfirmation = document.createElement('p');
choiceConfirmation.textContent = 'Click to confirm choice';
// choiceConfirmation.style.pointerEvents = none;


// Audio files
const confirmSound = document.getElementById('audio-confirm');
const blipSound = document.getElementById('audio-blip');

// Play sound & display choice preview on hover
function rockHover() {
    blipSound.currentTime = 0;
    blipSound.play();

    playerChoice.classList.add('preview-rock');
}

function paperHover() {
    blipSound.currentTime = 0;
    blipSound.play();

    playerChoice.classList.add('preview-paper');
}

function scissorsHover() {
    blipSound.currentTime = 0;
    blipSound.play();

    playerChoice.classList.add('preview-scissors');
}

optionRock.addEventListener('mouseover', rockHover);
optionPaper.addEventListener('mouseover', paperHover);
optionScissors.addEventListener('mouseover', paperHover);

// Confirm player choice
function confirmChoiceRock() {
    confirmSound.play();
    playerChoiceHeading.textContent = 'Choose Rock?';
    optionRock.appendChild(choiceConfirmation);
    optionRock.classList.remove('rps-rock');
    optionRock.classList.add('rps-rock-confirm');
    playerChoice.classList.remove('player-choice-unknown');
    playerChoice.classList.add('player-choice-rock');
}

function denyChoiceRock() {
    blipSound.currentTime = 0;
    blipSound.play()
    playerChoiceHeading.textContent = 'Make your choice';
    optionRock.removeChild(choiceConfirmation);
    optionRock.classList.add('rps-rock');
    optionRock.classList.remove('rps-rock-confirm');
    playerChoice.classList.add('player-choice-unknown');
    playerChoice.classList.remove('player-choice-rock');
}

optionRock.addEventListener('click', confirmChoiceRock);
optionRock.addEventListener('mouseout', denyChoiceRock);

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