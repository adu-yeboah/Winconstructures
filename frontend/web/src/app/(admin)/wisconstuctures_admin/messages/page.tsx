'use client';
import React, { useState } from 'react';
import { messages } from '@/constants/messages';
import { Message } from '@/types/messages';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Eye, X } from 'lucide-react';
import Head from '../../components/ui/head';

const MessagesPage: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const columns: TableColumn<Message>[] = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            cell: row => <span className="font-medium">{row.title}</span>,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <button
                    onClick={() => setSelectedMessage(row)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    title="View message"
                >
                    <Eye className="w-4 h-4" />
                    View
                </button>
            ),
            button: true,
        },
    ];

    const customStyles = {
        table: {
            style: {
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f3f4f6',
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'uppercase' as const,
                color: '#374151',
            },
        },
        rows: {
            style: {
                fontSize: '0.875rem',
                color: '#1f2937',
                '&:hover': {
                    backgroundColor: '#f9fafb',
                },
            },
        },
        cells: {
            style: {
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #e5e7eb',
            },
        },
    };

    return (
        <>
            <Head head='Messages' />
            <div className="w-full mx-auto px-4 py-10">
                <div className="bg-white rounded-lg shadow">
                    <DataTable
                        columns={columns}
                        data={messages}
                        customStyles={customStyles}
                        highlightOnHover
                        pointerOnHover
                        responsive
                        noDataComponent={<div className="p-4 text-gray-500">No messages found.</div>} />
                </div>

                {selectedMessage && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-100">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                    title="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <p>
                                    <strong className="text-gray-700">Title:</strong> {selectedMessage.title}
                                </p>
                                <p>
                                    <strong className="text-gray-700">Email:</strong> {selectedMessage.email}
                                </p>
                                <p>
                                    <strong className="text-gray-700">Subject:</strong> {selectedMessage.subject}
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="px-4 py-2 bg-tertiary text-white rounded hover:bg-tertiary-dark transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div></>
    );
};

export default MessagesPage;