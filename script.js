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
equal.addEventListener('click', () => populateScreen("="));
// doesnt work 
clearAll.addEventListener('click', clear);
// doenst work because populate screen is not called
del.addEventListener('click', () => displayOutput.pop[length-1]);

function populateScreen(input) { 
    if(displayOutput.length === 12) {
        return;
    }  
    displayOutput.push(input);
    display.textContent = displayOutput.join('');
}

function clear() {
    displayOutput.length = 0;
    display.textContent = "0";
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('mouseover', (e) => e.target.classList.add('over')));
buttons.forEach(button => button.addEventListener('mouseout', (e) => e.target.classList.remove('over')));
buttons.forEach(button => button.addEventListener('mousedown', (e) => e.target.classList.add('down')));
buttons.forEach(button => button.addEventListener('mouseup', (e) => e.target.classList.remove('down')));


function operate (a, b, operator) {
    if (operator === "/") {
        return a / b;
    } else if (operator === "*") {
        return a * b;
    } else if (operator === "-") {
        return a - b;
    } else if (operator === "+") {
        return a + b;
    }
}