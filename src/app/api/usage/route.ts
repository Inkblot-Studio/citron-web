import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/session';
import { buildMockUsage, type UsageSummary } from '@/lib/usage';
import { citronApiConfigured, fetchUsageByOwner } from '@/lib/citron-api';

export const dynamic = 'force-dynamic';

/**
 * Usage summary for the signed-in user's workspace.
 * Live data from citron-api when CITRON_API_URL/TOKEN are set; otherwise
 * the deterministic mock so the dashboard works standalone.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Sign in to view usage.' }, { status: 401 });
  }

  if (citronApiConfigured()) {
    const live = await fetchUsageByOwner<UsageSummary>(user.email);
    if (live) return NextResponse.json(live);
  }
  return NextResponse.json(buildMockUsage(user.workspace ?? 'Your workspace'));
}
