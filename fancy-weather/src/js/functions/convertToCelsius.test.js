import { convertToCelsius } from "./convertToCelsius";

describe("convertToCelsius", () => {
  it("should return number", () => {
    const celsiusDegrees = convertToCelsius(286.52);
    expect(celsiusDegrees).toBeDefined();
  })
});
