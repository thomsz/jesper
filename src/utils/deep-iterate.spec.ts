import deepIterate from "@/utils/deep-iterate";

describe("deepIterate", () => {
  it("should iterate over all keys and values in a flat object", () => {
    const mockCallback = jest.fn();
    const object = { a: 1, b: 2 };

    deepIterate(object, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith("a", 1, "a");
    expect(mockCallback).toHaveBeenCalledWith("b", 2, "b");
  });

  it("should iterate deeply into nested objects", () => {
    const mockCallback = jest.fn();
    const object = { a: { b: { c: 3 } } };

    deepIterate(object, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenCalledWith("a", { b: { c: 3 } }, "a");
    expect(mockCallback).toHaveBeenCalledWith("b", { c: 3 }, "a.b");
    expect(mockCallback).toHaveBeenCalledWith("c", 3, "a.b.c");
  });

  it("should iterate over arrays", () => {
    const mockCallback = jest.fn();
    const object = { arr: [1, 2, 3] };

    deepIterate(object, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenCalledWith("arr", [1, 2, 3], "arr");
    expect(mockCallback).toHaveBeenCalledWith("0", 1, "arr.0");
    expect(mockCallback).toHaveBeenCalledWith("1", 2, "arr.1");
    expect(mockCallback).toHaveBeenCalledWith("2", 3, "arr.2");
  });

  it("should handle empty objects", () => {
    const mockCallback = jest.fn();
    const object = {};

    deepIterate(object, mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should handle empty arrays", () => {
    const mockCallback = jest.fn();
    const object: [] = [];

    deepIterate(object, mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should not iterate over non-object values", () => {
    const mockCallback = jest.fn();

    deepIterate(null, mockCallback);
    deepIterate(42, mockCallback);
    deepIterate("string", mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it("should build the correct path for nested objects", () => {
    const paths: string[] = [];
    const object = { a: { b: { c: 3 } }, d: 4 };

    deepIterate(object, (_, __, path: string) => {
      paths.push(path);
    });

    expect(paths).toEqual(["a", "a.b", "a.b.c", "d"]);
  });
});
