"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import IncidentTable from "@/app/components/IncidentTable";

export default function Home() {
  const [service, setService] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex gap-3 items-center">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="All">All Services</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="frontend">Frontend</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="Mitigated">Mitigated</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-64 text-sm"
          />
        </div>

        <IncidentTable service={service} status={status} search={search} />
      </div>
    </div>
  );
}
