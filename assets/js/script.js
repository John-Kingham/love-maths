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
        });
    }
    document.getElementById("answer-box").addEventListener("keypress", function(event) {
        switch (event.key) {
            case "Enter":
                checkAnswer();
                break;
            case "+":
                event.preventDefault();
                runGame("addition");
                break;
            case "-":
                event.preventDefault();
                runGame("subtract");
                break;
            case "*":
                event.preventDefault();
                runGame("multiply");
                break;
            case "/":            
                event.preventDefault();
                runGame("division");
                break;
        }
    });
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
        displayQuestion(num1, num2, "+");
    } else if (gameType === "multiply") {
        displayQuestion(num1, num2, "x");
    } else if (gameType === "subtract") {
        let biggerNum = (num1 > num2) ? num1 : num2;
        let smallerNum = (num2 < num1) ? num2 : num1;
        displayQuestion(biggerNum, smallerNum, "-");
    } else if (gameType === "division") {
        // make the bigger number the product of num1 and num2 so that the 
        // answer is always an integer.
        let biggerNum = num1 * num2;
        let smallerNum = num2;
        displayQuestion(biggerNum, smallerNum, "/");
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
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
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
 * Displays the question
 * @param {number} operand1 
 * @param {number} operand2 
 * @param {string}
 */
function displayQuestion(operand1, operand2, operator) {
    document.querySelector("#operand1").textContent = operand1;
    document.querySelector("#operand2").textContent = operand2;
    document.querySelector("#operator").textContent = operator;
    document.querySelector("#answer-box").value = "";
    document.querySelector("#answer-box").focus();
}