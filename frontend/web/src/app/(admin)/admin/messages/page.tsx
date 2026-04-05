'use client';
import React, { useState } from 'react';
import { messages } from '@/constants/messages';
import { Message } from '@/types/messages';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Eye, Trash2, Search, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MessagesPage: React.FC = () => {
  const [selected, setSelected] = useState<Message | null>(null);
  const [tab, setTab] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Message[]>(messages);

  const filtered = data.filter((m) => {
    const matchTab = tab === 'all' || (tab === 'unread' ? !m.read : m.read);
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleDelete = (id: number) => setData((prev) => prev.filter((m) => m.id !== id));

  const columns: TableColumn<Message>[] = [
    {
      name: 'Sender',
      selector: (row) => row.title,
      sortable: true,
      grow: 1,
      cell: (row: Message) => (
        <div className="flex items-center gap-2.5 py-1">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="font-serif text-[12px] font-semibold text-secondary">
              {row.title.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className={`text-[13px] ${!row.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
              {!row.read && <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mr-1.5 mb-0.5" />}
              {row.title}
            </p>
            <p className="text-[11px] text-tertiary">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      name: 'Subject',
      selector: (row) => row.subject,
      sortable: true,
      cell: (row) => (
        <span className={`text-[13px] ${!row.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
          {row.subject}
        </span>
      ),
    },
    {
      name: 'Preview',
      cell: (row) => (
        <span className="text-[12px] text-tertiary truncate max-w-[200px] block">
          {row.message}
        </span>
      ),
      grow: 2,
    },
    {
      name: 'Date',
      selector: (row) => row.date ?? '',
      sortable: true,
      cell: (row) => <span className="text-[12px] text-tertiary whitespace-nowrap">{row.date}</span>,
      width: '90px',
    },
    {
      name: '',
      cell: (row) => (
        <div className="flex items-center gap-1.5  transition-opacity">
          <button
            onClick={() => setSelected(row)}
            className="w-7 h-7 rounded-md border border-gray-200  flex items-center justify-center hover:border-primary bg-primary transition-all"
            title="View"
          >
            <Eye className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-7 h-7 rounded-md border border-gray-200 bg-white flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      ),
      width: '90px',
      button: true,
    },
  ];

  const customStyles = {
    headRow: { style: { backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', minHeight: '42px' } },
    headCells: { style: { fontSize: '10px', fontWeight: '500', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#6b7280', paddingLeft: '14px' } },
    rows: { style: { minHeight: '60px', borderBottom: '1px solid #f9fafb', cursor: 'pointer' }, highlightOnHoverStyle: { backgroundColor: '#fafafa' } },
    cells: { style: { paddingLeft: '14px' } },
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-4 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Inbox</span>
          </div>
          <h1 className="font-serif text-[24px] font-semibold text-gray-900">Messages</h1>
          <p className="text-[12px] text-tertiary mt-0.5">
            {data.filter(m => !m.read).length} unread messages
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-0">
          <Search className="w-3.5 h-3.5 text-tertiary shrink-0" />
          <input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent text-[13px] py-2 outline-none w-44 font-[DM_Sans]"
          />
        </div>
      </div>

      <Card className="rounded-xl border border-gray-100 shadow-none overflow-hidden">
        {/* Tabs & count */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['all', 'unread', 'read'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all capitalize ${
                  tab === t ? 'bg-primary text-white shadow-sm' : 'text-tertiary hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-tertiary">
            <span className="font-medium text-gray-900">{filtered.length}</span> messages
          </p>
        </div>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filtered}
            highlightOnHover
            pointerOnHover
            responsive
            customStyles={customStyles}
            onRowClicked={(row) => setSelected(row)}
            noDataComponent={
              <div className="py-12 text-center text-[13px] text-tertiary">No messages found.</div>
            }
          />
        </CardContent>
      </Card>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl w-[480px] max-w-[92vw] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal head */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-gray-900">{selected.subject}</p>
                <p className="text-[11px] text-tertiary mt-0.5">{selected.date}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-3.5 h-3.5 stroke-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Sender row */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="font-serif text-[13px] font-semibold text-secondary">
                  {selected.title.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-900">{selected.title}</p>
                <p className="text-[12px] text-tertiary">{selected.email}</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <div className="bg-gray-50 rounded-xl p-4 text-[13px] text-gray-700 leading-relaxed">
                {selected.message ?? 'No message content.'}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              
               <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-[13px] hover:bg-primary-dark transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;