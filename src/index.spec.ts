import { sum } from "./index";

describe("sum", () => {
  it("should sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});