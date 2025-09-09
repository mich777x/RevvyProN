"use client";

import * as React from "react";

type Props = { children: React.ReactNode };

/**
 * Global client-side providers.
 * Add ThemeProvider/QueryClient/Toaster/etc here when ready.
 */
export default function Providers({ children }: Props) {
	return <>{children}</>;
}
