import RailRenderer from "./components/Rails/RailRenderer";

// export default async function HomePage() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rails`, { cache: "no-store" });
//   const rails = await res.json();

//   const sortedRails = rails.sort((a, b) => Number(a.rail_pos) - Number(b.rail_pos));

//   return <RailRenderer rails={sortedRails} />;
// }


// app/page.tsx


export default async function HomePage() {
  const res = await fetch('https://mn2-orpin.vercel.app/api/rails', { 
    cache: "no-store" 
  });
  const rails = await res.json();

  const sortedRails = rails.sort((a, b) => Number(a.rail_pos) - Number(b.rail_pos));

  return <RailRenderer rails={sortedRails} />;
}