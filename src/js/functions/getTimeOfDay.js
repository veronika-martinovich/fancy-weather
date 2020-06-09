export function getTimeOfDay(date) {
  if (typeof date !== "string") return "";
  const hours = new Date(date).getHours();
  if (hours === 24 || (hours >= 1 && hours <= 4)) return "Night";
  if (hours >= 5 && hours <= 11) return "Morning";
  if (hours >= 12 && hours <= 16) return "Daytime";
  if (hours >= 17 && hours <= 23) return "Evening";
}
