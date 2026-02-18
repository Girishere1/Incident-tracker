"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-gray-100 border-b px-6 py-3 flex justify-between items-center">
      <a href="/" className="text-lg font-semibold">Incident Tracker</a>
      <Link
        href="/create"
        className="bg-gray-700 text-white px-4 py-2 rounded text-sm"
      >
        New Incident
      </Link>
    </div>
  );
}
