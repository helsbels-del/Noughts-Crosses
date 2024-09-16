window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerCall = document.querySelector('.call-player');
    const replayButton = document.querySelector('#replay');
    const reported = document.querySelector('.report');

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

const report = (type) => {
    switch(type){
        case PLAYERO_WINS:
            reported.innerHTML = 'Player <span id="pO" class="playerO">O</span> WINS';
            break;
            case PLAYERX_WINS:
                reported.innerHTML = 'Player <span id ="pX" class="playerX">X</span> WINS';
                break;
                case DRAW:
                    reported.innerHTML = 'Draw';
    }
    reported.classList.remove('hide');
    };

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
