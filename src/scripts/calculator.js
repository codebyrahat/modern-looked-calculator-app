let expression = "";

function updateDisplay(value) {
  const display = document.getElementById("display");
  display.textContent = value;
}

window.appendToDisplay = function (value) {
  // Prevent multiple operators in a row
  const operators = ["+", "-", "*", "/", "%"];
  if (
    operators.includes(value) &&
    (expression === "" || operators.includes(expression.slice(-1)))
  ) {
    return;
  }
  expression += value;
  updateDisplay(expression);
};

window.clearDisplay = function () {
  expression = "";
  updateDisplay("0");
};

window.calculateResult = function () {
  try {
    // Replace '×' and '÷' with '*' and '/' if used
    let evalExpr = expression.replace(/×/g, "*").replace(/÷/g, "/");
    // Evaluate the expression
    let result = Function('"use strict";return (' + evalExpr + ")")();
    updateDisplay(result);
    expression = result.toString();
  } catch {
    updateDisplay("Error");
    expression = "";
  }
};

// Initialize display
updateDisplay("0");
