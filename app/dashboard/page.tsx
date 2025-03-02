import { lusitana, inter } from "../ui/fonts";

export default async function Page() {

  // console.log(process.env.MMSCORES_BASE_URL);

  return (
    <>
      <h1 className={`${lusitana.className} text-center md:text-left text-4xl mb-6`}>Contest Details</h1>

      <p className={`${inter.className} my-4 text-lg`}><strong>GET YOUR PICKS IN ON TIME!</strong> Send selections and payment to the email and Venmo included in the welcome email.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Rules</h2>
      <p className={`${inter.className} my-4`}>For those that played the previous years, the rules are the same. Entry fee = $20.  Winner takes all, maybe, depending on how many entries. 400 minimum to the winner. If there is a tie, they split. The rules are a little unusual.  It is not a standard bracket pool so if you have questions, ask away.</p>
      <p className={`${inter.className} my-4`}>Each entry submission will consist of 8 teams of the owners choosing. The same team can be on multiple owners submissions. They are not unique to an owner. Just pick any 8 teams you want.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Scoring</h2>
      <p className={`${inter.className} my-4`}>Scoring is based on how many points your teams score in their respective games. It does not matter if they win or lose, if they score 80, you get 80 points. Points scored are equal for each round.  There is no additional points for your team making it further into tourney besides what they score in their individual game.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Bonus Scoring</h2>
      <p className={`${inter.className} my-4`}>Each entry will receive a one time bonus to their scoring. The Bonus score will be the sum of the seeding of the 8 teams you pick *  15. So, if you pick a 9 seeded team, you will receive a one time bonus  of 135 points for that team.</p>
      <p className={`${inter.className} my-4`}>Example with just 4 teams instead of 8:</p>
      <ul className={`${inter.className} m-4`}>
        <li>Team A = 1 seed</li>
        <li>Team B = 2 seed</li>
        <li>Team C = 3 seed</li>
        <li>Team D = 10 seed</li>
      </ul>
      <p className={`${inter.className} my-4`}>Bonus points would be 1 + 2 + 3 + 10 = 16. Then 16 *15 = 240.  This team would start with 240 points, then whatever amount the actual  teams score in their games will be added. This is a one time bonus to start  the  tourney.</p>
      <p className={`${inter.className} my-4`}>For example if at the end of Round 1, the teams score 100, 100, 50, 50, respectively the owner would now have a total of 240 + 100 +100  + 50 + 50 = 540 points.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Entries</h2>
      <p className={`${inter.className} my-4`}>Need to be in by Thurs 3/20 11:14:59AM CT. FYI, You can select teams from the 'play in' games. You will get the winner of the game. The points within the 'play in' game will not count towards your score. You cannot select one team from 'play in' game and if they lose, pick another. You get the winner regardless. Let me know if you have questions.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Payment</h2>
      <p className={`${inter.className} my-4`}>You need to pay before playing, or have setup other arrangements with Dema, Casey or Nate.</p>

      <h2 className={`${lusitana.className} text-center md:text-left text-3xl my-6`}>Notes</h2>
      <p className={`${inter.className} my-4`}>You can have more than one entry per person if you want. Its 20 bucks an entry, as long as you pay you can have as many as you want.</p>
      <p className={`${inter.className} my-4`}>Tell your friends, this is not limited to anyone in particular, unless they're smart and know something about basketball, then probably don't invite them.</p>

      {/* TODO: FAQs */}
    </>
  );
}