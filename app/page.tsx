import RailRenderer from "./components/RailRenderer";

export default async function HomePage() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rails`, {
      cache: "no-store",
    });

    // Handle failed API
    if (!res.ok) {
      return (
        <main className="p-8">
          <h1 className="text-red-600 text-xl">
            Failed to load rails. Check API.
          </h1>
        </main>
      );
    }

    const rails = await res.json();

    return (
      <main className="min-h-screen">
        {rails.length === 0 && (
          <p className="p-8 text-center text-xl text-gray-600">
            No rails added yet — add from Admin Panel.
          </p>
        )}

        {rails.map((rail) => (
          <RailRenderer key={rail._id} rail={rail} />
        ))}
      </main>
    );
  } catch (err) {
    console.error("HOME PAGE ERROR:", err);

    return (
      <main className="p-8">
        <h1 className="text-xl text-red-600">
          Frontend crashed. Check console for error.
        </h1>
      </main>
    );
  }
}
