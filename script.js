// global variables
var moveCount = 0;
var timer = null;
var seconds = 0;

// updates move counter
function updateMoveCounter() {
    document.querySelector(".button4").innerText = "Moves: " + moveCount;
}

// continually updates timer, in seconds
function updateTimer() {
    seconds++;
    document.querySelector(".button3").innerText = "Time: " + seconds + "s";
}

// starts timer presented on page
function startTimer() {
    if (timer === null) {
        timer = setInterval(updateTimer, 1000);
    }
}

// reset our move counter and clock
function resetGame() {
    moveCount = 0;
    seconds = 0;
    clearInterval(timer);
    timer = null;
    document.querySelector(".button3").innerText = "Time: 0s";
    document.querySelector(".button4").innerText = "Moves: 0";
}

// function used to swap tiles- for use in shuffle function
function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

// shuffle function to randomly shuffle tiles around
function shuffle() {
    resetGame();
    
    
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            var row2 = Math.floor(Math.random() * 4 + 1);
            var column2 = Math.floor(Math.random() * 4 + 1);
            swapTiles("cell" + row + column, "cell" + row2 + column2);
        }
    }
}

// logic for tile clicks, determines where tile needs to move
function clickTile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;

    startTimer();
    
    if (tile != "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            moveCount++;
            updateMoveCounter();
            startTimer();
            checkWin();
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            moveCount++;
            updateMoveCounter();
            startTimer();
            checkWin();
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            moveCount++;
            updateMoveCounter();
            startTimer();
            checkWin();
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
            moveCount++;
            updateMoveCounter();
            startTimer();
            checkWin();
            return;
        }
    }
}

// see if we won!!
function checkWin() {
    var count = 1;
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            if (document.getElementById("cell" + row + column).className !== "tile" + count) {
                return; // Not solved yet
            }
            count++;
        }
    }

    clearInterval(timer);
    setTimeout(function () {
        alert("🎉 Congrats bestie! You won in " + moveCount + " moves and " + seconds + " seconds! 🎉");
    }, 300);
}

// easy mode button logic configuration
function easyMode() {
    resetGame();
    var count = 1;
    for (var row = 1; row <= 4; row++) {
        for (var column = 1; column <= 4; column++) {
            document.getElementById("cell" + row + column).className = "tile" + count;
            count++;
        }
    }
    swapTiles("cell44", "cell43");
}

// mixes up pieces as soon as window loads
window.onload = function() {
    shuffle(); 
};
