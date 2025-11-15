export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        <a
          href="/admin/rails/new"
          className="block p-4 bg-green-600 text-white rounded text-center"
        >
          ➕ Create New Rail
        </a>

        <a
          href="/admin/rails"
          className="block p-4 bg-blue-600 text-white rounded text-center"
        >
          📋 Manage Rails
        </a>
      </div>
    </div>
  );
}
