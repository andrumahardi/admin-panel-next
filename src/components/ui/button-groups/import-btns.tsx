import { Box, Button, Skeleton } from "@chakra-ui/react";

type Props = {
	blobUrls: {
		csv: string;
		excel: string;
	};
	isLoading: boolean;
	title: string;
};

export function ImportButtons({ blobUrls, title, isLoading }: Props) {
	if (isLoading) return <ImportButtonSkeletons />;
	if (!Object.values(blobUrls).every((e) => e)) {
		return null;
	}
	return (
		<>
			<Button size='xs' as='a' href={blobUrls.csv} download={`${title}.csv`}>
				CSV
			</Button>
			<Button size='xs' as='a' href={blobUrls.excel} download={`${title}.xlsx`}>
				Excel
			</Button>
		</>
	);
}

function ImportButtonSkeletons() {
	return (
		<>
			{Array.from(Array(2)).map((_, i) => (
				<Box key={i + 1}>
					<Skeleton w='41px' h='24px' borderRadius='5px' />
				</Box>
			))}
		</>
	);
}
