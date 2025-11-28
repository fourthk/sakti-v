import TableWithSearch from "@/components/TableWithSearch";
import { useNavigate } from "react-router-dom";

const DaftarLaporanPerubahan = () => {
  const navigate = useNavigate();

  const changes = [
    {
      id: "CR-001",
      katalog: "Infrastructure",
      subKatalog: "Server",
      nama: "Update Server Configuration",
      status: "Approved",
      skor: 87,
      tanggalDiterima: "2025-01-15",
    },
    {
      id: "CR-002",
      katalog: "Network",
      subKatalog: "Switch",
      nama: "Network Switch Upgrade",
      status: "Scheduled",
      skor: 75,
      tanggalDiterima: "2025-01-18",
    },
    {
      id: "CR-003",
      katalog: "Application",
      subKatalog: "Web Service",
      nama: "Deploy New Application",
      status: "Implementing",
      skor: 92,
      tanggalDiterima: "2025-01-20",
    },
  ];

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Submitted: "bg-blue-100 text-blue-800",
      Reviewed: "bg-purple-100 text-purple-800",
      Revision: "bg-red-100 text-red-800",
      Approved: "bg-green-100 text-green-800",
      Scheduled: "bg-cyan-100 text-cyan-800",
      Implementing: "bg-orange-100 text-orange-800",
      Completed: "bg-emerald-100 text-emerald-800",
      Failed: "bg-red-200 text-red-900",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Daftar Laporan Perubahan</h1>

      <TableWithSearch searchPlaceholder="Cari laporan...">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#384E66] text-white">
                <th className="px-4 py-4 text-left font-semibold text-sm">CR ID</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Katalog</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Sub Katalog</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Nama Aset</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Status</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Skor</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Tanggal Diterima</th>
                <th className="px-4 py-4 text-left font-semibold text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr key={change.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-4 text-foreground font-medium text-sm">{change.id}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.katalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.subKatalog}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.nama}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(change.status)}`}>
                      {change.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-foreground font-semibold text-sm">{change.skor}</td>
                  <td className="px-4 py-4 text-foreground text-sm">{change.tanggalDiterima}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => navigate(`/change-management/detail/${change.id}`)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableWithSearch>
    </div>
  );
};

export default DaftarLaporanPerubahan;
