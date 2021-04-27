let gGame = {
    cellsRevealed: undefined,
    board: [],
    isOn: true,
}
let board = gGame.board;


const updateGameLevel = cellsRatio => {
    gGame.cellsRevealed = cellsRatio;
    let classesTohide = document.querySelectorAll('.hide-after-selection');
    classesTohide.forEach(c => c.classList.add('hidden'))
    console.log('#cells revealedc: ', gGame.cellsRevealed);
    startGame();
}

function startGame() {
    createBoard();
    updateBoard();
    renderBoard();
}

function createBoard() {
    console.log('creating board!')
    const ROWS = 9
    const COLS = 9
    let gameBoard = []
    for (let i = 0; i < ROWS; i++) {
        gameBoard[i] = []
        for (let j = 0; j < COLS; j++) {
            gameBoard[i][j] = {
                row: i + 1,
                col: j + 1,
                square: getSquareNum(i, j),
                number: 0,
                numberInserted: 0,
                isRevealed: (Math.random()) < (gGame.cellsRevealed),
            }
        }
    }
    board = gameBoard
    console.table(gGame.board)
    console.log(gGame)
}

let getSquareNum = (i, j) => {
    let num;
    if (i < 3) {
        if (j < 3) num = 1;
        else if (j < 6) num = 2;
        else num = 3
    } else if (i < 6) {
        if (j < 3) num = 4;
        else if (j < 6) num = 5;
        else num = 6;
    } else {
        if (j < 3) num = 7;
        else if (j < 6) num = 8;
        else num = 9;
    }
    return num;
}


let updateBoard = () => {
    for (let i = 1; i < 10; i++) {
        let allSquaresFull = false;
        let tries = 0
        while (!allSquaresFull) {
            tries++;
            console.log(tries, ' try!');
            console.log('=============')
            if (tries > 100) startGame();
            clearNumbers(i)
            insertNumber(i);
            allSquaresFull = checkSquares(i);
        }
    }
}

let checkSquares = num => {
    let numCounter = 0;
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj.number === num) numCounter++;
    }))
    return numCounter === 9;
}

let clearNumbers = num => {
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj.number === num) cellObj.number = 0;
    }))
}

let insertNumber = num => {
    console.log('==========================')
    console.log('number updated: ', num)
    console.log('==========================')
    let squaresWithoutNumber = getRemainingSquares(num)
    while (squaresWithoutNumber.length > 0) {
        console.log('remaining squares: ', squaresWithoutNumber);
        let chosenSquareNum = squaresWithoutNumber.pop();
        let objectsInSquare = getObjs(chosenSquareNum, 'square');
        let onlyEmptyObjs = objectsInSquare.filter(obj => obj.number === 0);
        if (onlyEmptyObjs.length > 0) {
            let possibleObjects = getPossibleCells(onlyEmptyObjs, num);
            if (possibleObjects.length > 0) {
                console.log('possible cell objs: ', possibleObjects);
                console.log('empty objects: ', onlyEmptyObjs.length)
                let rand = generateRandomNumber(0, possibleObjects.length);
                let randomPossibleCellObj = possibleObjects[rand];
                console.log('random possible cell obj @ inser number function: ', randomPossibleCellObj);
                randomPossibleCellObj.number = num;
                randomPossibleCellObj.numberInserted = (randomPossibleCellObj.isRevealed) ? num : 0;
            }
        }
    }
}

let getPossibleCells = (emptySquareObjs, cellNumber) => {
    let possibleCellObjects = []
    emptySquareObjs.forEach(cell => {
        let { row, col } = cell;
        let numsInRow = getValues(row, 'row');
        let numsInCol = getValues(col, 'col');
        if (!numsInRow.includes(cellNumber) &&
            (!numsInCol.includes(cellNumber))) {
            possibleCellObjects.push(cell)
        }
    })
    console.log('possible objects @ getPossibleCells: ', possibleCellObjects);
    return possibleCellObjects;
}

let getObjs = (x, prop) => {
    let objs = [];
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj[prop] === x) objs.push(cellObj);
    }))
    return objs;
}

let getValues = (x, prop) => {
    let values = [];
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj[prop] === x) values.push(cellObj.number);
    }))
    return values;
}

let getRemainingSquares = num => {
    let squareNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj.number === num) squareNums.splice(cellObj.square - 1, 1)
    }))
    return squareNums;
}




let renderBoard = () => {
    let elTable = document.querySelector('.game-board');
    let strHTML = '';
    for (let i = 0; i < 9; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < 9; j++) {
            strHTML += `<td> 
            ${board[i][j].isRevealed ? board[i][j].number :
                    `<input class="cell-${i}-${j}" onclick="updateCell(${i},${j})" 
            oninput="userInput(this.value,${i},${j})"  min="1" max="9" type="number" name="number" id="number">`}
            </td>`;
        }
        strHTML += `<div class="break"></div> </tr>`;
    }
    elTable.innerHTML = strHTML;
}

let userInput = (val, i, j) => {
    if (val !== '' && (+val < 1 || +val > 9)) {
        alert('you must choose a number from 1 to 9!');
        updateCell(i, j)
        return;
    }
    if (val === '') hideFinishButton()
    board[i][j].numberInserted = +val;

    console.log('number inserted: ', board[i][j].number);
    checkEndOfGame();
}

let updateCell = (i, j) => {
    if (gGame.isOn) {
        let cell = board[i][j];
        if (cell.isRevealed) return;
        let elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.value = '';
    }
}


let checkEndOfGame = () => {
    let allNumsInserted = board.every(row => row.every(cell => cell.numberInserted !== 0))
    if (allNumsInserted) showFinishButton();

}

let showFinishButton = () => {
    let elButton = document.querySelector('.finish-btn');
    let elButtonClass = elButton.classList;
    if (elButtonClass.contains('none-display')) elButtonClass.remove('none-display')
}

let hideFinishButton = () => {
    let elButton = document.querySelector('.finish-btn');
    let elButtonClass = elButton.classList;
    if (!elButtonClass.contains('none-display')) elButtonClass.add('none-display')
}


let checkGame = () => {
    gGame.isOn = false;
    let wrongs = []
    board.forEach(row => row.forEach(cell => {
        if (cell.number !== cell.numberInserted) wrongs.push(cell)
    }))
    let allNumbersInsertedCorrect = board.every(row => row.every(cell => cell.number === cell.numberInserted))
    if (allNumbersInsertedCorrect) showResult(true);
    else showResult(false);
    stopTimer();
}

let showResult = (isVictory) => {
    let elResult = document.querySelector('.result');
    let elBoard = document.querySelector('.board')
    let elFinishBtn = document.querySelector('.finish-btn');
    let elRetryBtn = document.querySelector('.retry')
    elFinishBtn.classList.add('none-display')
    elResultClass = elResult.classList
    if (elResultClass.contains('none-display')) elResultClass.remove('none-display')
    let strHtml = (isVictory) ? `YOU WON!` : `YOU LOST!`
    strHtml += ` try again?`
    elResult.innerHTML = strHtml;
    elBoard.classList.add('blur');
    elRetryBtn.classList.add('enlarge')
}



let retry = () => {
    location.reload();
}


// let startTimer = () => {
// let s = 0
// setInterval(seconds(s),100)

// }

// let seconds = (s) => {
//     let elTimer = document.querySelector('.timer')
//     s += 1;
//     elTimer.innerHTML = s;
// }

// let stopTimer = () => {
//     clearInterval(gGame.gTime)
// }


let generate1to9 = () => {
    let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randNum = generateRandomNumber(0, 9);
    return digits[randNum]
}

let generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min)

