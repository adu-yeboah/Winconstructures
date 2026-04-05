import type { Metadata } from 'next';
import '../../styles/globals-shadcn.css';


export const metadata: Metadata = {
    title: 'Wisconstructures Admin',
    description: 'Admin dashboard for Wisconstructures',
};

type AdminLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <>{children}</>;
}