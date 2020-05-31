import {translateText} from "./translateText";

describe("translateText", () => {
  it("should return translated text", async () => {
    const data = await translateText('beautiful', 'en', 'ru');
    expect(data.text[0]).toBe('красивые');
  });
});
