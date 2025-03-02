"use client";

import {
  Bracket, Team
} from '@/app/lib/definitions';
import React, { useState } from 'react';

export default function ExpandableTable({
  leaderboard, teams
}: {
  leaderboard: Bracket[];
  teams: { [char6: string]: Team };
}) {

  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleAccordion = (rowId: number) => {
    setOpenRow((prev) => (prev === rowId ? null : rowId));
  };

  return (
    <table className="w-full">
        <thead>
          <tr className='hidden md:table-row'>
            <td className='font-bold text-lg pb-4 pr-2'>Rank</td>
            <td className='font-bold text-lg pb-4 pr-2'>Name</td>
            {/* <td className='font-bold'>User</td> */}
            <td className='font-bold text-lg pb-4 pr-2'>Total Points</td>
            <td className='font-bold text-lg pb-4 pr-2'>Points Behind</td>
            <td className='font-bold text-lg pb-4'>Teams Left</td>
          </tr>
          <tr className='table-row md:hidden'>
            <td className='font-bold text-lg pb-4 pr-2'>Rank</td>
            <td className='font-bold text-lg pb-4 pr-2'>Name</td>
            {/* <td className='font-bold'>User</td> */}
            <td className='font-bold text-lg pb-4 pr-2'>Points</td>
            <td className='font-bold text-lg pb-4 text-wrap'>Teams Left</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((bracket:Bracket, idx:number) => (
            <React.Fragment key={`${bracket.id}f`}>
              <tr key={bracket.id} className='border-b cursor-pointer' onClick={() => toggleAccordion(bracket.id)}>
                <td className={`py-2 px-1 whitespace-nowrap ${idx<3 ? 'text-green-500 font-bold' : ''}`}>
                  {idx+1} {idx<3 ? '$'.repeat(3-idx) : ''} {bracket.paid ? '' : "*"}
                </td> 
                <td className={`py-2 px-1 truncate w-[45%] max-w-0`}>{bracket.name}</td>
                {/* <td className='py-2'>{bracket.user}</td> */}
                <td className={`py-2 px-1 whitespace-nowrap`}>{bracket.points ? bracket.points : "n/a"} <span className='block md:hidden text-red-500 inline-block whitespace-nowrap'>{idx > 0 && bracket.points && leaderboard[0].points ? `(-${leaderboard[0].points - bracket.points})` : ""}</span></td>
                <td className={`py-2 px-1 whitespace-nowrap hidden md:block ${idx > 0 ? 'text-red-500' : ''}`}>{bracket.points && leaderboard[0].points ? leaderboard[0].points - bracket.points : "n/a"}</td>
                <td className={`py-2 px-1 whitespace-nowrap`}>{bracket.teamsIn ? bracket.teamsIn : "n/a"}</td>
              </tr>
              <tr key={`${bracket.id}b`} id={`row${bracket.id}`} className={`bg-gray-100 ${
                openRow === bracket.id ? 'table-row' : 'hidden'
              }`}>
                <td colSpan={5} className='p-3'>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <td colSpan={5} className='font-bold text-lg text-pretty break-all'>{bracket.name}</td>
                      </tr>
                      <tr>
                        <td className='font-bold'>Team</td>
                        <td className='font-bold'>Seed</td>
                        <td className='font-bold'>Points</td>
                        <td className='font-bold'>Status</td>
                      </tr>
                    </thead>
                    <tbody key={`${bracket.id}subbody`}>
                      {bracket.teams.map((team:string, idx:number) => (
                        <React.Fragment key={idx}>
                          <tr key={`${idx}r`} className='hidden md:table-row'>
                            <td className='w-1/2'>{teams[team].name}</td>
                            <td>{teams[team].seed}</td>
                            <td>{teams[team].seed * 15 + teams[team].confirmedpts + teams[team].inprogresspts}</td>
                            <td className={`${teams[team].intournament ? 'text-green-500' : 'text-red-500'}`}>{teams[team].intournament ? "Active" : "Eliminated"}</td>
                          </tr>
                          <tr key={`${idx}s`} className='table-row md:hidden'>
                            <td className='w-1/3 pr-2'>{teams[team].short}</td>
                            <td className='pr-2'>{teams[team].seed}</td>
                            <td className='pr-2'>{teams[team].seed * 15 + teams[team].confirmedpts + teams[team].inprogresspts}</td>
                            <td className={`${teams[team].intournament ? 'text-green-500' : 'text-red-500'}`}>{teams[team].intournament ? "Active" : "Eliminated"}</td>
                          </tr>
                        </React.Fragment>
                        
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </React.Fragment>
            
          ))}
        </tbody>
      </table>
  );
}
