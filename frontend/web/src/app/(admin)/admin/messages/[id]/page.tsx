'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Archive, Trash2, Send, Paperclip, Home } from 'lucide-react';
import { useMessages } from '@/hooks/useMessage';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function MessageDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { fetchMessage, deleteMessage, updateMessage } = useMessages();
  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState<string[]>([]);

  useEffect(() => {
    const loadMessage = async () => {
      if (id) {
        try {
          const messageId = Array.isArray(id) ? id[0] : id;
          const data = await fetchMessage(messageId);
          setMessage(data);
        } catch (error) {
          console.error('Failed to load message:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadMessage();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-5">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (!message) return <p className="p-8 text-[13px] text-tertiary">Message not found.</p>;

  const initials = message.title.split(' ').map((n: string) => n[0]).join('');

  const handleSend = () => {
    if (!reply.trim()) return;
    setReplies(r => [...r, reply]);
    setReply('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[12px] text-tertiary hover:text-gray-800 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Messages
          </button>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-4 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Inbox</span>
          </div>
          <h1 className="font-serif text-[22px] font-semibold text-gray-900 leading-tight">{message.subject}</h1>
          <p className="text-[12px] text-tertiary mt-0.5">
            Conversation with {message.title} · {message.date}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-200 text-[13px] h-8 gap-1.5">
            <Archive className="w-3.5 h-3.5" /> Archive
          </Button>
          <Button variant="outline" size="sm" className="border-red-200 bg-red-50 hover:bg-red-100 text-red-500 text-[13px] h-8 gap-1.5">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5">
        {/* Thread */}
        <div className="space-y-4">
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 flex-row items-center justify-between space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Conversation</p>
              <span className="text-[11px] text-tertiary">{1 + replies.length} messages</span>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              {/* Original message */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center shrink-0">
                    <span className="font-serif text-[12px] font-semibold text-primary-dark">{initials}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">{message.title}</p>
                    <p className="text-[11px] text-tertiary">{message.date}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl rounded-tl-sm p-4 text-[13px] text-gray-700 leading-relaxed border border-gray-100">
                  {message.message ?? 'No message content available.'}
                </div>
              </div>

              {/* Replies */}
              {replies.map((r, i) => (
                <div key={i} className="flex flex-col items-end">
                  <div className="flex items-center gap-2.5 mb-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="font-serif text-[12px] font-semibold text-secondary">A</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-medium text-gray-900">Admin User</p>
                      <p className="text-[11px] text-tertiary">Just now</p>
                    </div>
                  </div>
                  <div className="bg-primary rounded-xl rounded-tr-sm p-4 text-[13px] text-white/90 leading-relaxed max-w-[85%]">
                    {r}
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[11px] text-tertiary">Reply</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Reply box */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="font-serif text-[10px] font-semibold text-secondary">A</span>
                  </div>
                  <span className="text-[12px] text-tertiary">Reply to {message.title}</span>
                </div>
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  rows={4}
                  className="w-full px-4 py-3 text-[13px] text-gray-900 resize-none outline-none  border-none"
                />
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                      <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!reply.trim()}
                    className="bg-primary hover:bg-primary-dark text-white h-8 text-[12px] gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Sender Details</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex flex-col items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
                  <span className="font-serif text-[16px] font-semibold text-primary-dark">{initials}</span>
                </div>
                <div className="text-center">
                  <p className="text-[14px] font-medium text-gray-900">{message.title}</p>
                  <p className="text-[12px] text-tertiary">New Contact</p>
                </div>
              </div>
              {[
                ['Email', message.email],
                ['Received', message.date],
                ['Replies', String(replies.length)],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary">{label}</span>
                  <span className={`text-[12px] ${label === 'Email' ? 'text-primary' : 'text-gray-800'}`}>{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary">Status</span>
                <span className="px-2.5 py-1 rounded-full text-[11px] bg-secondary-light text-amber-700 font-medium">New Lead</span>
              </div>
              
               <a href={`mailto:${message.email}`}
                className="flex items-center justify-center gap-2 mt-3 w-full border border-gray-200 rounded-lg py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Email Directly
              </a>
            </CardContent>
          </Card>

          {message.relatedProperty && (
            <Card className="rounded-xl border border-gray-100 shadow-none">
              <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
                <p className="text-[13px] font-medium text-gray-900">Related Property</p>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-16 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <p className="text-[13px] font-medium text-gray-900 mb-1">{message.relatedProperty.title}</p>
                <p className="text-[12px] text-tertiary mb-3">{message.relatedProperty.location} · {message.relatedProperty.price}</p>
                <Link href={`/properties/${message.relatedProperty.id}`}>
                  <Button variant="outline" size="sm" className="w-full border-gray-200 text-[12px] h-8">
                    View Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}