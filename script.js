const display = document.querySelector('.display');
const btn1 = document.querySelector('#one');
const btn2 = document.querySelector('#two');
const btn3 = document.querySelector('#three');
const btn4 = document.querySelector('#four');
const btn5 = document.querySelector('#five');
const btn6 = document.querySelector('#six');
const btn7 = document.querySelector('#seven');
const btn8 = document.querySelector('#eight');
const btn9 = document.querySelector('#nine');
const btn0 = document.querySelector('#zero');
const dot = document.querySelector('#dot');
const clearAll = document.querySelector('#clearAll');
const del = document.querySelector('#delete');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const substract = document.querySelector('#substract');
const add = document.querySelector('#add');
const equal = document.querySelector('#equal');

display.textContent = "0";
const displayOutput = [];
const n1 = [];
const n2 = [];
let operator = "";
const operators = ["/", "*", "-", "+"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

btn1.addEventListener('click', () => populateScreen("1"));
btn2.addEventListener('click', () => populateScreen("2"));
btn3.addEventListener('click', () => populateScreen("3"));
btn4.addEventListener('click', () => populateScreen("4"));
btn5.addEventListener('click', () => populateScreen("5"));
btn6.addEventListener('click', () => populateScreen("6"));
btn7.addEventListener('click', () => populateScreen("7"));
btn8.addEventListener('click', () => populateScreen("8"));
btn9.addEventListener('click', () => populateScreen("9"));
btn0.addEventListener('click', () => populateScreen("0"));
dot.addEventListener('click', () => populateScreen("."));
divide.addEventListener('click', () => populateScreen("/"));
multiply.addEventListener('click', () => populateScreen("*"));
substract.addEventListener('click', () => populateScreen("-"));
add.addEventListener('click', () => populateScreen("+"));
equal.addEventListener('click', toCalculate);
clearAll.addEventListener('click', clearScreen);
del.addEventListener('click', deleteLast);

function populateScreen(input) { 
    let lastInput = displayOutput[displayOutput.length - 1];

    if (displayOutput.length === 12) {
        return;
    } 

    if (operators.includes(lastInput) && operators.includes(input)) {
        displayOutput.pop(lastInput);
    }

    //if(input === "." && displayOutput.find(item => item ===".")) {
        //return;
    //}

    displayOutput.push(input);
    display.textContent = displayOutput.join('');
    updateInputVars(input);
}

function updateInputVars(input) {
    if (operators.includes(input)) {
        operator = input;
        console.log(operator);
    }
    else if (numbers.includes(input) && (!operators.some(operator => displayOutput.includes(operator)))) 
    {
        n1.push(input);
        console.log(n1);
    } else if (numbers.includes(input) && (operators.some(operator => displayOutput.includes(operator)))) {
        n2.push(input);
        console.log(n2);
    }
}

function clearScreen() {
    displayOutput.length = 0;
    n1.length = 0;
    n2.length = 0;
    display.textContent = "0";
}

//works only once!!!
function deleteLast() {
    let toDelete = displayOutput[displayOutput.length - 1];
    displayOutput.pop(toDelete);
    //display.textContent = displayOutput.join('');
    populateScreen();
}

function toCalculate () {
    populateScreen("=");

    let a = n1.join('');
    let b = n2.join('');
    let result = 0;

    if (operator === "/") {
        result = a / b;
    } else if (operator === "*") {
        result = a * b;
    } else if (operator === "-") {
        result = a - b;
    } else if (operator === "+") {
        result = a + b;
    }

    populateScreen(result);

}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('mouseover', (e) => e.target.classList.add('over')));
buttons.forEach(button => button.addEventListener('mouseout', (e) => e.target.classList.remove('over')));
buttons.forEach(button => button.addEventListener('mousedown', (e) => e.target.classList.add('down')));
buttons.forEach(button => button.addEventListener('mouseup', (e) => e.target.classList.remove('down')));
