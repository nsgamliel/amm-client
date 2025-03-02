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
    "03-20-2024",
    "03-21-2024",
    "03-22-2024",
    "03-23-2024",
    "03-24-2024",
    "03-25-2024",
    "03-26-2024",
    "03-27-2024",
    "03-28-2024",
    "03-29-2024",
    "03-30-2024",
    "03-31-2024",
    "04-01-2024",
    "04-02-2024",
    "04-03-2024",
    "04-04-2024",
    "04-05-2024",
    "04-06-2024",
    "04-07-2024",
    "04-08-2024",
  ];

  const totalPicks = teams.reduce((accum, curr) => {
    const picks = timesPicked.get(curr.char6) ? timesPicked.get(curr.char6) : 0;
    return accum + picks!;
  }, 0);

  const teamsElim:number[] = labels.map((lab, idx) => {
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
    labels: labels,
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