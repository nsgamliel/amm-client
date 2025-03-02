import { getLeaderboard, getTeamsDict } from '@/app/lib/data';
import ExpandableTable from '@/app/ui/leaderboard/expandableTable';
import { Bracket, Team } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const leaderboard = await getLeaderboard();
  const teams = await getTeamsDict();
  // console.log(data);

  leaderboard.sort((a:Bracket, b:Bracket) => {
    if (a.points && b.points && a.points < b.points) return 1;
    if (a.points && b.points && a.points > b.points) return -1;
    return 0;
  });

  return (
    <>
      <h1 className={`${lusitana.className} text-center md:text-left text-4xl mb-6`}>Leaderboard</h1>
      <ExpandableTable leaderboard={leaderboard} teams={teams} />
      <p className='my-4 w-full text-center'>* = Commissioner Review</p>
    </>
  );
}