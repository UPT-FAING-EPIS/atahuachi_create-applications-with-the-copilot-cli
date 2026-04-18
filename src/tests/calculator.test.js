const path = require("path");
const { execFileSync } = require("child_process");
const { OPERATION_MAP, parseNumber, calculate } = require("../calculator");

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
      expect(() => calculate("power", 2, 3)).toThrow(
        "Unsupported operation: power"
      );
    });
  });
});

describe("calculator CLI examples from image", () => {
  const calculatorPath = path.resolve(__dirname, "../calculator.js");

  function run(operation, left, right) {
    return execFileSync("node", [calculatorPath, operation, String(left), String(right)], {
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
});
