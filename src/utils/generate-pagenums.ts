export function generatePageNums(totalPage: number, currentPage: number) {
	const arrNums = Array.from(Array(totalPage)).map((_, i) => i + 1) || [];
	if (totalPage > 10) {
		if (currentPage < 5) {
			return [1, ...arrNums.slice(1, 5), 0, totalPage];
		}
		if (currentPage >= 5 && currentPage < totalPage - 3) {
			return [
				1,
				0,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				0,
				totalPage,
			];
		}
		if (currentPage >= totalPage - 5) {
			return [1, 0, ...arrNums.reverse().slice(1, 5).reverse(), totalPage];
		}
	}
	return arrNums;
}
