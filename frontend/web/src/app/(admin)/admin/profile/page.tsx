'use client';
import React, { useState } from 'react';
import { Save, Camera, Bell, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';

interface ProfileData {
  firstName: string; lastName: string; email: string;
  phone: string; location: string; bio: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    firstName: user?.firstName || 'Admin',
    lastName: user?.lastName || 'User',
    email: user?.email || 'admin@winconstructures.com',
    phone: '',
    location: '',
    bio: '',
  });
  const [notifications, setNotifications] = useState({
    inquiries: true,
    updates: true,
    weekly: true
  });
  const [passwords, setPasswords] = useState({ current: '', newPwd: '', confirm: '' });

  const fieldClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";
  const labelClass = "block text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary mb-1.5";

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-4 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Account</span>
          </div>
          <h1 className="font-serif text-[24px] font-semibold text-gray-900">My Profile</h1>
          <p className="text-[12px] text-tertiary mt-0.5">Manage your personal info and account settings</p>
        </div>
        <Button className="bg-primary hover:bg-primary-dark text-white h-9 text-[13px] gap-2">
          <Save className="w-3.5 h-3.5" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* LEFT */}
        <div className="space-y-4">

          {/* Profile Card */}
          <Card className="rounded-xl border border-gray-100 shadow-none overflow-hidden">
            <div className="h-28 bg-primary relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
            </div>
            <CardContent className="px-6 pb-5">
              <div className="flex items-end justify-between mb-4">
                <div className="relative -mt-9">
                  <div className="w-[70px] h-[70px] rounded-full bg-secondary border-4 border-white flex items-center justify-center">
                    <span className="font-serif text-[22px] font-semibold text-primary-dark">A</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-primary-light text-primary">Super Admin</span>
              </div>

              <h2 className="font-serif text-[18px] font-semibold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-[12px] text-tertiary mb-3">Administrator · Wiscon Structures</p>

              <div className="flex flex-wrap gap-4 text-[12px] text-tertiary mb-4">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{profile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{profile.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {[['1,240', 'Properties'], ['320', 'Clients'], ['$45k', 'Revenue'], ['98%', 'Satisfaction']].map(([num, label]) => (
                  <div key={label} className="flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-lg bg-gray-50 flex-1">
                    <span className="font-serif text-[18px] font-semibold text-gray-900">{num}</span>
                    <span className="text-[10px] text-tertiary uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Personal Information</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'First Name', key: 'firstName' },
                  { label: 'Last Name', key: 'lastName' },
                  { label: 'Email Address', key: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Location', key: 'location' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <input
                      type="text"
                      value={(profile as any)[key]}
                      onChange={(e) => setProfile(p => ({ ...p, [key]: e.target.value }))}
                      className={fieldClass}
                    />
                  </div>
                ))}
                <div>
                  <label className={labelClass}>Role</label>
                  <input type="text" value="Super Admin" readOnly className={`${fieldClass} bg-gray-50 text-tertiary cursor-not-allowed`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                  rows={3}
                  className={fieldClass}
                />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Change Password</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Current Password</label>
                <input type="password" placeholder="••••••••" value={passwords.current}
                  onChange={e => setPasswords(p => ({...p, current: e.target.value}))} className={fieldClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>New Password</label>
                  <input type="password" placeholder="Min. 8 characters" value={passwords.newPwd}
                    onChange={e => setPasswords(p => ({...p, newPwd: e.target.value}))} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <input type="password" placeholder="Repeat new password" value={passwords.confirm}
                    onChange={e => setPasswords(p => ({...p, confirm: e.target.value}))} className={fieldClass} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200 text-[13px] h-8">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          {/* Notifications */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Notifications</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {[
                { key: 'inquiries', label: 'New inquiries', sub: 'Get notified on new messages' },
                { key: 'updates',   label: 'Property updates', sub: 'Status change alerts' },
                { key: 'weekly',    label: 'Weekly report',    sub: 'Email digest every Monday' },
              ].map(({ key, label, sub }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">{label}</p>
                    <p className="text-[11px] text-tertiary mt-0.5">{sub}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(n => ({...n, [key]: !(n as any)[key]}))}
                    className={`relative w-9 h-5 rounded-full transition-colors ${(notifications as any)[key] ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${(notifications as any)[key] ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Recent Activity</p>
            </CardHeader>
            <CardContent className="px-5 py-8 text-center">
              <p className="text-[13px] text-tertiary">No recent activity to display.</p>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="rounded-xl border border-red-200 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-red-100 bg-red-50 space-y-0 rounded-t-xl">
              <p className="text-[13px] font-medium text-red-600">Danger Zone</p>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-[12px] text-tertiary mb-3 leading-relaxed">
                Deactivating removes your admin access. Contact support to restore.
              </p>
              <Button variant="outline" className="w-full border-red-200 bg-red-50 hover:bg-red-100 text-red-600 h-9 text-[12px] gap-2">
                <Trash2 className="w-3.5 h-3.5" /> Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}