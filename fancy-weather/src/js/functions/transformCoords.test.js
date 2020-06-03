import { transformCoords } from "./transformCoords";

describe("transformCoords", () => {
  it("should return string of precise format", () => {
    const coord = transformCoords(53.8833);
    expect(coord).toMatch(/(-)*(\d)+°(\d)+'/);
    expect(typeof coord).toBe("string");
  });
});
