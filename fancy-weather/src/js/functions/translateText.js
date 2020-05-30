import { translateYandexApiKey } from "../api/apiKeys";

export async function translateText(text, langFrom, langTo) {
  const  response = await fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateYandexApiKey}&text=${text}&lang=${langFrom}-${langTo}`
    );
  const translatedText = await response.json();
  return translatedText;
}
