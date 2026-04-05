'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 1500)); // Replace with real auth
    setLoading(false);
    router.push('/admin');
  };

  const fieldClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-[DM_Sans] bg-white";
  const labelClass = "block text-[10px] font-medium uppercase tracking-[0.07em] text-gray-500 mb-1.5";

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 bg-primary p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px' }}
        />
        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <span className="font-serif text-[14px] font-semibold text-primary-dark">W</span>
          </div>
          <span className="font-serif text-[17px] font-semibold text-white">Wiscon Structures</span>
        </div>

        {/* Headline */}
        <div className="relative">
          <h1 className="font-serif text-[36px] font-light text-white leading-[1.15] mb-4">
            Premium real estate<br />management,{' '}
            <em className="italic text-secondary not-italic">simplified.</em>
          </h1>
          <p className="text-[13px] text-white/60 leading-relaxed max-w-sm">
            Manage your entire property portfolio — listings, clients, and revenue — all from one elegant dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="relative flex gap-6">
          {[['1.2k+', 'Properties listed'], ['840+', 'Happy clients'], ['98%', 'Satisfaction']].map(([num, label], i, arr) => (
            <React.Fragment key={label}>
              <div>
                <p className="font-serif text-[24px] font-semibold text-white">{num}</p>
                <p className="text-[11px] text-white/55">{label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px bg-white/15 self-stretch" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-[420px] bg-white flex flex-col justify-center px-8 lg:px-10 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="font-serif text-[12px] font-semibold text-secondary">W</span>
          </div>
          <span className="font-serif text-[16px] font-semibold text-primary">Wiscon Structures</span>
        </div>

        <h2 className="font-serif text-[26px] font-semibold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-[13px] text-tertiary mb-8">Sign in to your admin account</p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@wiscon.com" className={fieldClass} required
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${fieldClass} pr-10`} required
              />
              <button
                type="button" onClick={() => setShowPwd(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
              <input
                type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 accent-primary"
              />
              Remember me
            </label>
            <button type="button" className="text-[13px] text-primary font-medium hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-lg py-2.5 text-[14px] font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button className="w-full border border-gray-200 rounded-lg py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-[12px] text-tertiary text-center mt-6">
          Don't have an account?{' '}
          <span className="text-primary font-medium cursor-pointer hover:underline">
            Contact your administrator
          </span>
        </p>
      </div>
    </div>
  );
}