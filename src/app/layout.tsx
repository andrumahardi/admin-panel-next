import React from "react";
import { AppProviders } from "./_providers";
import { headers } from "next/headers";
import { detectMobileDevice } from "@/utils";
import { NoMobile } from "@/components";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const nextHeaders = headers();
	const ua = nextHeaders.get("user-agent") || "";
	const { isMobile } = detectMobileDevice(ua);

	return (
		<html lang='en'>
			<body>
				<AppProviders>{isMobile ? <NoMobile /> : children}</AppProviders>
			</body>
		</html>
	);
}
