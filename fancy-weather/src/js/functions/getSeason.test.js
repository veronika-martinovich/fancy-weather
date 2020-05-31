import { getSeason } from "./getSeason";

describe("getSeason", () => {
  it("should return string", () => {
    const season = getSeason("2020-05-31 00:00:00");
    expect(season).toBeDefined();
    expect(season).toBeTruthy();
  }),
  it("should return empty string", () => {
    const season = getSeason(undefined);
    expect(season).toBeDefined();
    expect(season).toBe("");
  });
});
