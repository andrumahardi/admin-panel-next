import { GenericObject } from "@/types";
import { useEffect, useState } from "react";

type Props = {
	data: GenericObject[];
};

export function useTableActions({ data }: Props) {
	const [contents, setContents] = useState<Props["data"]>([]);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	useEffect(() => {
		if (data.length) {
			setContents(data);
		}
	}, [data]);

	function toggleSelectRow(id: number) {
		setContents(
			contents.map((el) => {
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
		setContents(
			contents.map((el) => ({
				...el,
				checked: true,
			}))
		);
	}

	function deselectAll() {
		setContents(
			contents.map((el) => ({
				...el,
				checked: false,
			}))
		);
	}

	function deleteSelected() {
		const selectedData = contents.filter((el) => el.checked);
		if (!selectedData.length) return;
	}

	return {
		contents,
		selectedId,
		setSelectedId,
		selectAll,
		deselectAll,
		toggleSelectRow,
		deleteSelected,
	};
}
