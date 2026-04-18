#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, ÷, divide)
 */

const OPERATION_MAP = {
  "+": "add",
  add: "add",
  "-": "subtract",
  subtract: "subtract",
  "*": "multiply",
  x: "multiply",
  multiply: "multiply",
  "/": "divide",
  "÷": "divide",
  divide: "divide",
};

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <number1> <number2>");
  console.log("Operations: add(+), subtract(-), multiply(* or x), divide(/ or ÷)");
}

function parseNumber(value, label) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    throw new Error(`${label} must be a valid number. Received: ${value}`);
  }

  return numeric;
}

function calculate(operation, left, right) {
  switch (operation) {
    case "add":
      return left + right;
    case "subtract":
      return left - right;
    case "multiply":
      return left * right;
    case "divide":
      if (right === 0) {
        throw new Error("Cannot divide by zero.");
      }
      return left / right;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function main() {
  const [, , operationInput, leftInput, rightInput] = process.argv;

  if (!operationInput || leftInput === undefined || rightInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const normalizedOperation = OPERATION_MAP[operationInput.toLowerCase()];
  if (!normalizedOperation) {
    console.error(`Invalid operation: ${operationInput}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const left = parseNumber(leftInput, "number1");
    const right = parseNumber(rightInput, "number2");
    const result = calculate(normalizedOperation, left, right);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  OPERATION_MAP,
  parseNumber,
  calculate,
  main,
};
