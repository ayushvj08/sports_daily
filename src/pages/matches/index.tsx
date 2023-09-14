import MatchCards from "./MatchCards";

export type Match = {
  id: 3;
  name: "Titans VS Vortex Vipers at Unity Arena, Concordia";
  location: "Unity Arena, Concordia";
  sportName: "American Football";
  endsAt: "2023-06-08T15:25:16.142Z";
  isRunning: false;
  teams: [
    {
      id: 5;
      name: "Titans";
    },
    {
      id: 6;
      name: "Vortex Vipers";
    }
  ];
};

const Matches = () => {
  return (
    <div>
      <MatchCards />
    </div>
  );
};
export default Matches;
