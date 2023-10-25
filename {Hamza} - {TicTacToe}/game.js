document.addEventListener("DOMContentLoaded", function () {
    
    const boxs = document.querySelectorAll(".box");
    const restbtn = document.getElementById("reset");
    const information = document.querySelector(".info");

    let player = "X";

    let gamebox = ["", "", "", "", "", "", "", "", ""];

    let gameStatus = true;

    const gamecombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function GameWin() {
        for (let combo of gamecombo) {
            const [a, b, c] = combo;
            if (gamebox[a] && gamebox[a] === gamebox[b] && gamebox[a] === gamebox[c]) {
                gameStatus = false;
                information.textContent = `${player} wins!!`;
                break;
            }

        }
        if(gamebox.every((cell)=> cell !=="") && gameStatus){
            gameStatus = false;
            information.textContent = "its a drawww!!";
        }
   
    }
    function Onclick(event){
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-Cell"));
        if(gamebox[cellIndex] === "" && gameStatus){
            gamebox[cellIndex] = player;
            cell.textContent = player;

            GameWin();

            player = player === "X" ? "O" : "X";
        }
    }
    function ResetGame(){
         gamebox = ["", "", "", "", "", "", "", "", ""];
         gameStatus = true;
         information.textContent ="";
         player = "X";

         boxs.forEach((box) => {
            box.textContent = "";
            box.classList.remove("X", "O");
        });
    }
    boxs.forEach((box, index) => {
        box.setAttribute("data-cell", index);
        box.addEventListener("click", Onclick);
    });

    restbtn.addEventListener("click" , ResetGame );

});