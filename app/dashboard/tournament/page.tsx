import { Bracket, Team } from '@/app/lib/definitions';
import { getBrackets, getTeamsArray } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import PicksInChart from '@/app/ui/tournament/picksInChart';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const teams = await getTeamsArray();

  const brackets = await getBrackets();
  let timesPicked = new Map<string, number>();

  brackets.forEach((bracket:Bracket) => {
    bracket.teams.forEach((team:string) => {
      const times = timesPicked.has(team) ? timesPicked.get(team) : 0;
      timesPicked.set(team, times!+1);
    });
  });

  teams.sort((a:Team, b:Team) => {
    const aP = a.seed * 15 + a.confirmedpts + a.inprogresspts;
    const bP = b.seed * 15 + b.confirmedpts + b.inprogresspts
    if (aP < bP) return 1;
    if (aP > bP) return -1;
    return 0;
  });

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',teams);

  return (
    <>
      <h1 className={`${lusitana.className} text-center md:text-left text-4xl mb-6`}>Tournament</h1>
      {
        timesPicked.size > 0 ?
        <div className='h-[40vh] md:h-[40vh] mb-6'>
          <PicksInChart teams={teams} timesPicked={timesPicked} /> 
        </div> :
        <></>
      }
      {
        teams.length > 0 ?
        <table className="w-full">
          <thead>
            <tr className='hidden md:table-row'>
              <td className='font-bold text-lg pb-4 pr-2'>Team</td>
              <td className='font-bold text-lg pb-4 pr-2'>Seed</td>
              <td className='font-bold text-lg pb-4 pr-2'>Total Points</td>
              <td className='font-bold text-lg pb-4 pr-2'>Times Picked</td>
              <td className='font-bold text-lg pb-4'>Status</td>
            </tr>
            <tr className='table-row md:hidden'>
              <td className='font-bold text-lg pb-4 pr-2'>Team</td>
              <td className='font-bold text-lg pb-4 pr-2'>Points</td>
              <td className='font-bold text-lg pb-4 pr-2'>Picks</td>
              <td className='font-bold text-lg pb-4'>Status</td>
            </tr>
          </thead>
          <tbody>
            {teams.map((team:Team) => (
              <React.Fragment key={team.id}>
                <tr key={`${team.id}r`} className='border-b hidden md:table-row'>
                  <td className='p-2'>{team.name}</td>
                  <td className='p-2'>{team.seed}</td>
                  <td className='p-2'>{team.seed * 15 + team.confirmedpts + team.inprogresspts}</td>
                  <td className='p-2'>{timesPicked.has(team.char6) ? timesPicked.get(team.char6) : 0}</td>
                  <td className={`p-2 ${team.intournament ? 'text-green-500' : 'text-red-500'}`}>{team.intournament ? "Active" : "Eliminated"}</td>
                </tr>
                <tr key={`${team.id}s`} className='border-b table-row md:hidden'>
                  <td className='p-2'>{team.short} <span className='text-gray-500'>({team.seed})</span></td>
                  <td className='p-2'>{team.seed * 15 + team.confirmedpts + team.inprogresspts}</td>
                  <td className='p-2'>{timesPicked.has(team.char6) ? timesPicked.get(team.char6) : 0}</td>
                  <td className={`p-2 ${team.intournament ? 'text-green-500' : 'text-red-500'}`}>{team.intournament ? "Active" : "Eliminated"}</td>
                </tr>
              </React.Fragment>
              
            ))}
          </tbody>
        </table> :
        <p>Coming soon...</p>
      }
    </>
  );
}