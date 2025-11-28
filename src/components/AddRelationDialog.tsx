import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddRelationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (relation: {
    bmdId: string;
    nama: string;
    kategori: string;
    subKategori: string;
    relasi: string;
  }) => void;
}

const availableAssets = [
  { bmdId: "BMD-002", nama: "Switch Cisco Catalyst", kategori: "Network", subKategori: "Switch" },
  { bmdId: "BMD-003", nama: "Storage NetApp FAS", kategori: "Storage", subKategori: "SAN" },
  { bmdId: "BMD-004", nama: "Router Juniper MX", kategori: "Network", subKategori: "Router" },
  { bmdId: "BMD-005", nama: "Firewall Palo Alto", kategori: "Security", subKategori: "Firewall" },
];

const relationTypes = [
  { value: "INSTALLED_ON", label: "INSTALLED_ON" },
  { value: "DEPENDS_ON", label: "DEPENDS_ON" },
  { value: "CONNECTED_TO", label: "CONNECTED_TO" },
  { value: "RUNS_ON", label: "RUNS_ON" },
];

const AddRelationDialog = ({ open, onOpenChange, onAdd }: AddRelationDialogProps) => {
  const [selectedBmdId, setSelectedBmdId] = useState("");
  const [relationType, setRelationType] = useState("");

  const selectedAsset = availableAssets.find(a => a.bmdId === selectedBmdId);

  const handleSubmit = () => {
    if (selectedAsset && relationType) {
      onAdd({
        ...selectedAsset,
        relasi: relationType,
      });
      setSelectedBmdId("");
      setRelationType("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Relasi Aset</DialogTitle>
          <DialogDescription>
            Pilih aset dan tipe relasi
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bmdId">BMD ID</Label>
            <Select value={selectedBmdId} onValueChange={setSelectedBmdId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih BMD ID" />
              </SelectTrigger>
              <SelectContent>
                {availableAssets.map((asset) => (
                  <SelectItem key={asset.bmdId} value={asset.bmdId}>
                    {asset.bmdId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAsset && (
            <>
              <div className="grid gap-2">
                <Label>Nama Aset</Label>
                <div className="px-3 py-2 bg-muted rounded-md text-sm">
                  {selectedAsset.nama}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Kategori</Label>
                  <div className="px-3 py-2 bg-muted rounded-md text-sm">
                    {selectedAsset.kategori}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Sub Kategori</Label>
                  <div className="px-3 py-2 bg-muted rounded-md text-sm">
                    {selectedAsset.subKategori}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="grid gap-2">
            <Label htmlFor="relationType">Tipe Relasi</Label>
            <Select value={relationType} onValueChange={setRelationType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe Relasi" />
              </SelectTrigger>
              <SelectContent>
                {relationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-[#384E66] hover:bg-[#2F4256]"
            disabled={!selectedAsset || !relationType}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRelationDialog;
