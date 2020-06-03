import { getCityDate } from "./getCityDate";

describe("getCityDate", () => {
  it("should return date", () => {
    const date = getCityDate(5.5);
    expect(date).toBeInstanceOf(Date);
  })
});
