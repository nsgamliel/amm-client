import { Team } from '@/app/lib/definitions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const getTeamData = async () => {
    const res = await fetch(`${process.env.MMSCORES_BASE_URL}/teams`);
    const data = await res.json();
    return data;
  };

  const data = await getTeamData();
  // console.log(data);

  return (
    <>
      <h1>Tournament Page</h1>
      <table className="w-full">
        <thead>
          <tr>
            <td>Team</td>
            <td>Seed</td>
            <td>Total Points</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data.map((team:Team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.seed}</td>
              <td>{team.seed * 15 + team.confirmedpts + team.inprogresspts}</td>
              <td>{team.intournament ? "" : "Eliminated"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}