import { checkZeros } from "./checkZeros";

describe("checkZeros", () => {
  it("should return string with first zero character", () => {
    const value = checkZeros(5);
    expect(value).toMatch(/0\d/);
  }),
  it("should return string without first zero character", () => {
    const value = checkZeros(51);
    expect(value).toMatch(/(\d)+/);
  })
});
