import type { Metadata } from 'next';
import "../../styles/globals.css"
import Footer from './_components/ui/footer';
import Navbar from './_components/navbar';

export const metadata: Metadata = {
    title: 'Wisconstructurs',
    description: 'dsrg',
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}