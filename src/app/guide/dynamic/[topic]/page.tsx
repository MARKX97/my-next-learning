import Link from 'next/link';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';

type PageProps = {
  params: {
    topic: string;
  };
};

const supportedTopics = ['params', 'revalidate', 'metadata'];

export const metadata: Metadata = {
  title: 'Dynamic routing reference',
};

export async function generateStaticParams() {
  return supportedTopics.map(topic => ({ topic }));
}

export default function DynamicGuidePage({ params }: PageProps) {
  const normalized = params.topic.toLowerCase();
  const isKnown = supportedTopics.includes(normalized);

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10'>
      <div className='space-y-2'>
        <p className='text-sm uppercase tracking-wide text-muted-foreground'>
          Dynamic routing
        </p>
        <h1 className='text-3xl font-semibold'>/guide/dynamic/[topic]</h1>
        <p className='text-muted-foreground'>
          This page demonstrates how App Router segments are statically
          generated while still receiving the{' '}
          <code className='rounded bg-muted px-1'>params.topic</code> payload at
          runtime. Use the buttons below to swap between pre-rendered topics.
        </p>
      </div>

      <div className='flex flex-wrap gap-3'>
        {supportedTopics.map(topic => (
          <Link
            key={topic}
            href={`/guide/dynamic/${topic}`}
            className={cn(
              'inline-flex h-10 items-center rounded-full border px-4 text-sm font-semibold transition',
              topic === normalized
                ? 'border-primary bg-primary text-primary-foreground shadow'
                : 'border-border text-muted-foreground hover:bg-muted'
            )}
          >
            {topic}
          </Link>
        ))}
      </div>

      <article className='space-y-4 rounded-3xl border bg-card/60 p-6'>
        {isKnown ? (
          <>
            <h2 className='text-2xl font-semibold capitalize'>{normalized}</h2>
            {normalized === 'params' && (
              <p className='text-muted-foreground'>
                You are reading from the <code>params.topic</code> value.
                Because the route exports <code>generateStaticParams()</code>,
                Next.js produced dedicated HTML for each topic while still
                passing the captured segment to the component.
              </p>
            )}
            {normalized === 'revalidate' && (
              <p className='text-muted-foreground'>
                Add <code>export const revalidate = 60;</code> to re-build this
                page every minute. Dynamic segments are perfect for docs where
                you want static speed but incremental freshness.
              </p>
            )}
            {normalized === 'metadata' && (
              <p className='text-muted-foreground'>
                Because we export <code>metadata</code> from this route, you can
                tailor SEO titles per topic or generate them dynamically inside{' '}
                <code>generateMetadata</code>.
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className='text-2xl font-semibold'>
              Unknown topic &ldquo;{params.topic}&rdquo;
            </h2>
            <p className='text-muted-foreground'>
              Only <code>{supportedTopics.join(', ')}</code> are pre-rendered.
              Visiting any other slug falls back to the default rendering and
              still shows the captured parameter.
            </p>
          </>
        )}
      </article>

      <div className='flex justify-end text-sm font-medium text-primary'>
        <Link
          href='/'
          className='inline-flex items-center underline-offset-4 hover:underline'
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
