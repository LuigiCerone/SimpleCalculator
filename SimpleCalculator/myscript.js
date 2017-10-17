"use strict";

var calculatorDisplay, historyDisplay = null;
var a, b, c, operator = null;
var operatorClicked = false;

// Add a listener to DOM load.
document.addEventListener("DOMContentLoaded", function () {
    console.log("JS loaded");

    calculatorDisplay = document.getElementById('value');
    historyDisplay = document.getElementById('history');
    // From nodelist to an array.
    var divs = [].slice.call(document.getElementsByTagName('div'), 0);
    divs.forEach(function (div) {
        // console.log(div);
        if (div.id === '') {
            div.addEventListener('click', function (div) {
                onKeyClick(this.innerHTML);
            });
        }
    });

    document.getElementById('sign').addEventListener('click', function () {
        changeSign();
    })

    document.getElementById('close').addEventListener('click', function () {
        document.getElementById('historyContainer').outerHTML = '';
    });
});

document.addEventListener('keypress', function (event) {
    // console.log(event);
    onKeyPress(event.keyCode);
});


function onKeyClick(value) {
    let operators = ['+', '-', '*', '%', '/'];
    if (isNumber(value))
        onNumberClick(value);
    else if (value === '.')
        onCommaClick();
    else if (operators.indexOf(value) !== -1)
        onOperatorClick(value);
    else if (value === 'AC') {
        resetAll();
    }
    else if (value === '=') {
        calculateResult();
    }
    else
        console.log("error" + value);
}

function onKeyPress(value) {
    if (value == '127') {
        resetAll();
    } else if (value == '13') {
        b = parseFloat(calculatorDisplay.innerHTML);
        calculateResult();
    } else if (value == '46')
        onCommaClick();
    else {
        onKeyClick(String.fromCharCode(value));
    }
}

function resetAll() {
    a = b = c = null;
    calculatorDisplay.innerHTML = 0;
    while (historyDisplay.firstChild) {
        historyDisplay.removeChild(historyDisplay.firstChild);
    }
}

function onNumberClick(value) {
    if (operatorClicked) {
        calculatorDisplay.innerHTML = value;
        operatorClicked = false;
    } else {
        if (calculatorDisplay.innerHTML.length <= 10) {
            if (calculatorDisplay.innerHTML === '0')
                calculatorDisplay.innerHTML = '';
            calculatorDisplay.innerHTML += value;
        }
    }
}

function onCommaClick() {
    if (calculatorDisplay.innerHTML.indexOf('.') === -1)
        calculatorDisplay.innerHTML += '.';
}

function onOperatorClick(value) {
    operatorClicked = true;
    if (a != null)
        calculateResult();
    a = parseFloat(calculatorDisplay.innerHTML);
    calculatorDisplay.innerHTML = 0;
    operator = value;
}

function calculateResult() {
    b = parseFloat(calculatorDisplay.innerHTML);
    if (a == null || b == null) return;
    switch (operator) {
        case '+':
            c = a + b;
            break;
        case '-':
            c = a - b;
            break;
        case '*':
            c = a * b;
            break;
        case '/':
            c = a / b;
            break;
        case '%':
            c = a % b;
            break;
        default:
            console.log("error");
    }

    if (Math.round(c) !== c) {
        c = c.toFixed(2);
    }
    calculatorDisplay.innerHTML = c;
    createHistory(a + ' ' + operator + ' ' + b + ' = ' + c);
    a = b = c = operator = null;
    operatorClicked = true;
}

function changeSign() {
    let x = (calculatorDisplay.innerHTML * -1)
    createHistory(calculatorDisplay.innerHTML + ' * -1 = ' + x);
    calculatorDisplay.innerHTML *= -1;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createHistory(text) {
    var div = document.createElement('div');
    var historyEntry = document.createTextNode(text);
    div.appendChild(historyEntry);
    historyDisplay.appendChild(div);
}