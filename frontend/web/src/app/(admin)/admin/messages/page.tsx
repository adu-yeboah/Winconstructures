'use client';
import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Eye, Trash2, Search, Mail, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useMessages } from '@/hooks/useMessage';
import { Message } from '@/types/messages';
import { Skeleton } from '@/components/ui/skeleton';

const MessagesPage: React.FC = () => {
  const { messages, loading, error, fetchMessages, deleteMessage, markAsRead, updateStatus } = useMessages();
  const [selected, setSelected] = useState<Message | null>(null);
  const [tab, setTab] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  const filtered = messages.filter((m) => {
    const matchTab = tab === 'all' || (tab === 'unread' ? !m.read : m.read);
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id);
      } catch (error) {
        console.error("Failed to delete message:", error);
        alert("Failed to delete message");
      }
    }
  };

  const handleViewMessage = async (message: Message) => {
    setSelected(message);

    // Mark as read if unread
    if (!message.read) {
      try {
        await markAsRead(message.id);
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'NEW_LEAD': 'bg-blue-50 text-blue-700 border-blue-200',
      'CONTACTED': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'CLOSED': 'bg-green-50 text-green-700 border-green-200',
    };

    const icons: Record<string, React.ReactNode> = {
      'NEW_LEAD': <Clock className="w-3 h-3" />,
      'CONTACTED': <Mail className="w-3 h-3" />,
      'CLOSED': <CheckCircle className="w-3 h-3" />,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        {icons[status]}
        {status.replace('_', ' ')}
      </span>
    );
  };

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
        <div className="flex flex-col gap-1">
          <span className={`text-[13px] ${!row.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
            {row.subject}
          </span>
          {row.relatedProperty && (
            <span className="text-[11px] text-tertiary">
              Property: {row.relatedProperty.title}
            </span>
          )}
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => getStatusBadge(row.status),
      width: '120px',
    },
    {
      name: 'Date',
      selector: (row) => row.date ?? '',
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="text-[12px] text-tertiary whitespace-nowrap">
            {new Date(row.date).toLocaleDateString()}
          </span>
          <span className="text-[10px] text-tertiary">
            {new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
      width: '100px',
    },
    {
      name: '',
      cell: (row) => (
        <div className="flex items-center gap-1.5 transition-opacity">
          <button
            onClick={() => handleViewMessage(row)}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-primary bg-primary transition-all"
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

  if (!mounted || loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
          <button
            onClick={() => fetchMessages()}
            className="ml-4 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-4 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Inbox</span>
          </div>
          <h1 className="font-serif text-[24px] font-semibold text-gray-900">Messages</h1>
          <p className="text-[12px] text-tertiary mt-0.5">
            {messages.filter(m => !m.read).length} unread messages
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-0">
          <Search className="w-3.5 h-3.5 text-tertiary shrink-0" />
          <input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent text-[13px] py-2 outline-none w-44 "
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
            onRowClicked={(row) => handleViewMessage(row)}
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
              <div className="flex-1">
                <p className="text-[14px] font-medium text-gray-900">{selected.subject}</p>
                <p className="text-[11px] text-tertiary mt-0.5">{new Date(selected.date).toLocaleString()}</p>
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
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
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
              <div>
                {getStatusBadge(selected.status)}
              </div>
            </div>

            {/* Related Property */}
            {selected.relatedProperty && (
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-[11px] text-tertiary mb-1">Related Property</p>
                <a
                  href={`/properties/${selected.relatedPropertyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-primary hover:underline"
                >
                  {selected.relatedProperty.title}
                </a>
                <p className="text-[11px] text-tertiary mt-0.5">{selected.relatedProperty.location}</p>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5">
              <div className="bg-gray-50 rounded-xl p-4 text-[13px] text-gray-700 leading-relaxed">
                {selected.message || 'No message content.'}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-2">
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value as any)}
                  className="text-[12px] border border-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="NEW_LEAD">New Lead</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="flex gap-2">
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
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
