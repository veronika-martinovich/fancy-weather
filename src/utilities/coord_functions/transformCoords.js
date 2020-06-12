export function transformCoords(coord) {
  const coordDegrees = parseInt(coord);
  const coordMinutes = Math.abs(Math.round((coord - coordDegrees) * 60));
  return `${coordDegrees}°${coordMinutes}'`
}
