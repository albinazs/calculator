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
shouldResetScreen = false;

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
    clearDisplay()
});

del.addEventListener('click', () => {
    toDelete()
    updateDisplay()
});

window.addEventListener('keydown', handleKeyboardInput);

function appendNumber(number) {
    if(shouldResetScreen) resetScreen()
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
};

function updateDisplay() {
    if(lastOperand === "" && currentOperand === "" ) {
        currentOperandTextElement.textContent = "0";
        return;
    }
    currentOperandTextElement.textContent = currentOperand;
    if(operator != null) {
        lastOperandTextElement.textContent = `${lastOperand} ${operator}`;
    } else {
        lastOperandTextElement.textContent = "";
    };
};

function clearDisplay() {
    currentOperandTextElement.textContent = "0";
    lastOperandTextElement.textContent = "";
};

function chooseOperation(operation) {
    if(lastOperand === "" && currentOperand === "") return;
    if(lastOperand !== "" && currentOperand === "") {
        operator = operation;
        return;
    }
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

    switch(operator) {
        case "/":  
            if (current == "0") {
                alert("You can't divide by 0!");
                toClear();
                clearDisplay();
                return;
            } 
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
    shouldResetScreen = true;
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

function resetScreen() {
    currentOperand = "";
    shouldResetScreen = false;
}

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




