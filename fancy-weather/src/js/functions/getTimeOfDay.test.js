import { getTimeOfDay } from "./getTimeOfDay";

describe("getTimeOfDay", () => {
  it("should return string", () => {
    const timeOfDay = getTimeOfDay("2020-05-31 15:00:00");
    expect(timeOfDay).toBeDefined();
    expect(timeOfDay).toBeTruthy();
  }),
  it("should return empty string", () => {
    const timeOfDay = getTimeOfDay(undefined);
    expect(timeOfDay).toBeDefined();
    expect(timeOfDay).toBe("");
  });
});
