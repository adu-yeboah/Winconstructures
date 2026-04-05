import type { Metadata } from 'next';
import '../../styles/globals-shadcn.css';
import { Poppins } from 'next/font/google';


export const metadata: Metadata = {
    title: 'Wisconstructures Admin',
    description: 'Admin dashboard for Wisconstructures',
};

type RootLayoutProps = {
    children: React.ReactNode;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className={poppins.variable}>
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    );
}