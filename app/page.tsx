import RailRenderer from "./components/Rails/RailRenderer";

// export default async function HomePage() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rails`, { cache: "no-store" });
//   const rails = await res.json();

//   const sortedRails = rails.sort((a, b) => Number(a.rail_pos) - Number(b.rail_pos));

//   return <RailRenderer rails={sortedRails} />;
// }


// app/page.tsx
export default async function HomePage() {
  // For Vercel deployments
  const isProduction = process.env.NODE_ENV === 'production';
  const vercelUrl = process.env.VERCEL_URL;
  
  let baseUrl = 'http://localhost:3000'; // Default for development
  
  if (isProduction && vercelUrl) {
    baseUrl = `https://${vercelUrl}`;
  } else if (process.env.NEXT_PUBLIC_BASE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  const res = await fetch(`${baseUrl}/api/rails`, { cache: "no-store" });
  const rails = await res.json();

  const sortedRails = rails.sort((a, b) => Number(a.rail_pos) - Number(b.rail_pos));

  return <RailRenderer rails={sortedRails} />;
}