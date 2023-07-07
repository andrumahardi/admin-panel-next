import { useState } from "react";

const tableData = [
	{
		id: 1,
		title: "profile_password_edit",
	},
	{
		id: 2,
		title: "journal_account_access",
	},
	{
		id: 3,
		title: "journal_account_delete",
	},
	{
		id: 4,
		title: "journal_account_show",
	},
	{
		id: 5,
		title: "journal_account_edit",
	},
];

export function useTableActions() {
	const [data, setData] = useState<Array<Record<string, any>>>(tableData);

	function toggleSelectRow(id: number) {
		setData(
			data.map((el) => {
				if (el.id === id) {
					return {
						...el,
						checked: !el.checked,
					};
				}
				return el;
			})
		);
	}

	function selectAll() {
		setData(
			data.map((el) => ({
				...el,
				checked: true,
			}))
		);
	}

	function deselectAll() {
		setData(
			data.map((el) => ({
				...el,
				checked: false,
			}))
		);
	}

	function deleteSelected() {
		const selectedData = data.filter((el) => el.checked);
		if (!selectedData.length) return;
	}

	function handleDeleteRow(id: number) {
		return id;
	}

	return {
		data,
		selectAll,
		deselectAll,
		toggleSelectRow,
		deleteSelected,
		handleDeleteRow,
	};
}
