export function isWithin7Days(isoDate) {
	if (!isoDate) return false;
	const ms = Date.now() - new Date(isoDate).getTime();
	return ms <= 7 * 24 * 60 * 60 * 1000;
}
