import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const BuatJadwal = () => {
  const [selectedRequest, setSelectedRequest] = useState<string>("");

  // Mock data for change requests
  const changeRequests = [
    {
      id: "CR-001",
      bmdId: "BMD-2024-001",
      assetName: "Server Database Utama",
      changeCategory: "Update Hardware",
      totalScore: 85,
      estimatedCost: "Rp 15.000.000",
      estimatedTime: "4 jam",
    },
    {
      id: "CR-002",
      bmdId: "BMD-2024-002",
      assetName: "Router Jaringan Lt.2",
      changeCategory: "Konfigurasi Jaringan",
      totalScore: 72,
      estimatedCost: "Rp 5.000.000",
      estimatedTime: "2 jam",
    },
    {
      id: "CR-003",
      bmdId: "BMD-2024-003",
      assetName: "Aplikasi Monitoring",
      changeCategory: "Update Software",
      totalScore: 68,
      estimatedCost: "Rp 10.000.000",
      estimatedTime: "3 jam",
    },
  ];

  const selectedRequestData = changeRequests.find(
    (req) => req.id === selectedRequest
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-6">Buat Jadwal</h1>

      <div className="bg-card rounded-lg border border-border p-6 max-w-3xl">
        <form className="space-y-6">
          {/* Request ID Selection */}
          <div className="space-y-2">
            <Label htmlFor="requestId">
              Pilih Request ID <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedRequest} onValueChange={setSelectedRequest}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih request yang sudah disetujui" />
              </SelectTrigger>
              <SelectContent>
                {changeRequests.map((request) => (
                  <SelectItem key={request.id} value={request.id}>
                    {request.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Card */}
          {selectedRequestData && (
            <Card className="p-4 bg-background border-border">
              <h3 className="font-semibold text-foreground mb-3">
                Summary Perubahan
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">BMD ID</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.bmdId}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nama Aset</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.assetName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Katalog Perubahan</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.changeCategory}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Skor Total</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.totalScore}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimasi Biaya</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.estimatedCost}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimasi Waktu</p>
                  <p className="font-medium text-foreground">
                    {selectedRequestData.estimatedTime}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="scheduledDate">
              Pilih Tanggal <span className="text-destructive">*</span>
            </Label>
            <Input id="scheduledDate" type="date" className="border-input" />
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">
                Waktu Mulai <span className="text-destructive">*</span>
              </Label>
              <Input id="startTime" type="time" className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">
                Waktu Selesai <span className="text-destructive">*</span>
              </Label>
              <Input id="endTime" type="time" className="border-input" />
            </div>
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              id="notes"
              placeholder="Catatan tambahan (opsional)"
              className="border-input min-h-32"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" className="text-foreground">
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Simpan Jadwal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuatJadwal;
