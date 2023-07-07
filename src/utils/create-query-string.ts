export function createQueryString(
	searchParams: string,
	name: string,
	value: string
) {
	const params = new URLSearchParams(searchParams);
	params.set(name, value);

	const filteredParams: string[] = [];
	params.forEach((val, key) => {
		if (val) filteredParams.push(`${key}=${val}`);
	});

	if (filteredParams.length) {
		return `?${filteredParams.join("&")}`;
	}
	return "";
}
