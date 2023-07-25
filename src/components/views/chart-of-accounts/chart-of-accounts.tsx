"use client";

import {
	Box,
	Button,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useErrorHandler, usePagination, useTableActions } from "@/hooks";
import React from "react";
import {
	ImportButtons,
	PaginationButtonGroup,
	PaginationSizeOptions,
	TableLoader,
} from "@/components";
import { DynamicTable } from "@/components";
import { URLS } from "@/constants";
import {
	useDeleteChartOfAccount,
	useExportChartOfAccounts,
	useGetChartOfAccounts,
} from "./queries";
import { GenericObject } from "@/types";

const rootUrl = URLS.CHART_OF_ACCOUNTS;

export function ChartOfAccounts() {
	const {
		query: { page, pageSize },
		setPageSize,
	} = usePagination({ targetUrl: rootUrl });

	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		data,
		isLoading,
		error: getError,
		refetch,
	} = useGetChartOfAccounts({
		page,
		pageSize,
		populate: ["category_account", "type_account"],
	});
	const {
		data: exportData,
		error: exportError,
		isLoading: isFetchExportData,
	} = useExportChartOfAccounts();
	const {
		mutate: deleteFn,
		isLoading: isDeleting,
		error: deleteError,
	} = useDeleteChartOfAccount();
	useErrorHandler({ error: getError || deleteError || exportError });

	const { pagination } = data?.meta || { pagination: {} };
	const {
		contents,
		selectedId,
		toggleSelectRow,
		deleteSelected,
		selectAll,
		deselectAll,
		setSelectedId,
	} = useTableActions({ data: data?.data || [] });

	function handleDelete(id: number) {
		setSelectedId(id);
		onOpen();
	}

	function cancelDelete() {
		setSelectedId(null);
		onClose();
	}

	function onDelete() {
		deleteFn(
			{ id: `${selectedId}` },
			{
				onSuccess: () => {
					refetch();
					setSelectedId(null);
					onClose();
				},
			}
		);
	}

	if (isLoading) {
		return <TableLoader />;
	}

	return (
		<>
			<Box bgColor='#ffffff' borderRadius='10px'>
				<HStack
					p={4}
					borderBottom='1px solid'
					borderColor='#eaeaea'
					justifyContent='space-between'
				>
					<Text>Chart of Account List</Text>
					<Button
						as='a'
						href={URLS.CHART_OF_ACCOUNTS_CREATE}
						variant='outline'
						colorScheme='blue'
					>
						Add Chart of Account
					</Button>
				</HStack>
				{contents.length ? (
					<VStack p={4} alignItems='flex-start' spacing={4}>
						<HStack w='full' justifyContent='space-between'>
							<PaginationSizeOptions
								pageSize={pageSize}
								onChange={setPageSize}
							/>
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
								<Button size='xs' colorScheme='red' onClick={deleteSelected}>
									Delete selected
								</Button>
								<ImportButtons
									isLoading={isFetchExportData}
									blobUrls={{
										csv: exportData?.data.csv || "",
										excel: exportData?.data.excel || "",
									}}
									title='categories'
								/>
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
								data={contents as unknown as GenericObject[]}
								headColumns={[
									{
										key: "id",
										name: "ID",
									},
									{
										key: "categoryAccount",
										name: "Account",
									},
									{
										key: "typeAccount",
										name: "Type",
									},
									{
										key: "name",
										name: "Name",
									},
									{
										key: "code",
										name: "Code",
									},
								]}
								toggleSelectRow={toggleSelectRow}
								handleDelete={handleDelete}
								rootUrl={rootUrl}
							/>
						</Box>
						<HStack w='full' justifyContent='space-between'>
							<HStack w='full' justifyContent='space-between'>
								<Text>
									Page {page} of {pagination?.pageCount || 1} from{" "}
									{contents.length} entries
								</Text>
								<PaginationButtonGroup
									rootUrl={rootUrl}
									currentPage={page}
									totalPage={+(pagination?.pageCount || 1)}
								/>
							</HStack>
						</HStack>
					</VStack>
				) : (
					<VStack p={4}>
						<Text>This table is empty ;(</Text>
					</VStack>
				)}
			</Box>

			<Modal isOpen={isOpen} onClose={cancelDelete}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody>
						<VStack spacing={4} p='4'>
							<Text textAlign='center'>
								Are you sure you want to delete this content?
							</Text>
							<HStack justifyContent='center'>
								<Button variant='ghost' mr={3} onClick={cancelDelete}>
									Close
								</Button>
								<Button
									colorScheme='red'
									onClick={onDelete}
									isLoading={isDeleting}
								>
									Delete
								</Button>
							</HStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
