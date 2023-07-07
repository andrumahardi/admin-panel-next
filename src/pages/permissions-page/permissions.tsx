"use client";

import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { usePagination, useTableActions } from "@/hooks";
import React from "react";
import { arrayObjectToCSV } from "@/utils";
import {
	PaginationButtonGroup,
	PaginationSizeOptions,
} from "@/components/pagination";
import { DynamicTable } from "@/components/table";
import { URLS } from "@/constants";

export function Permissions() {
	const {
		data,
		selectAll,
		deselectAll,
		toggleSelectRow,
		deleteSelected,
		handleDeleteRow,
	} = useTableActions();

	const {
		query: { page, perPage },
		setPerPage,
	} = usePagination({ targetUrl: URLS.PERMISSIONS });

	return (
		<Box bgColor='#ffffff' borderRadius='10px'>
			<Box p={4} borderBottom='1px solid' borderColor='#eaeaea'>
				<Text>Permission List</Text>
			</Box>
			<VStack p={4} alignItems='flex-start' spacing={4}>
				<HStack w='full' justifyContent='space-between'>
					<PaginationSizeOptions perPage={perPage} onChange={setPerPage} />
					<HStack spacing={2}>
						<Button size='xs' colorScheme='blue' onClick={selectAll}>
							Select all
						</Button>
						<Button
							size='xs'
							colorScheme='blue'
							isDisabled={data.every((el) => !el.checked)}
							onClick={deselectAll}
						>
							Deselect all
						</Button>
						<Button size='xs' onClick={() => arrayObjectToCSV(data)}>
							CSV
						</Button>
						<Button size='xs' colorScheme='red' onClick={deleteSelected}>
							Delete selected
						</Button>
					</HStack>
					<HStack justifyContent='space-between'>
						<HStack>
							<Text>Search: </Text>
							<Input />
						</HStack>
					</HStack>
				</HStack>
				<Box w='full'>
					<DynamicTable
						data={data}
						headColumns={[
							{
								key: "id",
								name: "ID",
							},
							{
								key: "title",
								name: "Title",
							},
						]}
						toggleSelectRow={toggleSelectRow}
						handleDeleteRow={handleDeleteRow}
					/>
				</Box>
				<HStack w='full' justifyContent='space-between'>
					<HStack w='full' justifyContent='space-between'>
						<Text>
							Page {page} of {1} from {data.length} entries
						</Text>
						<PaginationButtonGroup
							rootUrl={URLS.PERMISSIONS}
							currentPage={page}
							totalPage={1}
						/>
					</HStack>
				</HStack>
			</VStack>
		</Box>
	);
}
