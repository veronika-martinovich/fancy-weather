export function getSeason(date) {
 const month = new Date(date).getMonth();
 if (month === 11 || month <= 1) return 'Winter';
 if (month >= 2 && month <= 4) return 'Spring';
 if (month >= 5 && month <= 7) return 'Summer';
 if (month >= 8 && month <= 10) return 'Autumn';
}