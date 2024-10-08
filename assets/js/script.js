//Event listener to listen for DOM content loaded, for html to load before the JS is applied 

document.addEventListener('DOMContentLoaded', () => {
    //create variables for calling elements from html.
    //use array.from function for .box as querySelector All will return a note list. This will convert to proper array
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerCall = document.querySelector('.call-player');
    const replayButton = document.querySelector('#replay');
    const playButton = document.querySelector('#play');
    const homeButton = document.querySelector('#home');
    const reported = document.querySelector('.report');
    const twoplayergame = document.querySelector('#twoplayer');
    const againstpcgame = document.querySelector('#againstpc');

    // Declare variables and create array for grid t

    let game = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'O';
    let isGameActive = true;
    let emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // Endgame states 

    const PLAYERO_WINS = 'PLAYERO_WINS';
    const PLAYERX_WINS = 'PLAYERX_WINS';
    const DRAW = 'DRAW';

    // Choosing which game to play and return to home page

    function gameSelector() {
        document.getElementById("page").style.display = 'none';
        document.getElementById("showGame").style.display = 'block';
       
        if (twoplayergame.checked) {
            
            document.getElementById("tpgame").style.visibility = 'visible';
            document.getElementById('pcgame').style.visibility = 'hidden';
        } else if (againstpcgame.checked) {
            document.getElementById('pcgame').style.visibility = 'visible';
            document.getElementById('tpgame').style.visibility = 'hidden';
           
        }
    }

    playButton.addEventListener('click', gameSelector);

    function homeSelector() {
        replayGame()
        document.getElementById("scoreO").innerText = 0;
        document.getElementById("scoreX").innerText = 0;
        document.getElementById("page").style.display = 'block';
        document.getElementById("showGame").style.display = 'none';

    }

    homeButton.addEventListener('click', homeSelector);

    /*
    Indexes within the game
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */

    //Winning combinations in the array 
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //Check if have a winner by looping through array of winning combinations.
    function handleResultValidation() {
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

    // To show endgame status

    const report = (type) => {
        switch (type) {
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

        //remove hide class to show the result to the user

        reported.classList.remove('hide');
    };
    //checks if box has a value already

    const isValidAction = (box) => {
        if (box.innerText === 'O' || box.innerText === 'X') {
            return false;
        }
        //find which box has been checked
        let boxIndex = boxes.indexOf(box);

        //find that value in the emptyBoxes array
        let emptyBoxIndex = emptyBoxes.indexOf(boxIndex);
        //and remove it
        emptyBoxes.splice(emptyBoxIndex, 1);

        return true;
    };
    // updates the current player score at end of game
    const updateScore = (index) => {
        game[index] = currentPlayer;
    };
    // changePlayer function to update player display
    const changePlayer = () => {
        playerCall.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        playerCall.innerText = currentPlayer;
        playerCall.classList.add(`player${currentPlayer}`);
        // PC game and PCs turn
        if (againstpcgame.checked && currentPlayer === 'X') {
            pcsTurn();
        }
    };

    function pcsTurn() {
        let pcsChoice = emptyBoxes[(Math.floor(Math.random() * emptyBoxes.length))];


        playerAction(boxes[pcsChoice], pcsChoice);
    }

    // Implement playerAction function Represents a turn in the game. This function will be called when a person clicks on a box

    const playerAction = (box, index) => {
        if (isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateScore(index);
            handleResultValidation();
            changePlayer();
        }
    };

    // Reset game 

    const replayGame = () => {
        game = ['', '', '', '', '', '', '', '', ''];
        emptyBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        isGameActive = true;
        reported.classList.add('hide');

        if (currentPlayer === 'X') {
            changePlayer();
        }

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerO');
            box.classList.remove('playerX');
        });
    };
    // Attach event listener to each box in the game grid

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => playerAction(box, index));
    });

    //click handler to reset game

    replayButton.addEventListener('click', replayGame);


    //tally score

    function countScoreO() {
        let oldscoreO = parseInt(document.getElementById("scoreO").innerText);
        document.getElementById("scoreO").innerText = ++oldscoreO;
    }

    function countScoreX() {
        let oldscoreX = parseInt(document.getElementById("scoreX").innerText);
        document.getElementById("scoreX").innerText = ++oldscoreX;
    }

});