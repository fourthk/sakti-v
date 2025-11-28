import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info, Check } from "lucide-react";
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
      { bmdId: "BMD-001", nama: "Server Dell PowerEdge R740" },
      { bmdId: "BMD-045", nama: "Network Switch Cisco Catalyst" },
      { bmdId: "BMD-089", nama: "Storage Array NetApp" },
    ],
    catatan: "Perubahan konfigurasi untuk meningkatkan performa dan keamanan server production.",
    idInspeksi: "INS-2024-001",
    tanggalInspeksi: "2024-01-16",
    hasilInspeksiText: "Perlu dilakukan update sistem operasi dan patch keamanan",
    skorDampak: 7,
    skorKemungkinan: 6,
    skorExposure: 8,
    skorRisiko: 42,
    estimasiBiaya: "Rp 5.000.000",
    estimasiWaktu: "4 jam",
    hasilInspeksi: null,
    currentStatus: "Approved",
    jadwalImplementasi: {
      tanggal: "20 Januari 2025",
      waktu: "14:00 - 18:00"
    }
  };

  const statusSteps = [
    { key: "Submitted", label: "Submitted" },
    { key: "Reviewed", label: "Reviewed" },
    { key: "Revision", label: "Revision" },
    { key: "Approved", label: "Approved" },
    { key: "Scheduled", label: "Scheduled" },
    { key: "Implementing", label: "Implementing" },
    { key: "Completed", label: "Completed" },
    { key: "End", label: "End" },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === changeRequest.currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

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

          {/* Aset Terdampak - Collapsible Table */}
          <div className="mt-4">
            <Collapsible open={isAffectedOpen} onOpenChange={setIsAffectedOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                Aset Terdampak ({changeRequest.asetTerdampak.length})
                <ChevronDown className={`h-4 w-4 transition-transform ${isAffectedOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">BMD ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-foreground">Nama Aset</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeRequest.asetTerdampak.map((asset, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-4 py-2 text-sm text-foreground">{asset.bmdId}</td>
                          <td className="px-4 py-2 text-sm text-foreground">{asset.nama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
          
          {/* ID dan Tanggal Inspeksi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID Inspeksi</label>
              <p className="text-base text-foreground mt-1">{changeRequest.idInspeksi}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tanggal Inspeksi</label>
              <p className="text-base text-foreground mt-1">{changeRequest.tanggalInspeksi}</p>
            </div>
          </div>

          {/* Hasil Inspeksi Text */}
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground">Hasil Inspeksi</label>
            <p className="text-base text-foreground mt-1">{changeRequest.hasilInspeksiText}</p>
          </div>

          {/* Skor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Dampak</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorDampak}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Kemungkinan</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorKemungkinan}</p>
            </div>
            <div className="border border-border rounded-lg p-4">
              <label className="text-xs font-medium text-muted-foreground block mb-1">Skor Exposure</label>
              <p className="text-2xl font-bold text-foreground">{changeRequest.skorExposure}</p>
            </div>
            {/* Highlighted Skor Resiko */}
            <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4">
              <label className="text-xs font-medium text-red-600 block mb-1">Skor Resiko (Exposure)</label>
              <p className="text-2xl font-bold text-red-600">{changeRequest.skorRisiko}</p>
            </div>
          </div>

          {/* Estimasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Biaya</label>
              <p className="text-base text-foreground mt-1">{changeRequest.estimasiBiaya}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimasi Pengerjaan</label>
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

        {/* Section 3: Persetujuan - Formal Style */}
        <Card className="p-4 bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Semua perubahan pada desain ini memerlukan persetujuan terpisah.
            </p>
          </div>
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

        {/* Section 5: Status Tracking */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold text-foreground mb-6">Tracking Status</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
            <div 
              className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300"
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div 
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-10
                        ${isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground border-2 border-border'
                        }
                        ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                      `}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span 
                      className={`
                        mt-2 text-xs font-medium text-center max-w-[80px]
                        ${isCompleted ? 'text-primary' : 'text-muted-foreground'}
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChangeRequestDetail;
