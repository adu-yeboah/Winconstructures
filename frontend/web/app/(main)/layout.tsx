import type { Metadata } from 'next';
import "../../styles/globals.css"

export const metadata: Metadata = {
    title: 'Wisconstructures',
    description: 'dsrg',
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}