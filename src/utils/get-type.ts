type TypeName =
  | "undefined"
  | "function"
  | "infinity"
  | "promise"
  | "symbol"
  | "string"
  | "error"
  | "number"
  | "regexp"
  | "object"
  | "array"
  | "date"
  | "null"
  | "set"
  | "nan"
  | "map";

/**
 * Checks if the value is an instance of Map.
 * @param value - The value to check.
 * @returns True if the value is a Map, otherwise false.
 */
export function isMap(value: unknown): boolean {
  return value instanceof Map;
}

/**
 * Checks if the value is an instance of Set.
 * @param value - The value to check.
 * @returns True if the value is a Set, otherwise false.
 */
export function isSet(value: unknown): boolean {
  return value instanceof Set;
}

/**
 * Checks if the value is an instance of Date.
 * @param value - The value to check.
 * @returns True if the value is a Date, otherwise false.
 */
export function isDate(value: unknown): boolean {
  return value instanceof Date;
}

/**
 * Checks if the value is null.
 * @param value - The value to check.
 * @returns True if the value is null, otherwise false.
 */
export function isNull(value: unknown): boolean {
  return value === null;
}

/**
 * Checks if the value is an instance of Error.
 * @param value - The value to check.
 * @returns True if the value is an Error, otherwise false.
 */
export function isError(value: unknown): boolean {
  return value instanceof Error;
}

/**
 * Checks if the value is an Array.
 * @param value - The value to check.
 * @returns True if the value is an Array, otherwise false.
 */
export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

/**
 * Checks if the value is a Symbol.
 * @param value - The value to check.
 * @returns True if the value is a Symbol, otherwise false.
 */
export function isSymbol(value: unknown): boolean {
  return typeof value === "symbol";
}

/**
 * Checks if the value is a RegExp.
 * @param value - The value to check.
 * @returns True if the value is a RegExp, otherwise false.
 */
export function isRegExp(value: unknown): boolean {
  return value instanceof RegExp;
}

/**
 * Checks if the value is a Promise.
 * @param value - The value to check.
 * @returns True if the value is a Promise, otherwise false.
 */
export function isPromise(value: unknown): boolean {
  return value instanceof Promise;
}

/**
 * Checks if the value is NaN.
 * @param value - The value to check.
 * @returns True if the value is NaN, otherwise false.
 */
export function isNaNValue(value: unknown): boolean {
  return typeof value === "number" && isNaN(value);
}

/**
 * Checks if the value is Infinity or -Infinity.
 * @param value - The value to check.
 * @returns True if the value is Infinity or -Infinity, otherwise false.
 */
export function isInfinity(value: unknown): boolean {
  return value === Infinity || value === -Infinity;
}

/**
 * Checks if the value is an object but not Date, RegExp, Map, Set, or Array.
 * @param value - The value to check.
 * @returns True if the value is a plain object, otherwise false.
 */
export function isObject(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    !isMap(value) &&
    !isSet(value) &&
    !isDate(value) &&
    !isArray(value) &&
    !isError(value) &&
    !isRegExp(value) &&
    !isPromise(value) &&
    !isNaNValue(value)
  );
}

/**
 * Get the precise type of a value.
 *
 * @param value - The value to determine the type of.
 * @returns A string representing the value's type.
 */
export function getType(value: unknown): TypeName {
  switch (true) {
    case isNull(value):
      return "null";
    case isSymbol(value):
      return "symbol";
    case isNaNValue(value):
      return "nan";
    case isInfinity(value):
      return "infinity";
    case isArray(value):
      return "array";
    case isDate(value):
      return "date";
    case isRegExp(value):
      return "regexp";
    case isMap(value):
      return "map";
    case isSet(value):
      return "set";
    case isError(value):
      return "error";
    case isPromise(value):
      return "promise";
    case isObject(value):
      return "object";
    default:
      return getPrimitiveType(value);
  }
}

/**
 * Get the type of primitive values.
 *
 * @param value - The value to determine the primitive type of.
 * @returns A string representing the primitive type.
 */
export function getPrimitiveType(value: unknown): TypeName {
  return typeof value as TypeName;
}

export default getType;
