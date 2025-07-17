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
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
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
 * Calculates the correct answer.
 * @returns [number, string]
 * 
 * number = correct answer; string = operand name
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.querySelector("#operand1").textContent);
    let operand2 = parseInt(document.querySelector("#operand2").textContent);
    let operator = document.querySelector("#operator").textContent;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
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

/**
 * Displays the addition question
 * @param {number} operand1 
 * @param {number} operand2 
 */
function displayAdditionQuestion(operand1, operand2) {
    document.querySelector("#operand1").textContent = operand1;
    document.querySelector("#operand2").textContent = operand2;
    document.querySelector("#operator").textContent = "+";
}

/**
 * Displays the subtraction question
 * @param {number} operand1 
 * @param {number} operand2 
 */
function displaySubtractQuestion(operand1, operand2) {
    let biggerOperand = (operand1 > operand2) ? operand1 : operand2;
    let smallerOperand = (operand2 < operand1) ? operand2 : operand1;
    document.querySelector("#operand1").textContent = biggerOperand;
    document.querySelector("#operand2").textContent = smallerOperand;
    document.querySelector("#operator").textContent = "-";
}

/**
 * Displays the multiplication question
 * @param {number} operand1 
 * @param {number} operand2 
 */
function displayMultiplyQuestion(operand1, operand2) {
    document.querySelector("#operand1").textContent = operand1;
    document.querySelector("#operand2").textContent = operand2;
    document.querySelector("#operator").textContent = "x";
}

function displayDivisionQuestion() {

}