import { updateSupportQueryStatus } from "@/app/api/support";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: (updated?: boolean) => void;
  query: any;
}

export default function UpdateStatusModal({ open, onClose, query }: Props) {
  const { toast } = useToast();
  const [status, setStatus] = useState(query.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateSupportQueryStatus(query._id, status);
      if (res?.success) {
        toast({
          title: "Status updated ✅",
          description:
            res?.message || "Support query status updated successfully",
        });
        onClose(true);
      }
    } catch (err: any) {
      toast({
        title: "Failed to update ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Support Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full bg-emerald-600 text-white"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
