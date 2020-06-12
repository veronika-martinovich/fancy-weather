export function getForecastPitch(
  lang,
  city,
  country,
  degrees,
  weatherDescription,
  wind,
  humidity
) {
  const pitch = {
    en: `Weather forecast for location — ${city}, ${country}. Currently the temperature is ${degrees} degrees, ${weatherDescription}, wind — ${wind} meters per second, humidity — ${humidity} %.`,
    ru: `Прогноз погоды для местоположения - ${city}, ${country}. В настоящее время температура — ${degrees} градусов, ${weatherDescription}, ветер — ${wind} метров в секунду, влажность — ${humidity}%.`,
    be: `Прагноз надвор'я для месцазнаходжання — ${city}, ${country}. У цяперашні час тэмпература — ${degrees} градусаў, ${weatherDescription}, вецер — ${wind} метраў за сякунду, вільготнасць — ${humidity}%.`
  };
  console.log(pitch[lang]);
  return pitch[lang];
}
