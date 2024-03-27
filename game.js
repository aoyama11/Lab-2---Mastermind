document.addEventListener("DOMContentLoaded", function() {
    let currentBoardCells = ["board0", "board1", "board2", "board3"];
    let currentRow = 0;
    let num = 0;
    const possibleColors = ["red", "yellow", "blue", "green", "orange", "blueviolet"];
    let cellColor = []

    //create the random color code
    let code = [];

    while (code.length < 4) {
        let color = possibleColors[Math.floor(Math.random() * 6)];
        if (!code.includes(color)) {
            code.push(color);
        }
    }
    
    //create the cells and add them to the board
    for(let i = 0; i < 36; i++){
        let cell = document.createElement("div");
        cell.className = "boardCell";
        cell.id = "board" + i;
        document.querySelector(".board").appendChild(cell);
    }

    //create pegs
    for(let i = 0; i < 32; i++){
        let cell = document.createElement("div");
        cell.className = "pegCell";
        cell.id = "peg" + i;
        document.querySelector(".peg").appendChild(cell);
    }

    //change color of board cell
    function changeColor(color) {
        return function() {
            document.getElementById(currentBoardCells[num]).style.backgroundColor = color;
            cellColor[num] = color
            num++
            if (num===4) { //resets so that it's consistent with column num
                num = 0
            }
        }
    }

    //calls function above with corresponding colors by clicking on them
    document.getElementById("red").addEventListener("click", changeColor("red"));
    document.getElementById("orange").addEventListener("click", changeColor("orange"));
    document.getElementById("yellow").addEventListener("click", changeColor("yellow"));
    document.getElementById("green").addEventListener("click", changeColor("green"));
    document.getElementById("blue").addEventListener("click", changeColor("blue"));
    document.getElementById("violet").addEventListener("click", changeColor("blueviolet"));


    //functions for when "submit" is clicked
    function submitFunc() {
        updatePegs();
        checkResult();
        changeCurrentRow();
    }

    document.getElementById("submit").addEventListener("click", submitFunc);

    //access user input
    //red dots for the number of colors in the right position, white dots for right colors in the wrong position
    function updatePegs() {
        let correctPosition = 0;
        let correctColor = 0;

        for (let i = 0; i < 4; i++) {
            if (cellColor[i] === code[i]) {
                correctPosition++;
            }
            else if (code.includes(cellColor[i])) {
                correctColor++;
            }
        }

        let pegs = document.querySelectorAll(".pegCell");
        for (let i = 0; i < correctPosition; i++) {
            pegs[currentRow * 4 + i].style.backgroundColor = "red";
        }
        for (let i = correctPosition; i < correctPosition + correctColor; i++) {
            pegs[currentRow * 4 + i].style.backgroundColor = "white";
        }
    }

    //check if win or lose -- reveal secret code
    function checkResult(){
        if (currentRow > 6) {
            alert("Game Over! You ran out of turns. The correct answer is revealed.");
            document.getElementById("board32").style.backgroundColor = code[0];
            document.getElementById("board33").style.backgroundColor = code[1];
            document.getElementById("board34").style.backgroundColor = code[2];
            document.getElementById("board35").style.backgroundColor = code[3];

        } else if (cellColor[0] === code[0] && 
            cellColor[1] === code[1] &&
            cellColor[2] === code[2] &&
            cellColor[3] === code[3]) {
            alert("Congrats! You won!");
            document.getElementById("board32").style.backgroundColor = code[0];
            document.getElementById("board33").style.backgroundColor = code[1];
            document.getElementById("board34").style.backgroundColor = code[2];
            document.getElementById("board35").style.backgroundColor = code[3];
        }
    }

    //change row
    function changeCurrentRow(){
        currentRow += 1;
        let mult = 4;

        currentBoardCells = [
            "board" + (currentRow*mult), 
            "board" + (currentRow*mult+1), 
            "board" + (currentRow*mult+2), 
            "board" + (currentRow*mult+3)];
        currentPegCells = [
            "peg" + (currentRow*mult), 
            "peg" + (currentRow*mult+1), 
            "peg" + (currentRow*mult+2), 
            "peg" + (currentRow*mult+3)];
    } 
});
