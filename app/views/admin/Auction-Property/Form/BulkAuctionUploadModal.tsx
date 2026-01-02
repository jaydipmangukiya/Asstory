"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // your axios instance
import { bulkUploadAuctionProperties } from "@/app/api/auctionProperty";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BulkAuctionUploadModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const resetState = () => {
    setFile(null);
    setResult(null);
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith(".xls") && !selected.name.endsWith(".xlsx")) {
      toast({
        title: "Invalid file",
        description: "Only Excel (.xls, .xlsx) files allowed",
        variant: "destructive",
      });
      return;
    }

    setFile(selected);
    setResult(null); // reset old results
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please choose an Excel file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("excelFile", file);

      const res = await bulkUploadAuctionProperties(formData);

      setResult(res.results);
      if (res.results.failed === 0) {
        toast({
          title: "Bulk upload successful",
          description: `${res.results.success} properties uploaded successfully`,
        });

        onSuccess();
        resetState();
        onClose();
      }
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetState();
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Upload Auction Properties</DialogTitle>
        </DialogHeader>

        {/* FILE INPUT */}
        <div className="space-y-3">
          <Input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Excel
              </>
            )}
          </Button>
        </div>

        {/* RESULT SUMMARY */}
        {result && (
          <div className="mt-4 rounded border p-3 text-sm space-y-1">
            <p>Total Rows: {result.total}</p>
            <p className="text-green-600">Inserted: {result.success}</p>
            <p className="text-yellow-600">Duplicates: {result.duplicate}</p>
            <p className="text-red-600">Failed: {result.failed}</p>
          </div>
        )}

        {/* FAILED ROW DETAILS */}
        {result?.failedRows?.length > 0 && (
          <div className="mt-3 max-h-56 overflow-y-auto border rounded">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Row</th>
                  <th className="p-2 text-left">Error Reason</th>
                </tr>
              </thead>
              <tbody>
                {result.failedRows.map((row: any, idx: number) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">Row {row.row}</td>
                    <td className="p-2 text-red-600">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => handleDialogChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
