"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function CreateIncident() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    service: "Backend",
    severity: "SEV1",
    status: "Open",
    owner: "",
    summary: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/");
  };

  return (
    <div>
      <Header />

      <div className="p-6 max-w-xl space-y-3">
        <h2 className="text-lg font-semibold">Create Incident</h2>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange}
          className="border p-2 w-full text-black" />

        <select name="service" value={form.service} onChange={handleChange}
          className="border p-2 w-full text-black">
          <option>Backend</option>
          <option>Database</option>
          <option>Frontend</option>
        </select>

        <select name="severity" value={form.severity} onChange={handleChange}
          className="border p-2 w-full text-black">
          <option>SEV1</option>
          <option>SEV2</option>
          <option>SEV3</option>
          <option>SEV4</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}
          className="border p-2 w-full text-black">
          <option>Open</option>
          <option>Resolved</option>
          <option>Mitigated</option>
        </select>

        <input name="owner" placeholder="Owner" value={form.owner} onChange={handleChange}
          className="border p-2 w-full text-black" />

        <textarea name="summary" placeholder="Summary" value={form.summary} onChange={handleChange}
          className="border p-2 w-full text-black" />

        <button onClick={handleSubmit}
          className="bg-gray-800 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>
    </div>
  );
}
