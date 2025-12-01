import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, Calendar } from "lucide-react";
import { API_BASE_URL, getAuthToken } from "@/lib/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_reports: 0,
    inspections: 0,
    schedules: 0,
    repairs: 0,
  });

  const [weeklyTrend, setWeeklyTrend] = useState([]);

  const token = getAuthToken();

  // ===============================
  // FETCH SUMMARY
  // ===============================
  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/summary`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Gagal fetch summary");

      setStats({
        total_reports: result.data?.total_reports || 0,
        inspections: result.data?.inspections || 0,
        schedules: result.data?.schedules || 0,
        repairs: result.data?.repairs || 0,
      });

    } catch (error) {
      console.error("SUMMARY ERROR:", error);
    }
  };

  // ===============================
  // FETCH WEEKLY TREND
  // ===============================
  const fetchWeeklyTrend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/weekly-trend`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Gagal fetch trend");

      const mapped = (result.data || []).map((item: any) => ({
        name: item.day || "-",
        Diajukan: item.submitted || 0,
        Disetujui: item.approved || 0,
        Diimplementasi: item.implemented || 0,
      }));

      setWeeklyTrend(mapped);

    } catch (error) {
      console.error("TREND ERROR:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchWeeklyTrend();
  }, []);

  const statsData = [
    {
      label: "Laporan Perubahan Bulan Ini",
      value: stats.total_reports,
      icon: FileText,
    },
    {
      label: "Inspeksi (dalam proses)",
      value: stats.inspections,
      icon: Clock,
    },
    {
      label: "Jadwal Perubahan",
      value: stats.schedules,
      icon: CheckCircle,
    },
    {
      label: "Jadwal Perbaikan",
      value: stats.repairs,
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ==== STAT CARDS ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#2F4256] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858585] mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#263141]">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-[#E4E5E7] rounded-lg">
                <stat.icon size={32} color="#263141" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==== TREND CHART ==== */}
      <div className="bg-white rounded-lg border border-[#2F4256] p-6">
        <h2 className="text-xl font-semibold text-[#263141] mb-2">
          Tren Mingguan
        </h2>
        <p className="text-sm text-[#858585] mb-6">
          Laporan yang Diajukan / Disetujui / Diimplementasi
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E5E7" />
            <XAxis dataKey="name" tick={{ fill: "#263141" }} />
            <YAxis tick={{ fill: "#263141" }} />

            <Tooltip />
            <Legend />

            <Bar dataKey="Diajukan" fill="#384e66" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Disetujui" fill="#5a7a9f" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Diimplementasi" fill="#8fa5c1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
