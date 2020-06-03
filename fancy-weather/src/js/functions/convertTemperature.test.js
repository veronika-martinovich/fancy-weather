import { convertTemperature } from "./convertTemperature";

describe("convertTemperature", () => {
  it("should return number", () => {
    const celsiusDegrees = convertTemperature(286.52);
    expect(celsiusDegrees).toBeDefined();
  })
});
