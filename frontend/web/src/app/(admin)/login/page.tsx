'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(true);
  const [localError, setLocalError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      toast.error('Please fill in all fields');
      return;
    }

    setLocalError('');
    const result = await login({ email, password });

    if (result.success) {
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } else {
      setLocalError(result.message || 'Login failed');
      toast.error(result.message || 'Login failed');
    }
  };

  const displayError = localError || authError;

  const fieldClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all  bg-white";
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
          {[
            ['1.2k+', 'Properties listed'],
            ['840+', 'Happy clients'],
            ['98%', 'Satisfaction']
          ].map(([num, label], i, arr) => (
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
      <div className="w-full lg:w-[580px] bg-white flex flex-col justify-center px-8 lg:px-10 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="font-serif text-[12px] font-semibold text-secondary">W</span>
          </div>
          <span className="font-serif text-[16px] font-semibold text-primary">Wiscon Structures</span>
        </div>

        <h2 className="font-serif text-[26px] font-semibold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-[13px] text-tertiary mb-8">Sign in to your admin account</p>

        {displayError && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-600">
            {displayError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@winconstructures.com"
              className={fieldClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${fieldClass} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 accent-primary"
              />
              Remember me
            </label>
            <button type="button" className="text-[13px] text-primary font-medium hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white rounded-lg py-2.5 text-[14px] font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

       

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