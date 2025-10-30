export function startOfWeekUTC(d = new Date()): Date {
	const dt = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
	const day = dt.getUTCDay(); // 0=Sun..6=Sat
	const diffToMon = (day + 6) % 7; // Mon-based week
	dt.setUTCDate(dt.getUTCDate() - diffToMon);
	dt.setUTCHours(0, 0, 0, 0);
	return dt;
}
export function daysAgoUTC(days: number): Date {
	const dt = new Date();
	dt.setUTCDate(dt.getUTCDate() - days);
	return dt;
}
