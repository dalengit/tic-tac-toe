//  Elements 
const xClass = 'x';
const circleClass = 'circle';
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
let circleTurn;

// Selectors
const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[winning-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')

startGame();

restartButton.addEventListener('click', startGame)

// Function to start game
function startGame() {
    // Starts on x turn 
    circleTurn = false;
    // Foreach loop adding event listener to each item with 'data-cell' class 
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    // Sets hover for first turn
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        swapTurns()
        setBoardHoverClass()
      }
}


// Function adds class to show mark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}


// Winning function - checks if any combinations within the array are true
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageText.innerText = 'Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
      })
}

// 
function swapTurns() {
    circleTurn = !circleTurn;
}

// Sets hover for current player
function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
        board.classList.add(circleClass);
    } else {
        board.classList.add(xClass);
    }
}