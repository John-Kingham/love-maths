// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("button");

    for (const button of buttons) {
        button.addEventListener("click", function () {
            let dataType = this.getAttribute("data-type");
            if (dataType === "submit") {
                checkAnswer();
            } else {
                runGame(dataType);
            }
        })
    }
    runGame("addition");
})

/**
 * The main game loop, called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // create two random numbers between 1 and 25 (inclusive)
    let num1 = Math.floor((Math.random() * 25) + 1);
    let num2 = Math.floor((Math.random() * 25) + 1);

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;        
    }
}

/**
 * Check the user's answer against the correct answer
 */
function checkAnswer() {
    let userAnswer = parseInt(document.querySelector("#answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    if (userAnswer === calculatedAnswer[0]) {
        alert("Hey! You got it right!");
        incrementScore();
    } else {
        alert(`Wrong! You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}.`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}

/**
 * Reads the operands and operator from the dom.
 * 
 * Returns: [int: answer, str: operationName]
 * 
 * operationName in ("addition", "subtract", "multiply", "division")
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.querySelector("#operand1").textContent);
    let operand2 = parseInt(document.querySelector("#operand2").textContent);
    let operator = document.querySelector("#operator").textContent;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator: ${operator}. Aborting!`;
    }
}

/**
 * Increments the correct answer score by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.querySelector("#score").textContent);
    document.querySelector("#score").textContent = ++oldScore;

}

/**
 * Increments the incorrect answer score by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.querySelector("#incorrect").textContent);
    document.querySelector("#incorrect").textContent = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.querySelector("#operand1").textContent = operand1;
    document.querySelector("#operand2").textContent = operand2;
    document.querySelector("#operator").textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}