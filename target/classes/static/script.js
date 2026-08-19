const display = document.getElementById("display");

let firstNumber = null;

let operation = null;


// Add number to display
function appendNumber(number) {

    display.value += number;

}


// Choose + - * /
function chooseOperation(selectedOperation) {

    if (display.value === "") {
        return;
    }

    firstNumber = parseFloat(display.value);

    operation = selectedOperation;

    display.value = display.value + " " + selectedOperation + " ";


}


// Clear everything
function clearDisplay() {

    display.value = "";

    firstNumber = null;

    operation = null;

}


// Delete last character
function deleteLast() {

    display.value = display.value.slice(0, -1);

}


// Calculate result
async function calculate() {

    if (
        firstNumber === null ||
        operation === null ||
        display.value === ""
    ) {

        return;

    }

    const secondNumber = parseFloat(display.value);

    let endpoint;


    if (operation === "+") {

        endpoint = "add";

    } else if (operation === "-") {

        endpoint = "subtract";

    } else if (operation === "*") {

        endpoint = "multiply";

    } else if (operation === "/") {

        endpoint = "divide";

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

                    number2: secondNumber

                })
            }
        );


        if (!response.ok) {

            display.value = "Error";

            return;

        }


        const result = await response.json();

        display.value = result;


        firstNumber = result;

        operation = null;


    } catch (error) {

        console.error(error);

        display.value = "Server Error";

    }

}