"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RailsPage() {
  const [rails, setRails] = useState([]);

  useEffect(() => {
    fetch("/api/rails")
      .then((res) => res.json())
      .then((data) => setRails(data));
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Rails</h1>

      <Link
        href="/admin/rails/new"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        ➕ Create New Rail
      </Link>

      <div className="mt-6 space-y-4">

        {rails.map((rail) => (
          <div key={rail._id} className="border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold">
              {rail.rail_name} (Rail {rail.rail_pos})
            </h2>

            <p className="text-sm text-gray-600">
              Items: {rail.rail_items?.length ?? 0}
            </p>

            <div className="mt-3 flex gap-3">
              <Link
                href={`/admin/rails/${rail._id}/edit`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit Rail
              </Link>

              <Link
                href={`/admin/rails/${rail._id}/items`}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Manage Items
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
