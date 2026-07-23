'use client';

import {
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  Gauge,
  Loader2,
  Lock,
  LogOut,
  Mail,
  ReceiptText,
  Shield,
  User,
} from 'lucide-react';
import { useSession } from '@/lib/useSession';
import { identityUrl, identityPortalUrl, billingUrl, logoutUrl } from '@/lib/site';

/**
 * Account profile on the main site. Identity data (name, email) is owned by
 * the identity system; usage, billing and invoices live on the billing
 * subdomain. This page is the profile hub that links out to both.
 */
export function AccountView() {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-cine-faint" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--cine-line)] bg-[rgba(var(--cine-particle),0.08)] text-[var(--cine-amber)]">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-[1.75rem] font-semibold tracking-[-0.02em] text-cine">
          Sign in to your account
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-cine-dim">
          Manage your profile, security, and workspace in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={identityUrl('login', '/account')} className="btn btn-primary h-11 px-6 text-[0.875rem]">
            Log in
          </a>
          <a href={identityUrl('signup', '/account')} className="btn btn-secondary h-11 px-6 text-[0.875rem]">
            Create account
          </a>
        </div>
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : user.email[0]?.toUpperCase();

  return (
    <div>
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-cine-faint">
            Workspace
          </p>
          <h1 className="mt-1.5 text-[1.9rem] font-semibold tracking-[-0.03em] text-cine">
            {user.workspace || `${user.name}'s workspace`}
          </h1>
          <p className="mt-1 text-[0.875rem] text-cine-dim">Account &amp; profile</p>
        </div>
        <a href={logoutUrl('/')} className="btn btn-secondary h-10 px-4 text-[0.8125rem]">
          <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} /> Log out
        </a>
      </div>

      <div className="mt-8 space-y-6">
        {/* profile */}
        <div className="rounded-[var(--radius-xl)] cine-card p-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[rgba(var(--cine-particle),0.12)] text-[1.1rem] font-semibold text-[var(--cine-amber)]"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[1.15rem] font-semibold text-cine">{user.name}</h2>
                <BadgeCheck className="h-4 w-4 text-[var(--cine-amber)]" />
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.875rem] text-cine-dim">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-[var(--cine-line)] pt-5 sm:grid-cols-3">
            <div>
              <dt className="flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-cine-faint">
                <User className="h-3.5 w-3.5" /> Name
              </dt>
              <dd className="mt-1 text-[0.9375rem] text-cine">{user.name}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-cine-faint">
                <Mail className="h-3.5 w-3.5" /> Email
              </dt>
              <dd className="mt-1 truncate text-[0.9375rem] text-cine">{user.email}</dd>
            </div>
            <div>
              <dt className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-cine-faint">Workspace</dt>
              <dd className="mt-1 text-[0.9375rem] text-cine">
                {user.workspace || `${user.name}'s workspace`}
              </dd>
            </div>
          </dl>

          <a
            href={identityPortalUrl('/')}
            className="mt-5 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[var(--cine-amber)] hover:underline"
          >
            Edit profile in Identity <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* security */}
        <div className="rounded-[var(--radius-xl)] cine-card p-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--cine-amber)]" />
            <h2 className="text-[1rem] font-semibold text-cine">Security</h2>
          </div>
          <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-cine-dim">
            Password, two-factor authentication, and connected sign-in methods are
            managed securely in Citron Identity.
          </p>
          <a href={identityPortalUrl('/')} className="btn btn-secondary mt-4 h-10 px-4 text-[0.8125rem]">
            Manage security <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>

        {/* usage & billing → subdomain */}
        <div className="rounded-[var(--radius-xl)] cine-card p-6">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-[var(--cine-amber)]" />
            <h2 className="text-[1rem] font-semibold text-cine">Usage & billing</h2>
          </div>
          <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-cine-dim">
            Your AI credit usage, subscription, payment methods, and invoices live
            in your billing dashboard.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <a
              href={billingUrl('/usage')}
              className="group rounded-[var(--radius-lg)] border border-[var(--cine-line)] p-4 transition hover:border-[var(--cine-amber-bright)]"
            >
              <Gauge className="h-5 w-5 text-[var(--cine-amber)]" />
              <h3 className="mt-2.5 flex items-center gap-1 text-[0.9rem] font-semibold text-cine">
                Usage <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-[0.75rem] text-cine-faint">Credits by model, daily trends.</p>
            </a>
            <a
              href={billingUrl('/billing')}
              className="group rounded-[var(--radius-lg)] border border-[var(--cine-line)] p-4 transition hover:border-[var(--cine-amber-bright)]"
            >
              <CreditCard className="h-5 w-5 text-[var(--cine-amber)]" />
              <h3 className="mt-2.5 flex items-center gap-1 text-[0.9rem] font-semibold text-cine">
                Billing <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-[0.75rem] text-cine-faint">Plan, seats, payment methods.</p>
            </a>
            <a
              href={billingUrl('/billing')}
              className="group rounded-[var(--radius-lg)] border border-[var(--cine-line)] p-4 transition hover:border-[var(--cine-amber-bright)]"
            >
              <ReceiptText className="h-5 w-5 text-[var(--cine-amber)]" />
              <h3 className="mt-2.5 flex items-center gap-1 text-[0.9rem] font-semibold text-cine">
                Invoices <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-[0.75rem] text-cine-faint">Receipts and payment history.</p>
            </a>
          </div>
          <a href={billingUrl('/')} className="btn btn-primary mt-5 h-11 px-6 text-[0.875rem]">
            Open billing dashboard <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  );
}
