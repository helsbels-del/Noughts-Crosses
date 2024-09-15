window.addEventListener('DOMContentLoaded', () => {

const boxes = Array.from(documnet.querSelectorAll('.box'));
const playerCall = documnet.querySelector('.callplayer');
const replayButton = documnt.querselector('#replay');
const reported = document.querySelector('.report');

let game = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O';
let isGameActive = true;

const PLAYERO_WINS = 'PLAYERO_WINS';
const PLAYERX_WINS = 'PLAYEX_WINS';
const DRAW = 'DRAW';

/*
Indexes within the board
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
        const winPosition = winningPositions[i];
        const x = board[winPosition[0]];
        const y = board[winPosition[1]];
        const z = board[winPosition[2]];
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
        isGAmeActive = false;
        return;
    }

    if (!boad.includes(''))
        report(DRAW);
    
    }

const report = (type) => {
    switch(type){
        case PLAYERO_WINS:
            report.innerHTML = 'Player <span class="playerO">O</span> WINS';
            break;
            case PLAYERX_WINS:
                report.innerHTML = 'Player <span class="playerX">X</span> WINS';
                break;
                case DRAW:
                    report.innerHTML = 'Draw';
    }
    reported.classList.remove('hide');
    }

    const isValidAction = (box) => {
        if (box.innerText === 'O' || box.innerText === 'X'){
            return false;
        }
        return true;
    };    

    const updateScore = (index) => {
        board[index] = currentPlayer;
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

const replayBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    report,classList.add('hide');

    if (currentPlayer === 'O') {
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
})


    replayButton.addEventListener('click', replayBoard);
});
