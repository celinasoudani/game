
var errors = 0;
var matches = 0;
var cardList = [
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/ball.png?v=1731633390896",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/cane.png?v=1731633395341",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/car.png?v=1731633399332",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/cookie.png?v=1731633402607",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/deer.png?v=1731633406307",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/gift.png?v=1731633409686",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/santa.png?v=1731633412759",
    "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/tree.png?v=1731633416907",
]

var cardSet;
var board = [];
var rows = 4;
var columns = 4;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 60;

timerContainer.innerHTML = totalSeconds + ' s';

 function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds--;
        timerContainer.innerHTML = totalSeconds + 's';
      
      if (totalSeconds <= 0) {
            clearInterval(liveTimer); // Stop the timer
            timerContainer.innerHTML = "Time's Up!";
      }
    }, 1000);
}

startTimer()

function stopTimer() {
    clearInterval(liveTimer);
}


function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
 //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arrange the board 4x4
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}


function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/ribbon.jpeg?v=1731633022839";
        }
    }
}

function selectCard() {

    if (this.src.includes("https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/ribbon.jpeg?v=1731633022839")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    if (card1Selected.src !== card2Selected.src) {
        // If cards do not match, flip them back
        card1Selected.src = "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/ribbon.jpeg?v=1731633022839";
        card2Selected.src = "https://cdn.glitch.global/e24765d1-a35a-4143-b97b-e7ae82c14a51/ribbon.jpeg?v=1731633022839";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    } else {
        // If cards match, increment matches count
        matches += 1;

        // Check if all matches are found
        if (matches === (rows * columns) / 2) {
            showPopup(); // Show the popup when all cards are matched
        }
    }

    // Reset selected cards
    card1Selected = null;
    card2Selected = null;
}

function showPopup() {
    // Check if popup already exists to avoid duplication
    if (document.getElementById("popup")) return;

    // Create the popup
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.innerHTML = `
        <h2>🎉 Congratulations! 🎉</h2>
        <p>You matched all the cards!</p>
        <button id="play-again">Play Again</button>
    `;
    document.body.appendChild(popup);

    // Adds Play Again button
    document.getElementById("play-again").addEventListener("click", () => {
        location.reload(); // Restart the game
    });
}





