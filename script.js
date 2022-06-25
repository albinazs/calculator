const display = document.querySelector('.display');
const calcDisplay = document.querySelector('.calcDisplay');
const clearAll = document.querySelector('#clearAll');
const del = document.querySelector('#delete');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('#equal');


display.textContent = "0";
calcDisplay.textContent = "";
const displayOutput = [];
const calcDisplayOutput = [];
const n1 = [];
const n2 = [];
let operator = "";
let result = 0;
const operators = ["/", "*", "-", "+"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

numberButtons.forEach(button => button.addEventListener('click', () => populateScreen(button.textContent)));
operationButtons.forEach(button => button.addEventListener('click', () => populateScreen(button.textContent)));
equal.addEventListener('click', toCalculate);
clearAll.addEventListener('click', () => {clearScreen(), clearCalcScreen()});
del.addEventListener('click', deleteLast);

function populateScreen(input) { 
    let lastInput = displayOutput[displayOutput.length - 1];
    console.log(lastInput);
    if (display.textContent == "0" && result == "0" && (operators.includes(input))) {
        n1.push("0");
    }
    else if (display.textContent == "0" && (operators.includes(input))) {
        n1.push("0");
        displayOutput.push("0");
    }
    if(displayOutput == result && (numbers.includes(input))) {
        clearScreen();
        clearCalcScreen ();
    }
    if(displayOutput == result && (operators.includes(input))) {
        n1.length = 0;
        n1.push(result);
    }
    if (operators.includes(lastInput) && operators.includes(input)) {
        displayOutput.pop(lastInput);
    }
    if ((operators.includes(lastInput) || lastInput == "=") && input ==="=") {
        return;
    }
    if (displayOutput.length === 12) {
        return;
    } 
    //if(input === "." && displayOutput.find(item => item ===".")) {
        //return;
    //}

    displayOutput.push(input);
    display.textContent = displayOutput.join('');
    updateInputVars(input);
}

function updateInputVars(input) {
    if(operators.includes(operator) && operators.includes(input)) {
        toCalculate();
        operator = input;
        result = n1;
    }
    else if (operators.includes(input)) {
        operator = input;
    }
    else if (numbers.includes(input) && (!operators.some(operator => displayOutput.includes(operator)))) 
    {
        n1.push(input);
    } else if (numbers.includes(input) && (operators.some(operator => displayOutput.includes(operator)))) {
        n2.push(input);
    }
}

function toCalculate () {
    populateScreen("=");
    
    calcDisplay.textContent = displayOutput.join("");

    if(n2.length === 0) {
        return;
    }

    let a = n1.join('');
    let b = n2.join('');

    if (operator === "/") {
        if(b == "0") {
            alert("You can't divide by zero!");
            return;
        }
        result = a / b;
    } else if (operator === "*") {
        result = a * b;
    } else if (operator === "-") {
        result = a - b;
    } else if (operator === "+") {
        result = parseInt(a) + parseInt(b);
    }

    if (result.toString().length > 12) {
        result = result.toString().slice(0,12);
    }
    clearScreen();
    populateScreen(result);
    operator = "";
}

function clearScreen() {
    displayOutput.length = 0;
    n1.length = 0;
    n2.length = 0;
    display.textContent = "0";

}

function clearCalcScreen () {
    calcDisplayOutput.length = 0;
    calcDisplay.textContent = "";
}

//works only once!!! and bug when called after calculation (removes the whole result)
function deleteLast() {
    let toDelete = displayOutput[displayOutput.length - 1];
    displayOutput.pop(toDelete);
    //display.textContent = displayOutput.join('');
    populateScreen();
}

const buttons = document.querySelectorAll('button');
