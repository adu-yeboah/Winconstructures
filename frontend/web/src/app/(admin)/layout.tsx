import type { Metadata } from 'next';
import '../../styles/globals.css';


export const metadata: Metadata = {
    title: 'Wisconstructures Admin',
    description: 'Admin dashboard for Wisconstructures',
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