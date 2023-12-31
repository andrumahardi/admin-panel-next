import { HStack, Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export type PaginationSizeOptionsProps = {
	perPage: number;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export function PaginationSizeOptions({
	perPage,
	onChange,
}: PaginationSizeOptionsProps) {
	return (
		<HStack>
			<Text>Showing</Text>
			<Select size='xs' value={perPage} onChange={onChange}>
				<option value=''>10</option>
				<option value='25'>25</option>
				<option value='50'>50</option>
				<option value='100'>100</option>
			</Select>
			<Text>entries</Text>
		</HStack>
	);
}
