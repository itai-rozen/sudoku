let gGame = {
    cellsRevealed: undefined,
    board: []
}
let board = gGame.board


function startGame() {
    console.log('game started!')
    // if (!gGame.cellsRevealed) alert('you must choose difficulty first!')
    // else {
    createBoard();
    updateBoard();
    renderBoard();

    // }
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
                isReveales: false,
                numberInserted: 0
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
    // let board = gGame.board;
        for (let i = 1; i < 10; i++) {
            let allSquaresFull = false;
            let tries = 0 
            while (!allSquaresFull){
                tries++;
                console.log(tries,' try!');
                console.log('=============')
                if (tries > 100) startGame(); 
                clearNumbers(i)
                insertNumber(i);
                allSquaresFull = checkSquares(i);
            }
        }

}

let checkSquares = num => {
    // let board = gGame.board;
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
    console.log('number updated: ',num)
    console.log('==========================')
    let squaresWithoutNumber = getRemainingSquares(num)
    while (squaresWithoutNumber.length > 0) {
        console.log('remaining squares: ',squaresWithoutNumber);
        let chosenSquareNum = squaresWithoutNumber.pop();
        let objectsInSquare = getObjs(chosenSquareNum, 'square');
        let onlyEmptyObjs = objectsInSquare.filter(obj => obj.number === 0);
        if (onlyEmptyObjs.length > 0) {
            let possibleObjects = getPossibleCells(onlyEmptyObjs, num);
            if (possibleObjects.length > 0){
                console.log('possible cell objs: ',possibleObjects);
                console.log('empty objects: ',onlyEmptyObjs.length)
                let rand = generateRandomNumber(0,possibleObjects.length);
                let randomPossibleCellObj = possibleObjects[rand];
                console.log('random possible cell obj @ inser number function: ',randomPossibleCellObj);
                randomPossibleCellObj.number = num
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
        (!numsInCol.includes(cellNumber))){
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
    let squareNums = [1,2,3,4,5,6,7,8,9];
    board.forEach(row => row.forEach(cellObj => {
        if (cellObj.number === num) squareNums.splice(cellObj.square-1,1)
    }))
    return squareNums;
}


const updateGameLevel = cells => {
    gGame.cellsRevealed = cells
    console.log('#cells revealedc: ', gGame.cellsRevealed);
    startGame();
}

let renderBoard = () => {
    let elTable = document.querySelector('.game-board');
    let strHTML = '';
    for (let i = 0; i < 9; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < 9; j++) {
            strHTML += `<td> ${board[i][j].number} </td>`;
        }

        strHTML += `<div class="break"></div> </tr>`;
    }
    elTable.innerHTML = strHTML;
}






function generate1to9() {
    let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let randNum = generateRandomNumber(0, 9);
    return digits[randNum]
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

