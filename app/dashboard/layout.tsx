import SideNav from '@/app/ui/dashboard/sidenav';
import Link from 'next/link';
import { lusitana } from '../ui/fonts';
import Image from 'next/image';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        className="flex h-[10vh] items-center justify-center bg-red-700 md:h-[10vh] md:p-2 fixed left-0 right-0 top-0"
        href="/"
      >
        <div className="flex items-center w-full text-white h-full">
          <Image 
            src="/albania.png"
            alt="Albanian Flag"
            width={400}
            height={400}
            style={{objectFit: "contain", maxHeight: "100%" }}
            className='w-1/2 h-auto max-h-none md:max-h-full'
          />
          <h1 className={`${lusitana.className} text-lg md:text-3xl text-white w-full text-center font-bold p-4`}>Albanian March Madness Contest of Champions</h1>
          <Image 
            src="/albania.png"
            alt="Albanian Flag"
            width={400}
            height={400}
            style={{objectFit: "contain", maxHeight: "100%" }}
            className='w-1/2 h-auto max-h-none md:max-h-full hidden md:block'
          />
        </div>
      </Link>
      <div className="flex h-[90vh] mt-[10vh] flex-col md:flex-row md:overflow-hidden">
        <div className="w-full bg-white flex-none md:w-64 fixed left-0 right-0 top-[10vh] md:static">
          <SideNav />
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-12 mt-[80px] md:mt-0">{children}</div>
      </div>
    </>
  );
}