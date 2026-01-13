"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, FileText, Folder, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogById } from "@/app/api/blog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  blogId: string | null;
  onClose: () => void;
}

const ViewBlogModal = ({ open, blogId, onClose }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [blogDetails, setBlogDetails] = useState<any>(null);

  useEffect(() => {
    if (!blogId || !open) return;

    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const data = await getBlogById(blogId);
        setBlogDetails(data);
      } catch (err: any) {
        toast({
          title: "Failed to load blog details ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Blog Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
            <p className="text-slate-600">Loading blog details...</p>
          </div>
        ) : blogDetails ? (
          <div className="space-y-6 text-sm text-slate-800">
            {/* Basic Info */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Title:</span>{" "}
                  {blogDetails.title}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {blogDetails.category}
                </p>
                <p>
                  <span className="font-medium">Author:</span>{" "}
                  {blogDetails.author}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {blogDetails.isPublished ? "Published" : "Draft"}
                </p>
              </div>
            </div>

            {/* Image */}
            {blogDetails.image && (
              <div className="bg-slate-50 rounded-md p-4 border">
                <h3 className="font-semibold text-slate-700 mb-3">
                  Blog Image
                </h3>
                <img
                  src={
                    typeof blogDetails.image === "string"
                      ? blogDetails.image
                      : blogDetails.image.url
                  }
                  alt={blogDetails.title}
                  className="max-h-64 rounded-lg object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Folder className="h-4 w-4 text-blue-600" />
                Excerpt
              </h3>
              <p className="text-slate-700">{blogDetails.excerpt}</p>
            </div>

            {/* Content */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3">Content</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: blogDetails.content,
                }}
              />
            </div>

            {/* Metadata */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(blogDetails.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(blogDetails.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No blog details found.
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBlogModal;
