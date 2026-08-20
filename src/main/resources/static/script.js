const display = document.getElementById("display");

let firstNumber = null;
let operation = null;
let secondNumber = "";
let waitingForSecondNumber = false;


// Add number to display
function appendNumber(number) {

    // If result was just calculated and user enters a new number
    if (waitingForSecondNumber && operation === null) {
        firstNumber = null;
        secondNumber = "";
        waitingForSecondNumber = false;
    }

    // Don't allow multiple decimal points
    if (number === "." && secondNumber.includes(".")) {
        return;
    }

    // Don't allow 00 at the beginning
    if (secondNumber === "0" && number !== ".") {
        secondNumber = "";
    }

    secondNumber += number;

    if (firstNumber !== null && operation !== null) {
        display.value = firstNumber + " " + operation + " " + secondNumber;
    } else {
        display.value = secondNumber;
    }
}


// Choose + - * /
function chooseOperation(selectedOperation) {

    if (secondNumber === "") {
        return;
    }

    firstNumber = parseFloat(secondNumber);

    operation = selectedOperation;

    secondNumber = "";

    waitingForSecondNumber = true;

    display.value = firstNumber + " " + selectedOperation;
}


// Clear everything
function clearDisplay() {

    display.value = "";

    firstNumber = null;

    operation = null;

    secondNumber = "";

    waitingForSecondNumber = false;
}


// Delete last character
function deleteLast() {

    if (secondNumber !== "") {

        secondNumber = secondNumber.slice(0, -1);

    }

    if (firstNumber !== null && operation !== null) {

        display.value =
            firstNumber + " " + operation + " " + secondNumber;

    } else {

        display.value = secondNumber;
    }
}


// Calculate result
async function calculate() {

    if (
        firstNumber === null ||
        operation === null ||
        secondNumber === ""
    ) {
        return;
    }

    const secondNumberValue = parseFloat(secondNumber);

    let endpoint;

    if (operation === "+") {

        endpoint = "add";

    } else if (operation === "-") {

        endpoint = "subtract";

    } else if (operation === "*") {

        endpoint = "multiply";

    } else if (operation === "/") {

        endpoint = "divide";

    } else {

        return;
    }


    try {

        const response = await fetch(
            `/api/calculator/${endpoint}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    number1: firstNumber,
                    number2: secondNumberValue
                })
            }
        );


        if (!response.ok) {

            display.value = "Error";

            return;
        }


        const result = await response.json();

        display.value = result;

        // Store result for next calculation
        firstNumber = result;

        operation = null;

        secondNumber = String(result);

        waitingForSecondNumber = true;


    } catch (error) {

        console.error("Calculator error:", error);

        display.value = "Server Error";
    }
}