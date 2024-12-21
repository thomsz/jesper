/**
 * Type definition for the callback function used in `deepIterate`.
 *
 * @callback DeepIteratorCallback
 * @param {string} key - The current key being iterated.
 * @param {unknown} value - The value associated with the current key.
 * @param {string} path - The full path to the current key.
 */

type DeepIteratorCallback = (key: string, value: unknown, path: string) => void;

/**
 * Recursively iterates over the properties of an object or array and invokes a callback function for each key-value pair.
 *
 * @function deepIterate
 * @param {unknown} object - The object or array to iterate over.
 * @param {DeepIteratorCallback} callback - The callback function invoked for each key-value pair.
 * @param {string} [path=""] - The current path of the key in the object hierarchy.
 * @returns {void}
 *
 * @example
 * const obj = {
 *   a: 1,
 *   b: { c: 2, d: [3, 4] },
 * };
 *
 * deepIterate(obj, (key, value, path) => {
 *   console.log(`Key: ${key}, Value: ${value}, Path: ${path}`);
 * });
 *
 * // Output:
 * // Key: a, Value: 1, Path: a
 * // Key: c, Value: 2, Path: b.c
 * // Key: 0, Value: 3, Path: b.d.0
 * // Key: 1, Value: 4, Path: b.d.1
 */
export default function deepIterate(
  object: unknown,
  callback: DeepIteratorCallback,
  path: string = ""
): void {
  if (object === null || typeof object !== "object") {
    return;
  }

  for (const [key, value] of Object.entries(object)) {
    const currentPath = path ? `${path}.${key}` : key;
    callback(key, value, currentPath);

    if (value?.constructor === Object || Array.isArray(value)) {
      deepIterate(value, callback, currentPath);
    }
  }
}
