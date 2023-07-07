import { createQueryString, generatePageNums } from "@/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

const buttonSize = "xs";
const buttonColorScheme = "blue";

type Props = {
	totalPage: number;
	currentPage: number;
	rootUrl: string;
};

export function PaginationButtonGroup({
	totalPage,
	currentPage,
	rootUrl,
}: Props) {
	const searchParams = useSearchParams();

	return (
		<HStack>
			<ArrowButtons
				href={`${rootUrl}${createQueryString(
					searchParams?.toString() || "",
					"page",
					`${currentPage - 1 > 1 ? currentPage - 1 : ""}`
				)}`}
				isDisabled={currentPage === 1}
			>
				<ChevronLeftIcon boxSize='20px' />
			</ArrowButtons>
			{generatePageNums(totalPage, currentPage).map((num, i) => (
				<React.Fragment key={i + 1}>
					{num === 0 ? (
						<Button
							{...(currentPage === num
								? { colorScheme: buttonColorScheme }
								: {})}
							size={buttonSize}
						>
							...
						</Button>
					) : (
						<Button
							as={Link}
							href={`${rootUrl}${createQueryString(
								searchParams?.toString() || "",
								"page",
								`${num > 1 ? num : ""}`
							)}`}
							{...(currentPage === num
								? { colorScheme: buttonColorScheme }
								: {})}
							size={buttonSize}
						>
							{num}
						</Button>
					)}
				</React.Fragment>
			))}
			<ArrowButtons
				href={`${rootUrl}${createQueryString(
					searchParams?.toString() || "",
					"page",
					`${currentPage + 1}`
				)}`}
				isDisabled={currentPage === totalPage}
			>
				<ChevronRightIcon boxSize='20px' />
			</ArrowButtons>
		</HStack>
	);
}

type ArrowButtonProps = {
	href: string;
	isDisabled: boolean;
	children: ReactNode;
};

function ArrowButtons({ href, isDisabled, children }: ArrowButtonProps) {
	return (
		<IconButton
			{...(isDisabled ? {} : { as: Link, href })}
			isDisabled={isDisabled}
			colorScheme={buttonColorScheme}
			size={buttonSize}
			aria-label='arrow-pagination-button'
		>
			{children}
		</IconButton>
	);
}
