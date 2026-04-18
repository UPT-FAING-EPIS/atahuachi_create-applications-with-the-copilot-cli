#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, ÷, divide)
 * - modulo (%, mod, modulo)
 * - exponentiation (^, **, pow, power)
 * - square root (sqrt, squareRoot)
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
  "%": "modulo",
  mod: "modulo",
  modulo: "modulo",
  "^": "power",
  "**": "power",
  pow: "power",
  power: "power",
  sqrt: "squareRoot",
  squareroot: "squareRoot",
};

function printUsage() {
  console.log("Usage:");
  console.log("  node src/calculator.js <operation> <number1> <number2>");
  console.log("  node src/calculator.js sqrt <number>");
  console.log(
    "Operations: add(+), subtract(-), multiply(* or x), divide(/ or ÷), modulo(%), power(^ or **), squareRoot(sqrt)"
  );
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
    case "modulo":
      return modulo(left, right);
    case "power":
      return power(left, right);
    case "squareRoot":
      return squareRoot(left);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Cannot modulo by zero.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot take square root of a negative number.");
  }

  return Math.sqrt(n);
}

function main() {
  const [, , operationInput, leftInput, rightInput] = process.argv;

  if (!operationInput || leftInput === undefined) {
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
    const isUnaryOperation = normalizedOperation === "squareRoot";
    let right;

    if (!isUnaryOperation) {
      if (rightInput === undefined) {
        printUsage();
        process.exitCode = 1;
        return;
      }

      right = parseNumber(rightInput, "number2");
    }

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
  modulo,
  power,
  squareRoot,
  main,
};
