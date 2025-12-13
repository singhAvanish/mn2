"use client";

import RailOne from "./RailOne";
import RailTwo from "./RailTwo";
import RailThree from "./RailThree";

export default function RailRenderer({ rails }) {
  if (!rails || rails.length === 0) return null;

  return (
    <div>
      {rails.map((rail) => (
        <RenderSingleRail key={rail._id} rail={rail} />
      ))}
    </div>
  );
}

function RenderSingleRail({ rail }) {
  const pos = Number(rail.rail_pos);

  switch (pos) {
    case 1:
      return <RailOne rail={rail} />;
    case 2:
      return <RailTwo rail={rail} />;
    case 3:
      return <RailThree rail={rail} />;
    default:
      return null;
  }
}
