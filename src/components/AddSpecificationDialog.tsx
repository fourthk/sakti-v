import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSpecificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (specification: string, value: string) => void;
}

const AddSpecificationDialog = ({ open, onOpenChange, onAdd }: AddSpecificationDialogProps) => {
  const [specification, setSpecification] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (specification && value) {
      onAdd(specification, value);
      setSpecification("");
      setValue("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Spesifikasi</DialogTitle>
          <DialogDescription>
            Masukkan detail spesifikasi aset
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="specification">Specification</Label>
            <Input
              id="specification"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              placeholder="Contoh: CPU"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Contoh: Intel Core i7"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} className="bg-[#384E66] hover:bg-[#2F4256]">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSpecificationDialog;
