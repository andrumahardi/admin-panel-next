import { Button, HStack } from "@chakra-ui/react";

type Props = {
	onDelete: () => void;
	links: {
		view: string;
		edit: string;
	};
};

export function RowBtnGroup({ onDelete, links }: Props) {
	return (
		<HStack spacing={1}>
			<Button
				as='a'
				href={links.edit}
				variant='solid'
				colorScheme='teal'
				size='xs'
			>
				Edit
			</Button>
			<Button variant='solid' colorScheme='red' size='xs' onClick={onDelete}>
				Delete
			</Button>
		</HStack>
	);
}
