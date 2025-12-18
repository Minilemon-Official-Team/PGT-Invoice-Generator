import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="id">
            <body className="bg-page-bg font-sans">{children}</body>
        </html>
    );
}
