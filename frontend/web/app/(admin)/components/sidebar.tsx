import React from 'react';
import Link from 'next/link';
import { Home, Building, PlusCircle, MessageSquare, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
    return (
        <div className="w-40 fixed h-screen bg-white text-white flex flex-col px-2 py-4">

            <div className="relative mx-auto flex justify-center mb-4">
                <Image
                    src="/logo.png"
                    alt="Wiscon Structures Logo"
                    width={100}
                    height={52}
                    className="h-8 mb-3"
                    priority
                />
            </div>

            <nav className="flex-1">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href=""
                            className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-primary text-secondary hover:text-grey1 transition"
                        >
                            <Home className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="properties"
                            className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-primary text-secondary hover:text-grey1 transition"
                        >
                            <Building className="w-5 h-5" />
                            <span>Properties</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="add"
                            className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-primary text-secondary hover:text-grey1 transition"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Add</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="messages"
                            className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-primary text-secondary hover:text-grey1 transition"
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span>Messages</span>
                        </Link>
                    </li>

                    <li>
                        <button
                            className="flex items-center w-full space-x-2 py-2 px-3 rounded-lg hover:bg-primary text-tertiary transition"
                        >
                            <LogOut  className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

