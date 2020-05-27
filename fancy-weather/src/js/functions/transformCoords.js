export function transformCoords(coord) {
  const coordShort = coord.toFixed(2);
  const coordArr = coordShort.split(".");
  coordArr[0] = `${coordArr[0]}°`;
  coordArr[1] = `${coordArr[1]}'`;
  return coordArr.join("");
}
