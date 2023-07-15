"use client";

import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { usePagination, useTableActions } from "@/hooks";
import React from "react";
import { arrayObjectToCSV } from "@/utils";
import { PaginationButtonGroup, PaginationSizeOptions } from "@/components";
import { DynamicTable } from "@/components";
import { URLS } from "@/constants";

export function Roles() {
	const { contents, selectAll, deselectAll, toggleSelectRow, deleteSelected } =
		useTableActions({ data: [] });

	const {
		query: { page, pageSize },
		setPageSize,
	} = usePagination({ targetUrl: URLS.ROLES });

	function handleDelete(id: number) {
		return id;
	}

	return (
		<Box bgColor='#ffffff' borderRadius='10px'>
			<Box p={4} borderBottom='1px solid' borderColor='#eaeaea'>
				<Text>Role List</Text>
			</Box>
			<VStack p={4} alignItems='flex-start' spacing={4}>
				<HStack w='full' justifyContent='space-between'>
					<PaginationSizeOptions pageSize={pageSize} onChange={setPageSize} />
					<HStack spacing={2}>
						<Button size='xs' colorScheme='blue' onClick={selectAll}>
							Select all
						</Button>
						<Button
							size='xs'
							colorScheme='blue'
							isDisabled={contents.every((el) => !el.checked)}
							onClick={deselectAll}
						>
							Deselect all
						</Button>
						<Button size='xs' onClick={() => arrayObjectToCSV(contents)}>
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
						data={[]}
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
						handleDelete={handleDelete}
						rootUrl={URLS.ROLES}
					/>
				</Box>
				<HStack w='full' justifyContent='space-between'>
					<HStack w='full' justifyContent='space-between'>
						<Text>
							Page {page} of {1} from {contents.length} entries
						</Text>
						<PaginationButtonGroup
							rootUrl={URLS.ROLES}
							currentPage={page}
							totalPage={11}
						/>
					</HStack>
				</HStack>
			</VStack>
		</Box>
	);
}
