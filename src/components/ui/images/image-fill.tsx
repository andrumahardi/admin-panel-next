import { Box, BoxProps } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";

type Props = {
	wrapperProps?: BoxProps;
} & ImageProps;

export function ImageFill({
	wrapperProps,
	src,
	alt,
	style,
	sizes,
	...imageProps
}: Props) {
	return (
		<Box {...wrapperProps} position='relative' overflow='hidden'>
			<Image
				{...imageProps}
				src={src}
				alt={alt}
				sizes={sizes || "min-width: 50px"}
				fill
				style={{
					...style,
					objectFit: style?.objectFit || "cover",
					objectPosition: style?.objectPosition || "center",
				}}
			/>
		</Box>
	);
}
