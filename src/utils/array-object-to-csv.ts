export function arrayObjectToCSV(data: Array<Record<string, any>>) {
	let csvString = `${Object.keys(data[0]).join(",")}\n`;

	data.forEach((el) => {
		const output = [];
		for (const key in el) {
			output.push(el[key]);
		}
		return (csvString += `${output.join(",")}\n`);
	});

	const blob = new Blob([csvString], { type: "text/csv;charset=utf-8," });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.setAttribute("href", url);
	link.setAttribute("download", "ERP.csv");
	link.click();
}
