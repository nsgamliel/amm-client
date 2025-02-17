import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-0">
        <div className="flex h-32 fixed left-0 right-0 top-0 shrink-0 items-center bg-red-700 p-4 md:h-48">
          <h1 className={`${lusitana.className} text-3xl md:text-6xl text-white w-full text-center font-bold`}>Albanian March Madness Contest of Champions</h1>
        </div>
        <div className="m-4 mt-36 md:mt-52 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-100 px-6 py-10 w-full md:w-2/5 md:px-10">
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Albanian March Madness.</strong>
            </p>
            <p>If that sounds familiar, you're in the right place. Otherwise, don't worry about it.</p>
            <p>Be a mensch.</p>
            <Link
              href="/dashboard/leaderboard"
              className="flex items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
          </div>
        </div>
      </main>

      <footer className='w-full text-center'>
        Web Development by <a href="http://natangamliel.com" target="_blank" rel="noopener noreferrer">Natan Gamliel</a>.
      </footer>
    </>
  );
}
