import type { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next Learning Lab',
  description:
    'A compact sandbox that demonstrates Tailwind CSS, shadcn/ui-inspired primitives, and Zustand inside a Next.js App Router project.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-background font-sans text-foreground'>
        <div className='flex min-h-screen flex-col'>
          <header className='sticky top-0 z-50 border-b bg-white/70 backdrop-blur dark:bg-background/80'>
            <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4'>
              <Link href='/' className='text-lg font-semibold tracking-tight'>
                Next Learning Lab
              </Link>
              <nav className='flex items-center gap-3 text-sm font-medium text-muted-foreground'>
                <Link href='/' className='hover:text-foreground'>
                  Home
                </Link>
                <Link
                  href='/guide/dynamic/params'
                  className='hover:text-foreground'
                >
                  Dynamic routing guide
                </Link>
                <a
                  href='https://github.com/MARKX97/my-next-learning'
                  target='_blank'
                  className='inline-flex items-center gap-2 rounded-full border px-3 py-1 hover:text-foreground'
                >
                  <Github className='h-4 w-4' /> Repo
                </a>
              </nav>
            </div>
          </header>
          <main className='flex-1 bg-gradient-to-b from-background to-muted/40'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
