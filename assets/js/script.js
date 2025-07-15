// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("button");

    for (const button of buttons) {
        button.addEventListener("click", function () {
            let dataType = this.getAttribute("data-type");
            if (dataType === "submit") {
                alert("You clicked submit!");
            } else {
                let gameType = dataType;
                alert(`You clicked ${gameType}`);
            }
        })
    }
})

function runGame() {

}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}