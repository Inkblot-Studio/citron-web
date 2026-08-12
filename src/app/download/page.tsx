import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { fetchLauncherRelease, launcherDownloadUrl, type LauncherRelease } from '@/lib/citron-api';
import { LAUNCHER, PRODUCTS } from '@/lib/products';
import { ProductMark } from '@/components/products/ProductMark';
import { ReleaseNotes } from '@/components/download/ReleaseNotes';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Install the Inkblot Launcher and every app you have access to is a click away. Free, for macOS, Windows and Linux.',
  alternates: { canonical: '/download' },
};

// The release feed is live, so the page must not be baked at build time.
export const dynamic = 'force-dynamic';

const DOWNLOADABLE = PRODUCTS.filter((product) => product.stage === 'shipping');

interface Build {
  id: string;
  label: string;
  /** Shown under the button — the detail that decides between two Mac builds. */
  note?: string;
}

const BUILDS: Build[] = [
  { id: 'mac-arm64', label: 'macOS', note: 'Apple silicon' },
  { id: 'mac-x64', label: 'macOS', note: 'Intel' },
  { id: 'win-x64', label: 'Windows', note: '64-bit' },
  { id: 'linux-x64', label: 'Linux', note: 'AppImage' },
];

/**
 * Which build to lead with. The user agent gives the OS but never the Mac's
 * architecture, so Apple silicon leads and Intel sits beside it rather than
 * guessing wrong for half of all Mac visitors.
 */
function preferredBuild(userAgent: string): string {
  if (/Windows/i.test(userAgent)) return 'win-x64';
  if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) return 'linux-x64';
  return 'mac-arm64';
}

function formatBytes(bytes: number): string {
  if (!bytes) return '';
  const mb = bytes / 1024 / 1024;
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${Math.round(mb)} MB`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.valueOf())
    ? ''
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function DownloadPage() {
  const [release, headerList] = await Promise.all([fetchLauncherRelease(), headers()]);
  const preferred = preferredBuild(headerList.get('user-agent') ?? '');

  return (
    <article className="pp" style={{ ['--accent' as string]: LAUNCHER.accent }}>
      <header className="pp__hero">
        <ProductMark glyph={LAUNCHER.glyph} accent="#C9A227" size={96} />
        <p className="pp__name">{LAUNCHER.name}</p>
        <h1 className="pp__hook">{LAUNCHER.hook}</h1>
        <p className="pp__tagline">{LAUNCHER.summary}</p>

        {release ? (
          <LiveDownload release={release} preferred={preferred} />
        ) : (
          <>
            {/* No published build yet — say so rather than hand over a dead link. */}
            <p className="dl__pending">Not yet released. The first public build lands soon.</p>
            <p className="pp__platform">{LAUNCHER.platform} · free</p>
          </>
        )}
      </header>

      {release?.notes && (
        <section className="pp__body dl__notes">
          <p className="pp__momentLabel">What&rsquo;s new in {release.version}</p>
          <ReleaseNotes markdown={release.notes} />
        </section>
      )}

      <section className="pp__moment">
        <p className="pp__momentLabel">What you get with it</p>
        <p className="pp__momentText">{LAUNCHER.useCase}</p>
      </section>

      <section className="pp__body">
        <p className="pp__summary">
          The launcher is how the apps reach you. It installs them, keeps them current, and shows
          what you already have — so a new machine or a new colleague is one install and a sign-in,
          not an afternoon.
        </p>
        <ul className="pp__caps">
          {LAUNCHER.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="pp__who">
        <p className="pp__momentLabel">Ships inside it today</p>
        <div className="pp__next">
          {DOWNLOADABLE.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="pp__nextItem"
              style={{ ['--accent' as string]: product.accent }}
            >
              <ProductMark glyph={product.glyph} accent={product.accent} size={40} />
              <span>
                <strong>{product.name}</strong>
                <span className="pp__nextLine">{product.tagline}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function LiveDownload({ release, preferred }: { release: LauncherRelease; preferred: string }) {
  const available = BUILDS.filter((build) => release.platforms[build.id]);
  const lead = available.find((build) => build.id === preferred) ?? available[0];
  const rest = available.filter((build) => build.id !== lead?.id);

  if (!lead) {
    return <p className="dl__pending">No build for your platform yet.</p>;
  }

  const leadAsset = release.platforms[lead.id];
  const leadUrl = launcherDownloadUrl(lead.id);

  return (
    <>
      <a href={leadUrl ?? '#'} className="pp__cta" download>
        Download for {lead.label}
      </a>
      <p className="pp__platform">
        Version {release.version}
        {lead.note ? ` · ${lead.note}` : ''}
        {leadAsset?.sizeBytes ? ` · ${formatBytes(leadAsset.sizeBytes)}` : ''} · free
      </p>

      {rest.length > 0 && (
        <ul className="dl__others">
          {rest.map((build) => {
            const url = launcherDownloadUrl(build.id);
            const asset = release.platforms[build.id];
            return (
              <li key={build.id}>
                <a href={url ?? '#'} download>
                  {build.label}
                  {build.note ? ` (${build.note})` : ''}
                </a>
                {asset?.sizeBytes ? <span>{formatBytes(asset.sizeBytes)}</span> : null}
              </li>
            );
          })}
        </ul>
      )}

      {release.publishedAt && (
        <p className="dl__released">Released {formatDate(release.publishedAt)}</p>
      )}
    </>
  );
}
