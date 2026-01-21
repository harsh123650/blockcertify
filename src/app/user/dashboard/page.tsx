"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IconCertificate, IconClipboardCheck } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCertificates: 0,
    totalOrganisations: 0,
    monthlyIssued: [],
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user/dashboard");
      const data = await res.json();
      setStats(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300 mb-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconCertificate size={40} />
          </div>
          <div className="stat-title">Certificates Issued</div>
          <div className="stat-value text-primary">
            {stats.totalCertificates}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconClipboardCheck size={40} />
          </div>
          <div className="stat-title">Organisations</div>
          <div className="stat-value text-secondary">
            {stats.totalOrganisations}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={user?.profileImage} alt="User" />
              </div>
            </div>
          </div>
          <div className="stat-value">Logged In</div>
          <div className="stat-title">{user?.name}</div>
        </div>
      </div>

      <div className="bg-base-200 rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Certificate Issuance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyIssued}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
