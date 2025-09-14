function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
function percent(a) {
  return a / 100;
}

function calculate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      throw new Error("Invalid operator");
  }
}

function updateDisplay(result) {
  const display = document.getElementById("display");
  display.textContent = result;
}

// Calculator state
let currentInput = "";
let operator = "";
let firstOperand = null;
let waitingForOperand = false;
let justCalculated = false;

window.appendToDisplay = function (value) {
  if (["+", "-", "*", "/"].includes(value)) {
    if (justCalculated) {
      // Fix: After calculation, pressing operator should use result as firstOperand
      firstOperand = parseFloat(currentInput);
      operator = value;
      waitingForOperand = true;
      justCalculated = false;
      return;
    }
    if (currentInput !== "") {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator && !waitingForOperand) {
        firstOperand = calculate(
          operator,
          firstOperand,
          parseFloat(currentInput)
        );
        updateDisplay(firstOperand);
      }
      operator = value;
      waitingForOperand = true;
      justCalculated = false;
    } else if (firstOperand !== null) {
      operator = value;
      waitingForOperand = true;
      justCalculated = false;
    }
  } else if (value === "%") {
    if (currentInput !== "") {
      currentInput = percent(parseFloat(currentInput)).toString();
      updateDisplay(currentInput);
    }
  } else if (value === ".") {
    if (!currentInput.includes(".")) {
      if (currentInput === "") {
        currentInput = "0.";
      } else {
        currentInput += ".";
      }
      updateDisplay(currentInput);
    }
  } else {
    if (waitingForOperand || justCalculated) {
      currentInput = "";
      waitingForOperand = false;
      justCalculated = false;
    }
    // Prevent multiple leading zeros
    if (currentInput === "0") {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  }
};

window.clearDisplay = function () {
  currentInput = "";
  operator = "";
  firstOperand = null;
  waitingForOperand = false;
  justCalculated = false;
  updateDisplay("0");
};

window.calculateResult = function () {
  if (firstOperand !== null && operator && currentInput !== "") {
    try {
      const result = calculate(
        operator,
        firstOperand,
        parseFloat(currentInput)
      );
      updateDisplay(result);
      currentInput = result.toString();
      operator = "";
      firstOperand = null;
      waitingForOperand = false;
      justCalculated = true;
    } catch (e) {
      updateDisplay("Error");
      currentInput = "";
      operator = "";
      firstOperand = null;
      waitingForOperand = false;
      justCalculated = false;
    }
  }
};

// Initialize display on page load
updateDisplay("0");
