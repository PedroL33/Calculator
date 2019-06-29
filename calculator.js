const equationDisplay = document.getElementById('equationDisplay');
const display = document.getElementById('display');
var memory = [];
var holdDigit = false;
var holdOper = false;
display.innerText = '0';

const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(element => {
    element.addEventListener('click', updateDisplay);
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(element => {
    element.addEventListener('click', updateOperator);
})

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', clear);

const clearButton = document.querySelector('#Clear');
clearButton.addEventListener('click', clear);

const backspace = document.querySelector('#back');
backspace.addEventListener('click', remove);

const plusminus = document.querySelector('#negate');
plusminus.addEventListener('click', negate)



function negate(e) {
    if(display.innerText != '0') {
        (display.innerText.charAt(0) == '-') ? display.innerText = display.innerText.slice(1) : display.innerText = '-' + display.innerText;
    }
}

function remove(e) {
    if(!holdOper) {
        (display.innerText.length==1) ? display.innerText = '0' : display.innerText = display.innerText.substring(0,display.innerText.length-1)
    }
}

function clear(e) {
    (e.target.innerText == '=') ? updateMemory(e.target.innerText) : display.innerText = "0";
    memory = []; 
    holdOper = false;
    holdDigit = false;
    equationDisplay.innerText = '';
}

function updateDisplay(e) {
    (!holdDigit) ? display.innerText = e.target.innerText: display.innerText += e.target.innerText;
    holdDigit = true;
    holdOper = false;
}

function updateOperator(e) {
    updateMemory(e.target.innerText);
    holdDigit = false;
    holdOper = true;
}

function updateMemory(operator) {
    if(holdOper) {
        var displayText = equationDisplay.innerText;
        var currentOper = displayText[displayText.length -1];
        var isParen = equationDisplay.innerText[equationDisplay.innerText.length -2] == ')';
        if(memory.length>1 && equationDisplay.innerText.length > 3) {
            if((operator == '*' || operator =='÷') && (currentOper == '-' || currentOper == '+') && !isParen && memory.length < 3) {
                displayText = '(' + displayText.substring(0, displayText.length-1) + ')' + operator;
            }
        }
        displayText = displayText.substring(0, displayText.length - 1)
        displayText += operator;
        equationDisplay.innerText = displayText;
        memory.splice(memory.length -1, 1, operator)
    }
    else {
        memory.push(Number(display.innerText))
        equationDisplay.innerText += display.innerText;
        if(memory.length == 1) {
            display.innerText = memory[0]; 
        }
        else if(operator == '+' || operator == '-' || operator == '=') {
            if(memory.length > 3) {
                var a = memory.splice(memory.length - 3, 3);
                memory.push(operate(a[0],a[2],a[1]));
            }
            var a = memory.splice(0, 3)
            memory.unshift(operate(a[0], a[2], a[1]));
            display.innerText = memory[0]; 
        }
        else {
            if(memory[memory.length-2] == '*' || memory[memory.length-2] == '÷') {
                var a = memory.splice(memory.length-3, 3)
                memory.push(operate(a[0], a[2], a[1]));
                display.innerText = memory[memory.length-1];
            }   
        }
        memory.push(operator);
        equationDisplay.innerText += memory[memory.length -1];
    }
}

function operate(a, b, operator) {
    if(operator == "*") {
        return a*b;
    }
    if(operator == "÷") {
        return a/b;
    }
    if(operator == "+") {
        return a+b;
    }
    if(operator == "-") {
        return a-b;
    }
}
