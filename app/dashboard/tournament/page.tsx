import { Team } from '@/app/lib/definitions';
import { getTeamsArray } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getTeamsArray();
  // console.log(data);

  data.sort((a:Team, b:Team) => {
    const aP = a.seed * 15 + a.confirmedpts + a.inprogresspts;
    const bP = b.seed * 15 + b.confirmedpts + b.inprogresspts
    if (aP < bP) return 1;
    if (aP > bP) return -1;
    return 0;
  });

  return (
    <>
      <h1 className={`${lusitana.className} text-center md:text-left text-4xl mb-6`}>Tournament</h1>
      <table className="w-full">
        <thead>
          <tr className='hidden md:table-row'>
            <td className='font-bold text-lg pb-4 pr-2'>Team</td>
            <td className='font-bold text-lg pb-4 pr-2'>Seed</td>
            <td className='font-bold text-lg pb-4 pr-2'>Total Points</td>
            <td className='font-bold text-lg pb-4'>Status</td>
          </tr>
          <tr className='table-row md:hidden'>
            <td className='font-bold text-lg pb-4 pr-2'>Team</td>
            <td className='font-bold text-lg pb-4 pr-2'>Seed</td>
            <td className='font-bold text-lg pb-4 pr-2'>Points</td>
            <td className='font-bold text-lg pb-4'>Status</td>
          </tr>
        </thead>
        <tbody>
          {data.map((team:Team) => (
            <React.Fragment key={team.id}>
              <tr key={`${team.id}r`} className='border-b hidden md:table-row'>
                <td className='p-2'>{team.name}</td>
                <td className='p-2'>{team.seed}</td>
                <td className='p-2'>{team.seed * 15 + team.confirmedpts + team.inprogresspts}</td>
                <td className={`p-2 ${team.intournament ? 'text-green-500' : 'text-red-500'}`}>{team.intournament ? "In" : "Eliminated"}</td>
              </tr>
              <tr key={`${team.id}s`} className='border-b table-row md:hidden'>
                <td className='p-2'>{team.short}</td>
                <td className='p-2'>{team.seed}</td>
                <td className='p-2'>{team.seed * 15 + team.confirmedpts + team.inprogresspts}</td>
                <td className={`p-2 ${team.intournament ? 'text-green-500' : 'text-red-500'}`}>{team.intournament ? "In" : "Eliminated"}</td>
              </tr>
            </React.Fragment>
            
          ))}
        </tbody>
      </table>
    </>
  );
}