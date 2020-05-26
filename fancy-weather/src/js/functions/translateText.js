import { translateYandexApiKey } from "../API/APIs";

export async function translateText(text, lang) {
  const response = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateYandexApiKey}&text=${text}&lang=${lang}`
  );
  const translatedText = await response.json();
  return translatedText;
}
