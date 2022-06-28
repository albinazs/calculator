const currentOperandTextElement = document.querySelector('.display');
const lastOperandTextElement = document.querySelector('.calcDisplay');
const clearAll = document.querySelector('#clearAll');
const del = document.querySelector('#delete');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('#equal');

currentOperandTextElement.textContent = "0";
let currentOperand = "";
let lastOperand = "";
let operator = "";

numberButtons.forEach(button => button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
    })
);

operationButtons.forEach(button => button.addEventListener('click', () => {
    chooseOperation(button.textContent);
    updateDisplay();
    })
);

equal.addEventListener('click', () => {
    toCalculate()
    updateDisplay()
});

clearAll.addEventListener('click', () => {
    toClear()
    updateDisplay()
});

del.addEventListener('click', () => {
    toDelete()
    updateDisplay()
});

window.addEventListener('keydown', handleKeyboardInput);

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
};

function updateDisplay() {
    currentOperandTextElement.textContent = currentOperand;
    if(operator != null) {
        lastOperandTextElement.textContent = `${lastOperand} ${operator}`;
    } else {
        lastOperandTextElement.textContent = "";
    };
    
};

function chooseOperation(operation) {
    if (currentOperand === "") return;
    if (lastOperand !== "") {
        toCalculate();
    }
    operator = operation;
    lastOperand = currentOperand;
    currentOperand = "";
};

function toCalculate() {
    let result;
    const last = parseFloat(lastOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(last) || isNaN(current)) return;
    //to add handle further input
    if (current == "0") {
        alert("You can't divide by 0!");
        return;
    } 
    switch(operator) {
        case "/":  
            result = last / current;
            break;
        case "*":
            result = last * current;
            break;
        case "-":
            result = last - current;
            break;
        case "+":
            result = last + current;
            break;
        default: return;            
    }
    currentOperand = Math.round(result * 100000) / 100000;
    operator = undefined;
    lastOperand = "";
};

function toClear() {
    currentOperand = "";
    lastOperand = "";
    operator = "";
};

function toDelete() {
    currentOperand = currentOperand
    .toString()
    .slice(0, -1)
};

function handleKeyboardInput(e) {
    if ((e.key >= 0 && e.key <=9) || e.key === '.') {
        appendNumber(e.key);
        updateDisplay();
    }
    if (e.key === '/' || e.key === "*" || e.key === "-" || e.key === "+") {
        chooseOperation(e.key);
        updateDisplay();
    }
    if (e.key === '=' || e.key === 'Enter') {
        toCalculate();
        updateDisplay();
    }
    if (e.key === 'Escape') {
        toClear()
        updateDisplay()
    }
    if (e.key === 'Backspace') {
        toDelete()
        updateDisplay()
    }
}

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


function oldToCalculate () {
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

