const path = require("path");
const { execFileSync } = require("child_process");
const {
  OPERATION_MAP,
  parseNumber,
  calculate,
  modulo,
  power,
  squareRoot,
} = require("../calculator");

describe("calculator core functions", () => {
  describe("operation mapping", () => {
    test("maps addition aliases", () => {
      expect(OPERATION_MAP["+"]).toBe("add");
      expect(OPERATION_MAP.add).toBe("add");
    });

    test("maps subtraction aliases", () => {
      expect(OPERATION_MAP["-"]).toBe("subtract");
      expect(OPERATION_MAP.subtract).toBe("subtract");
    });

    test("maps multiplication aliases", () => {
      expect(OPERATION_MAP["*"]).toBe("multiply");
      expect(OPERATION_MAP.x).toBe("multiply");
      expect(OPERATION_MAP.multiply).toBe("multiply");
    });

    test("maps division aliases", () => {
      expect(OPERATION_MAP["/"]).toBe("divide");
      expect(OPERATION_MAP["÷"]).toBe("divide");
      expect(OPERATION_MAP.divide).toBe("divide");
    });

    test("maps modulo aliases", () => {
      expect(OPERATION_MAP["%"]).toBe("modulo");
      expect(OPERATION_MAP.mod).toBe("modulo");
      expect(OPERATION_MAP.modulo).toBe("modulo");
    });

    test("maps power aliases", () => {
      expect(OPERATION_MAP["^"]).toBe("power");
      expect(OPERATION_MAP["**"]).toBe("power");
      expect(OPERATION_MAP.pow).toBe("power");
      expect(OPERATION_MAP.power).toBe("power");
    });

    test("maps square root aliases", () => {
      expect(OPERATION_MAP.sqrt).toBe("squareRoot");
      expect(OPERATION_MAP.squareroot).toBe("squareRoot");
    });
  });

  describe("parseNumber", () => {
    test("parses valid numeric inputs", () => {
      expect(parseNumber("42", "number1")).toBe(42);
      expect(parseNumber("3.5", "number2")).toBe(3.5);
      expect(parseNumber("-7", "number1")).toBe(-7);
    });

    test("throws for invalid input", () => {
      expect(() => parseNumber("abc", "number1")).toThrow(
        "number1 must be a valid number. Received: abc"
      );
    });
  });

  describe("calculate", () => {
    test("adds numbers", () => {
      expect(calculate("add", 2, 3)).toBe(5);
    });

    test("subtracts numbers", () => {
      expect(calculate("subtract", 10, 4)).toBe(6);
    });

    test("multiplies numbers", () => {
      expect(calculate("multiply", 45, 2)).toBe(90);
    });

    test("divides numbers", () => {
      expect(calculate("divide", 20, 5)).toBe(4);
    });

    test("throws on division by zero", () => {
      expect(() => calculate("divide", 5, 0)).toThrow("Cannot divide by zero.");
    });

    test("throws for unsupported operations", () => {
      expect(() => calculate("unknown", 2, 3)).toThrow(
        "Unsupported operation: unknown"
      );
    });
  });

  describe("modulo", () => {
    test("returns the remainder of division", () => {
      expect(modulo(10, 3)).toBe(1);
      expect(modulo(20, 5)).toBe(0);
    });

    test("throws on modulo by zero", () => {
      expect(() => modulo(10, 0)).toThrow("Cannot modulo by zero.");
    });
  });

  describe("power", () => {
    test("raises base to exponent", () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 0)).toBe(1);
    });
  });

  describe("squareRoot", () => {
    test("returns square root for non-negative numbers", () => {
      expect(squareRoot(9)).toBe(3);
      expect(squareRoot(0)).toBe(0);
    });

    test("throws for negative numbers", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Cannot take square root of a negative number."
      );
    });
  });

  describe("calculate with new operations", () => {
    test("calculates modulo", () => {
      expect(calculate("modulo", 10, 3)).toBe(1);
    });

    test("calculates power", () => {
      expect(calculate("power", 2, 4)).toBe(16);
    });

    test("calculates square root", () => {
      expect(calculate("squareRoot", 16)).toBe(4);
    });

    test("throws for unsupported operations", () => {
      expect(() => calculate("unknown", 2, 3)).toThrow(
        "Unsupported operation: unknown"
      );
    });
  });
});

describe("calculator CLI examples from image", () => {
  const calculatorPath = path.resolve(__dirname, "../calculator.js");

  function run(operation, left, right) {
    const args = [calculatorPath, operation, String(left)];
    if (right !== undefined) {
      args.push(String(right));
    }

    return execFileSync("node", args, {
      encoding: "utf8",
    }).trim();
  }

  test("2 + 3 = 5", () => {
    expect(run("+", 2, 3)).toBe("5");
  });

  test("10 - 4 = 6", () => {
    expect(run("-", 10, 4)).toBe("6");
  });

  test("45 * 2 = 90", () => {
    expect(run("*", 45, 2)).toBe("90");
  });

  test("20 / 5 = 4", () => {
    expect(run("/", 20, 5)).toBe("4");
  });

  test("20 % 6 = 2", () => {
    expect(run("%", 20, 6)).toBe("2");
  });

  test("2 ^ 5 = 32", () => {
    expect(run("^", 2, 5)).toBe("32");
  });

  test("sqrt 49 = 7", () => {
    expect(run("sqrt", 49)).toBe("7");
  });
});

describe("calculator CLI extended operations from image", () => {
  const calculatorPath = path.resolve(__dirname, "../calculator.js");

  function run(operation, left, right) {
    const args = [calculatorPath, operation, String(left)];
    if (right !== undefined) {
      args.push(String(right));
    }

    return execFileSync("node", args, {
      encoding: "utf8",
    }).trim();
  }

  test("modulo with 5 % 2 = 1", () => {
    expect(run("%", 5, 2)).toBe("1");
  });

  test("power with 2 ^ 3 = 8", () => {
    expect(run("^", 2, 3)).toBe("8");
  });

  test("square root with √16 = 4", () => {
    expect(run("sqrt", 16)).toBe("4");
  });
});
