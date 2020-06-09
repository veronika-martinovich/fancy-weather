import { getRandomNumber } from "./getRandomNumber";

describe("getRandomNumber", () => {
  it("should return number", () => {
    const number = getRandomNumber(5, 10);
    expect(number).toBeGreaterThan(4);
    expect(number).toBeLessThan(11);
  })
});
