import postgres from 'postgres';
import { BracketRaw, Bracket, Team } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export const getBrackets = async () => {
  try {
    const data = await sql<BracketRaw[]>`
      SELECT *
      FROM brackets`;

    // console.log(data);

    const brackets = data.map((bracket) => ({
      id: bracket.bracket_id,
      name: bracket.name,
      teams: [
        bracket.team1,
        bracket.team2,
        bracket.team3,
        bracket.team4,
        bracket.team5,
        bracket.team6,
        bracket.team7,
        bracket.team8
      ],
      paid: bracket.paid,
    }));
    return brackets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch brackets.');
  }
};

export const getTeamsArray = async () => {
  console.log(`${process.env.MMSCORES_BASE_URL}/teams`);
  const res = await fetch(`${process.env.MMSCORES_BASE_URL}/teams`);
  const data = await res.json();
  return data;
};

export const getTeamsDict = async ():Promise<{ [char6: string]: Team }> => {
  const res = await fetch(`${process.env.MMSCORES_BASE_URL}/teams`);
  const data = await res.json();
  // console.log(data);
  const dict:{[key: string]: Team} = {};

  data.forEach((team:Team) => {
    dict[team.char6] = team;
  });

  return dict;
};

export const getLeaderboard = async () => {
  let [brackets, teams]:[Bracket[], {[key: string]: Team}] = await Promise.all([getBrackets(), getTeamsDict()]);

  // console.log(brackets);
  // console.log(teams);
  
  brackets.forEach((bracket:Bracket) => {
    // console.log(bracket.name);
    bracket.points = bracket.teams
      .map((char6:string) => {
        if (!teams[char6]) return 0;
        return teams[char6].seed * 15 + teams[char6].confirmedpts + teams[char6].inprogresspts;
      })
      .reduce((prev, curr) => prev + curr, 0);
    bracket.teamsIn = bracket.teams
      .reduce((accum, curr) =>
        teams[curr] && teams[curr].intournament ? accum + 1 : accum
      , 0);
  });

  return brackets;
};