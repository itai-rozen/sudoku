let arr = [0,0,0,0,1];
let nonzeroes = arr.filter(num => num !== 0);
console.log('non zeroes ',nonzeroes);


let getSquareNum = (i,j) => {
    if (i >= 0 && i <= 2 ){
        if (j >= 0 && j <=2 ) return 1;
        else if (j >= 3 && j <= 5) return 2;
        else return 3;
    } else if (i >= 3 && i <= 5){
        if (j >= 0 && j <=2 ) return 4;
        else if (j >= 3 && j <= 5) return 5;
        else return 6;
    } else {
        if (j >= 0 && j <=2 ) return 7;
        else if (j >= 3 && j <= 5) return 8;
        else return 9;  
    }
}

function updateBoard(){
    let length = gGame.board.length;
    let board = gGame.board;
    board.forEach(row => row.forEach(num => insertNewNumber(num.i,num.j,num.row,num.col,num.square)))
}

// function updateBoard(){
//     let length = gGame.board.length;
//     let board = gGame.board;
//     for (let i = 0; i < length; i++){
//         for (let j = length - 1; j >= 0; j--){
//             if (board[i][j].number === 0){
//                 let numsInCol = getCol(j);
//                 console.log('nums in col: ',numsInCol)
//                 let numsInRow = getRow(i);
//                 console.log('nums in row: ',numsInRow);
//                 let numsInSquare = getSquare(i,j);
//                 console.log('nums in square: ',numsInSquare);
//                 let newNum = insertNewNumber(i,j,numsInRow,numsInCol,numsInSquare);
//                 gGame.board[i][j].number = newNum;
//             }
//         }
//     }
//     // checkBoard();
// }

function checkBoard(){
    let board = gGame.board;
    let isX = board.every(row => row.every(num => num.number !== 'X'))
    if (!isX){
        createBoard();
        updateBoard();
    }
}

function getRow(i){
    let row = [];
    for (let j = 0; j < gGame.board.length; j++){
        row.push(gGame.board[i][j].number);
    }
    return row;
}

function getCol(j){
    let col = [];
    for (let i = 0; i < gGame.board.length; i++){
        col.push(gGame.board[i][j].number)
    }
    return col;
}



function getSquare(i,j){
    let starterI,endingI,starterJ,endingJ;  
    if (i >=0 && i < 3){
        starterI = 0;
        endingI = 2;
    }  else if (i > 2 && i < 6){
        starterI = 3;
        endingI = 5;
    } else {
        starterI = 6;
        endingI = 8;
    }
    if (j >=0 && j < 3){
        starterJ = 0;
        endingJ = 2;
    }  else if (j > 2 && j < 6){
        starterJ = 3;
        endingJ = 5;
    } else {
        starterJ = 6;
        endingJ = 8;
    }
    let square = [];
    for(let i = starterI; i <= endingI; i++){
        for (let j = starterJ; j <= endingJ; j++){
            square.push(gGame.board[i][j].number)
        }
    }
    return square
}

function insertNewNumber(i,j,rowNum, colNum, squareNum){
    let square = getSquareNum(i,j);
    
}

function getArrayLength(arr){
    return arr.filter(num => num !== 0).length
}

function getPossibleNums(arr){
    let possibles = [];
    for (let i = 1 ;i < 10; i++){
        if (arr.indexOf(i) === -1) possibles.push(i);
    }
    return possibles;
}


let renderBoard = () => {
    let elTable = document.querySelector('.game-board');
    let strHTML = '';
    for (let i = 0; i < 3; i++) {
        // strHTML += `<div class="break"></div>`;
        strHTML += `<tr>`
        for (let j = 0; j < 3; j++) {
            strHTML += `<td> ${renderSquare(i, j)} </td>`;
        }

        strHTML += `<div class="break"></div> </tr>`;
    }
    // console.log(strHTML)
    elTable.innerHTML = strHTML;
}

let renderSquare = (squareX, squareY) => {
    let strHtml = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            strHtml += `<div onclick="showCell(${squareX},${squareY})" class="cell"> ${gGame.board[squareX][squareY].square[i][j]} </div>`
        }
        strHtml += `<div class="break"></div>`;
    }
    return strHtml;
}

