"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header";

type Incident = {
  id: number;
  title: string;
  service: string;
  severity: string;
  status: string;
  owner?: string;
  summary?: string;
};

export default function IncidentDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchIncident = async () => {
      try {
        const res = await fetch(`/api/incidents/${id}`);

        if (!res.ok) {
          console.error("API error:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setIncident(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!incident) return;
    setIncident({
      ...incident,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await fetch(`/api/incidents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: incident?.title,
        service: incident?.service,
        severity: incident?.severity,
        status: incident?.status,
        summary: incident?.summary,
      }),
    });

    alert("Incident updated!");
    router.push("/");
  };

  if (loading) return <p>Loading...</p>;
  if (!incident) return <p>Incident not found</p>;

  return (
    <div>
      <Header />

      <div className="p-6 max-w-xl space-y-3">
        <h2 className="text-lg font-semibold">{incident.title}</h2>
        <div>
          <input name="title" placeholder="Title" value={incident.title} onChange={handleChange}
            className="border p-2 w-full text-black" />

        </div>

        <div>
          <label>Service</label>
          <select
            name="service"
            value={incident.service}
            onChange={handleChange}
            className="border p-2 w-full text-black"
          >
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Frontend">Frontend</option>
          </select>
        </div>

        <div>
          <label>Severity</label>
          <select name="severity" value={incident.severity} onChange={handleChange} className="border p-2 w-full">
            <option>SEV1</option>
            <option>SEV2</option>
            <option>SEV3</option>
            <option>SEV4</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={incident.status} onChange={handleChange} className="border p-2 w-full">
            <option>Open</option>
            <option>Resolved</option>
            <option>Mitigated</option>
          </select>
        </div>

        <div>
          <label>Assigned To</label>
          <input value={incident.owner || ""} readOnly className="border p-2 w-full bg-gray-100" />
        </div>

        <div>
          <label>Summary</label>
          <textarea name="summary" value={incident.summary || ""} onChange={handleChange} rows={4} className="border p-2 w-full" />
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} className="bg-gray-700 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button onClick={() => router.push("/")} className="border px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
