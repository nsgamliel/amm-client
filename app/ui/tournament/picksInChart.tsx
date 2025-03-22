"use client";

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Team } from '@/app/lib/definitions';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PicksInChart({
  teams, timesPicked
}:{
  teams: Team[],
  timesPicked: Map<string, number>;
}) {

  const labels = [
    "03-20-2025",
    "03-21-2025",
    "03-22-2025",
    "03-23-2025",
    "03-24-2025",
    "03-25-2025",
    "03-26-2025",
    "03-27-2025",
    "03-28-2025",
    "03-29-2025",
    "03-30-2025",
    "03-31-2025",
    "04-01-2025",
    "04-02-2025",
    "04-03-2025",
    "04-04-2025",
    "04-05-2025",
    "04-06-2025",
    "04-07-2025",
    "04-08-2025",
  ];

  const date1 = new Date();
  const date2 = new Date('2025-03-20');
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const daysDiff = Math.min(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 19);

  const totalPicks = teams.reduce((accum, curr) => {
    const picks = timesPicked.get(curr.char6) ? timesPicked.get(curr.char6) : 0;
    return accum + picks!;
  }, 0);

  const teamsElim:number[] = labels.slice(0,daysDiff).map((lab, idx) => {
    let elims = 0;
    teams.forEach((team:Team) => {
      if (team.eliminatedon === lab) {
        const picks = timesPicked.get(team.char6) ? timesPicked.get(team.char6) : 0;
        elims += picks!;
      }
    });
    return elims;
  });

  const teamsIn:number[] = teamsElim.map((val, idx) => {
    if (idx === 0) return totalPicks;
    return totalPicks - teamsElim.slice(0,idx+1).reduce((accum, curr) => accum + curr, 0);
  });

  const teamsOut:number[] = teamsIn.map((val) => totalPicks - val);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Selections In vs Out by Day',
      },
    },
  };

  const chartData = {
    labels: labels.slice(0,daysDiff),
    datasets: [
      {
        label: 'In',
        data: teamsIn,
        fill: false,
        borderColor: '#48bb78',
        backgroundColor: '#48bb78',
        tension: 0,
      },
      {
        label: 'Out',
        data: teamsOut,
        fill: false,
        borderColor: '#f56565',
        backgroundColor: '#f56565',
        tension: 0
      }
    ]
  };

  return (
    <Line
      data={chartData}
      options={options}
    />
  )

};