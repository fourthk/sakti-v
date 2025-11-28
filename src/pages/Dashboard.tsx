import { FileText, Clock, CheckCircle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const statsData = [
  { 
    label: "Laporan Perubahan Bulan Ini", 
    value: "20", 
    icon: FileText,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Inspeksi (dalam proses)", 
    value: "8", 
    icon: Clock,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Jadwal Perubahan", 
    value: "2", 
    icon: CheckCircle,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
  { 
    label: "Jadwal Perbaikan", 
    value: "0", 
    icon: Calendar,
    bgColor: "#E4E5E7",
    iconColor: "#263141"
  },
];

const chartData = [
  { name: "Senin", Diajukan: 5, Disetujui: 3, Diimplementasi: 2 },
  { name: "Selasa", Diajukan: 6, Disetujui: 4, Diimplementasi: 3 },
  { name: "Rabu", Diajukan: 4, Disetujui: 3, Diimplementasi: 2 },
  { name: "Kamis", Diajukan: 7, Disetujui: 5, Diimplementasi: 4 },
  { name: "Jumat", Diajukan: 8, Disetujui: 6, Diimplementasi: 4 },
  { name: "Sabtu", Diajukan: 3, Disetujui: 2, Diimplementasi: 1 },
  { name: "Minggu", Diajukan: 2, Disetujui: 1, Diimplementasi: 1 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#2F4256] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#858585] mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#263141]">{stat.value}</p>
              </div>
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: stat.bgColor }}
              >
                <stat.icon size={32} style={{ color: stat.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-[#2F4256] p-6">
        <h2 className="text-xl font-semibold text-[#263141] mb-2">Tren Mingguan</h2>
        <p className="text-sm text-[#858585] mb-6">Laporan yang Diajukan / Disetujui / Diimplementasi</p>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E5E7" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: "#263141" }}
              axisLine={{ stroke: "#E4E5E7" }}
            />
            <YAxis 
              tick={{ fill: "#263141" }}
              axisLine={{ stroke: "#E4E5E7" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "white", 
                border: "1px solid #2F4256",
                borderRadius: "8px"
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
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
