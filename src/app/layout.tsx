import React from "react";
import { AppProviders } from "./_providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
