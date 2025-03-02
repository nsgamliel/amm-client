export type Team = {
  id: number;
  name: string;
  short: string;
  char6: string;
  seed: number;
  intournament: boolean;
  eliminatedon: string;
  confirmedpts: number;
  inprogresspts: number;
  year: number;
};

export type BracketRaw = {
  bracket_id: number;
  name: string;
  user_name: string;
  team1: string;
  team2: string;
  team3: string;
  team4: string;
  team5: string;
  team6: string;
  team7: string;
  team8: string;
  paid: boolean;
};

export type Bracket = {
  id: number;
  name: string;
  user: string;
  teams: string[];
  points?: number;
  teamsIn?: number;
  paid: boolean;
}