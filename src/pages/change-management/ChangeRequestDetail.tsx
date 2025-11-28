import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ChangeRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAffectedOpen, setIsAffectedOpen] = useState(false);

  const changeRequest = {
    crId: id,
    katalog: "Infrastructure",
    subKatalog: "Server",
    bmdId: "BMD-001",
    nama: "Update Server Configuration",
    asetTerdampak: [
      "Server Dell PowerEdge R740 (BMD-001)",
      "Network Switch Cisco Catalyst (BMD-045)",
      "Storage Array NetApp (BMD-089)"
    ],
    catatan: "Perubahan konfigurasi untuk meningkatkan performa dan keamanan server production.",
    skorDampak: 7,
    skorKemungkinan: 5,
    skorRisiko: 35,
    skor: 87,
    estimasiBiaya: "Rp 15.000.000",
    estimasiWaktu: "4 jam",
    hasilInspeksi: null,
    persetujuan: "approved",
    jadwalImplementasi: {
      tanggal: "20 Januari 2025",
      waktu: "14:00 - 18:00"
    }
  };

  const getApprovalStyle = () => {
    switch (changeRequest.persetujuan) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "revision":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getApprovalText = () => {
    switch (changeRequest.persetujuan) {
      case "approved":
        return "Persetujuan Diterima";
      case "pending":
        return "Menunggu Persetujuan";
      case "revision":
        return "Perlu Perbaikan untuk Persetujuan";
      default:
        return "Status Tidak Diketahui";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Detail Change Request</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Informasi Dasar */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Informasi Dasar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">CR ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.crId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Katalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.katalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sub Katalog</label>
              <p className="text-base text-foreground mt-1">{changeRequest.subKatalog}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">BMD ID</label>
              <p className="text-base text-foreground mt-1">{changeRequest.bmdId}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Nama</label>
              <p className="text-base text-foreground mt-1">{changeRequest.nama}</p>
            </div>
          </div>

          <div className="mt-4">
            <Collapsible open={isAffectedOpen} onOpenChange={setIsAffectedOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                Aset Terdampak
                <ChevronDown className={`h-4 w-4 transition-transform ${isAffectedOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                  {changeRequest.asetTerdampak.map((asset, index) => (
                    <li key={index}>{asset}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-muted-foreground">Catatan</label>
            <p className="text-base text-foreground mt-1">{changeRequest.catatan}</p>
          </div>
        </Card>

        {/* Section 2: Hasil Inspeksi */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Hasil Inspeksi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Skor Dampak</label>
              <p className="text-2xl font-bold text-foreground mt-1">{changeRequest.skorDampak}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Skor Kemungkinan</label>
              <p className="text-2xl font-bold text-foreground mt-1">{changeRequest.skorKemungkinan}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Skor Risiko</label>
              <p className="text-2xl font-bold text-foreground mt-1">{changeRequest.skorRisiko}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Skor Total</label>
              <p className="text-2xl font-bold text-primary mt-1">{changeRequest.skor}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Biaya</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimasiBiaya}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Waktu Pengerjaan</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimasiWaktu}</p>
            </div>
          </div>
          {changeRequest.hasilInspeksi && (
            <div className="mt-4">
              <label className="text-sm font-medium text-muted-foreground">Hasil Inspeksi (Foto)</label>
              <div className="mt-2">
                <img src={changeRequest.hasilInspeksi} alt="Hasil Inspeksi" className="max-w-md rounded-lg border border-border" />
              </div>
            </div>
          )}
        </Card>

        {/* Section 3: Persetujuan */}
        <Card className={`p-6 border-2 ${getApprovalStyle()}`}>
          <h2 className="text-xl font-semibold mb-2">Persetujuan</h2>
          <p className="text-lg font-medium">{getApprovalText()}</p>
        </Card>

        {/* Section 4: Jadwal Implementasi */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Jadwal Implementasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tanggal</label>
              <p className="text-base text-foreground mt-1">{changeRequest.jadwalImplementasi.tanggal}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Waktu</label>
              <p className="text-base text-foreground mt-1">{changeRequest.jadwalImplementasi.waktu}</p>
            </div>
          </div>
        </Card>

        {/* Section 5: Action Button */}
        <div className="flex justify-end">
          <Button 
            className="bg-[#384E66] hover:bg-[#2F4256] text-white"
            onClick={() => navigate(`/cmdb/edit/${changeRequest.bmdId}`)}
          >
            Perbarui Data Aset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRequestDetail;
