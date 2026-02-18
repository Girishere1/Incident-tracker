"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Incident = {
  id: number;
  title: string;
  severity: string;
  service: string;
  status: string;
  createdAt: string;
  owner?: string;
};

export default function IncidentTable({
  service,
  status,
  search,
}: {
  service: string;
  status: string;
  search: string;
}) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (service !== "All") params.append("service", service);
        if (status !== "All") params.append("status", status);
        if (search.trim() !== "") params.append("search", search);

        const res = await fetch(`/api/incidents?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data = await res.json();
        setIncidents(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [service, status, search]);

  if (loading) return <p>Loading incidents...</p>;

  if (incidents.length === 0) return <p>No incidents found.</p>;

  return (
    <div className="border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Severity</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Owner</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((i) => (
            <tr key={i.id} className="hover:bg-gray-50">
              <td className="p-2 border text-blue-600 underline">
              <Link href={`/incidents/${i.id}`}>{i.title}</Link>

              </td>
              <td className="p-2 border">{i.severity}</td>
              <td className="p-2 border">{i.service}</td>
              <td className="p-2 border">{i.status}</td>
              <td className="p-2 border">
                {new Date(i.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">{i.owner || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
