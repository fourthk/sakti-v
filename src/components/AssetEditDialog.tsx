import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AssetEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: {
    bmdId: string;
    nama: string;
    serialNumber: string;
    kategori: string;
    subKategori: string;
    lokasi: string;
    pic: string;
    vendor: string;
    dinas: string;
    tanggalDiperoleh: string;
    nilaiAset: number;
    kondisi: string;
    urlTerkait?: string;
    fileTerkait?: string;
    catatan?: string;
  };
}

const AssetEditDialog = ({ open, onOpenChange, asset }: AssetEditDialogProps) => {
  const [kategori, setKategori] = useState(asset.kategori);
  const [subKategori, setSubKategori] = useState(asset.subKategori);

  const kategoriOptions = ["Server", "Laptop", "Network", "Storage"];
  
  const subKategoriMap: Record<string, string[]> = {
    "Server": ["Physical Server", "Virtual Server", "Blade Server"],
    "Laptop": ["Business Laptop", "Gaming Laptop", "Ultrabook"],
    "Network": ["Router", "Switch", "Firewall"],
    "Storage": ["NAS", "SAN", "External Drive"]
  };

  const handleKategoriChange = (value: string) => {
    setKategori(value);
    setSubKategori("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ubah Aset</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ID BMD</Label>
              <Input value={asset.bmdId} disabled className="bg-muted" />
            </div>
            <div>
              <Label>Nama</Label>
              <Input value={asset.nama} disabled className="bg-muted" />
            </div>
          </div>

          <div>
            <Label>Serial Number</Label>
            <Input value={asset.serialNumber} disabled className="bg-muted" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Kategori</Label>
              <Select value={kategori} onValueChange={handleKategoriChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {kategoriOptions.map((kat) => (
                    <SelectItem key={kat} value={kat}>{kat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sub Kategori</Label>
              <Select value={subKategori} onValueChange={setSubKategori}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih sub kategori" />
                </SelectTrigger>
                <SelectContent>
                  {(subKategoriMap[kategori] || []).map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Lokasi</Label>
              <Input defaultValue={asset.lokasi} />
            </div>
            <div>
              <Label>PIC</Label>
              <Input defaultValue={asset.pic} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Vendor</Label>
              <Input defaultValue={asset.vendor} />
            </div>
            <div>
              <Label>Dinas</Label>
              <Input defaultValue={asset.dinas} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tanggal Diperoleh</Label>
              <Input value={asset.tanggalDiperoleh} disabled className="bg-muted" />
            </div>
            <div>
              <Label>Nilai Aset</Label>
              <Input type="number" defaultValue={asset.nilaiAset} />
            </div>
          </div>

          <div>
            <Label>Kondisi</Label>
            <Select defaultValue={asset.kondisi}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baik">Baik</SelectItem>
                <SelectItem value="Rusak Ringan">Rusak Ringan</SelectItem>
                <SelectItem value="Rusak Berat">Rusak Berat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>URL Terkait</Label>
            <Input type="url" defaultValue={asset.urlTerkait} placeholder="https://example.com" />
          </div>

          <div>
            <Label>File Terkait</Label>
            <Input type="file" accept="image/*,.pdf" />
          </div>

          <div>
            <Label>Catatan</Label>
            <Textarea defaultValue={asset.catatan} rows={4} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button className="bg-[#384E66] hover:bg-[#2F4256]">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetEditDialog;
