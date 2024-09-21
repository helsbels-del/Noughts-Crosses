//instruction for html to load before the JS is applied 

window.addEventListener('DOMContentLoaded', () => {
//create const and variables for calling elements from html
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerCall = document.querySelector('.call-player');
    const replayButton = document.querySelector('#replay');
    const reported = document.querySelector('.report');
    const twoplayergame = document.querySelector('#twoplayer');

function gameSelector(){
    radiotwoplayerChecked = document.getElementById("twoplayer").checked;
    radioagainstpcChecked = docment.getElementById("againstpc").checked;

    if (radiotwoplayerChecked && !radioagainstpcChecked) {
        document.getElementById("tpgame");

    }
}
// Declare variables and create array for grid
let game = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O';
let isGameActive = true;

const PLAYERO_WINS = 'PLAYERO_WINS';
const PLAYERX_WINS = 'PLAYERX_WINS';
const DRAW = 'DRAW';

/*
Indexes within the game
[0] [1] [2]
[3] [4] [5]
[6] [7] [8]
*/
//Winning combinations in the array 
const  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//Function with for loop for checking for winning combinations.
function handleResultValidation(){
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCombination = winningCombinations[i];
        const x = game[winCombination[0]];
        const y = game[winCombination[1]];
        const z = game[winCombination[2]];
        if (x === '' || y === '' || z === '') {
            continue;
            }
            if (x === y && y === z) {
                gameWon = true;
                break;
            }
    }
    if (gameWon) {
        report(currentPlayer === 'O' ? PLAYERO_WINS : PLAYERX_WINS);
        isGameActive = false;
        return;
    }
    if (!game.includes(''))
        report(DRAW);    
    }
    
// instructionhow to show winner or draw status 

const report = (type) => {
    switch(type){
        case PLAYERO_WINS:
            reported.innerHTML = 'Player <span id="pO" class="playerO">O</span> WINS';
            countScoreO();
            break;
            case PLAYERX_WINS:
                reported.innerHTML = 'Player <span id ="pX" class="playerX">X</span> WINS';
                countScoreX();
                break;
                case DRAW:
                    reported.innerHTML = 'Draw';
    }
    reported.classList.remove('hide');
    };
// how to show and change which player 
    const isValidAction = (box) => {
        if (box.innerText === 'O' || box.innerText === 'X'){
            return false;
        }
        return true;
    };    

    const updateScore = (index) => {
        game[index] = currentPlayer;
    }

const changePlayer = () => {
    playerCall.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer ==='O' ? 'X': 'O';
    playerCall.innerText = currentPlayer;
    playerCall.classList.add(`player${currentPlayer}`);
}

const playerAction = (box, index) => {
    if(isValidAction(box) && isGameActive) {
        box.innerText = currentPlayer;
        box.classList.add(`player${currentPlayer}`);
        updateScore(index);
        handleResultValidation();
        changePlayer();
    }
}

// how to replay game at end 

const replayGame = () => {
    game = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    reported.classList.add('hide');

    if (currentPlayer === 'X') {
        changePlayer();
         }

         boxes.forEach(box => {
            box.innerText =  '';
            box.classList.remove('playerO');
            box.classList.remove('playerX');
         });
}

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => playerAction(box, index));
    });

    replayButton.addEventListener('click', replayGame);
});
//tally score

function countScoreO() {
    let oldscoreO = parseInt(document.getElementById("scoreO").innerText);
    document.getElementById("scoreO").innerText = ++oldscoreO;
}

function countScoreX() {
    let oldscoreX = parseInt(document.getElementById("scoreX").innerText);
    document.getElementById("scoreX").innerText = ++oldscoreX;
}