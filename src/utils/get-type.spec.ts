import getType, {
  isInfinity,
  isNaNValue,
  isPromise,
  isObject,
  isRegExp,
  isSymbol,
  isArray,
  isError,
  isDate,
  isNull,
  isSet,
  isMap,
} from "@/utils/get-type";

describe("getType", () => {
  const cases: [unknown, string][] = [
    [NaN, "nan"],
    [42, "number"],
    [null, "null"],
    [/abc/, "regexp"],
    [new Map(), "map"],
    [new Set(), "set"],
    ["hello", "string"],
    [{ a: 1 }, "object"],
    [new Date(), "date"],
    [[1, 2, 3], "array"],
    [() => {}, "function"],
    [Infinity, "infinity"],
    [undefined, "undefined"],
    [Symbol("sym"), "symbol"],
    [new Error("Error"), "error"],
    [Promise.resolve(), "promise"],
  ];

  cases.forEach(([value, expected]) => {
    it(`should identify type: ${expected}`, () => {
      expect(getType(value)).toBe(expected);
    });
  });
});

const cases: [(value: unknown) => boolean, unknown, string][] = [
  [isNull, null, "Null"],
  [isArray, [], "Array"],
  [isObject, {}, "Object"],
  [isNaNValue, NaN, "NaN"],
  [isMap, new Map(), "Map"],
  [isSet, new Set(), "Set"],
  [isRegExp, /abc/, "RegExp"],
  [isDate, new Date(), "Date"],
  [isError, new Error(), "Error"],
  [isInfinity, Infinity, "Infinity"],
  [isSymbol, Symbol("test"), "Symbol"],
  [isPromise, Promise.resolve(), "Promise"],
];

cases.forEach(([fn, value, type]) => {
  describe(fn.name, () => {
    it(`should return true for ${type}`, () => {
      expect(fn(value)).toBe(true);
    });

    cases.forEach(([otherFn, otherValue, otherType]) => {
      if (fn !== otherFn) {
        it(`should return false for non-${type} value: ${otherType}`, () => {
          expect(fn(otherValue)).toBe(false);
        });
      }
    });
  });
});
