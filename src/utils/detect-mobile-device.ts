export function detectMobileDevice(userAgent: string) {
	return {
		isMobile: /(mobile|android|iphone)/gi.test(userAgent),
	};
}
