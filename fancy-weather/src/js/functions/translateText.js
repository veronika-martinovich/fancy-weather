import { translateYandexApiKey } from "../API/APIs";

export async function translateText(text, langPrev, langCurr) {
  const response = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateYandexApiKey}&text=${text}&lang=${langPrev}-${langCurr}`
  );
  const translatedText = await response.json();
  return translatedText;
}
