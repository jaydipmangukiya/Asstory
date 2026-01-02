import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface BulkPropertyUploadProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;
  onFileSelect: (file: File | null) => void;
  loading: boolean;
}

const BulkPropertyUpload: React.FC<BulkPropertyUploadProps> = ({
  open,
  onClose,
  onUpload,
  loading,
  onFileSelect,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Bulk Properties</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) =>
              onFileSelect(e.target.files ? e.target.files[0] : null)
            }
            className="w-full text-sm cursor-pointer rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-500 transition p-4 text-center bg-slate-50"
          />

          <Button
            disabled={loading}
            onClick={onUpload}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </>
            )}
          </Button>

          <p className="text-xs text-slate-500">
            Note: File will be processed in background. Please don’t refresh.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkPropertyUpload;
