"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Eye,
  ImageOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import DeleteDialog from "@/components/common/DeleteDialog";

import {
  Blog,
  deleteBlog,
  getBlogs,
  updateBlogPublishStatus,
} from "@/app/api/blog";
import AddEditBlogModal from "./Form/BlogForm";
import ViewBlogModal from "./View/BlogDetails";

const BlogList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState<string | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBlogId, setViewBlogId] = useState<string | null>(null);

  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getBlogs(rowPerPage, skip);
      setBlogs(response.blogs || []);
      setTotalBlogs(response.pagination.totalCount || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load blogs  ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    try {
      await deleteBlog(blogToDelete);
      toast({
        title: "Blog deleted ✅",
      });
      fetchBlogs();
    } catch (err: any) {
      toast({
        title: "Delete failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handlePublishToggle = async (blog: Blog) => {
    setPublishingId(blog._id);
    try {
      await updateBlogPublishStatus(blog._id, !blog.isPublished);
      toast({
        title: blog.isPublished ? "Blog unpublished ❌" : "Blog published ✅",
      });
      fetchBlogs();
    } catch (err: any) {
      toast({
        title: "Status update failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setPublishingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Blog Management
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              setEditBlogId(null);
              setBlogFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </div>

      {/* Blog Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading blogs...</p>
                </div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Users className="h-10 w-10 mb-2" />
                <p>No blogs found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>
                        <div className="h-16 w-24 border rounded overflow-hidden flex items-center justify-center">
                          {blog.image ? (
                            <img
                              src={blog.image.url}
                              alt={blog.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageOff className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {blog.title}
                      </TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          disabled={publishingId === blog._id}
                          onClick={() => handlePublishToggle(blog)}
                          className={
                            blog.isPublished
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          }
                        >
                          {publishingId === blog._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : blog.isPublished ? (
                            "Unpublish"
                          ) : (
                            "Publish"
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setViewBlogId(blog._id);
                              setViewModalOpen(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditBlogId(blog._id);
                              setBlogFormOpen(true);
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => {
                              setBlogToDelete(blog._id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalBlogs}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this Blog? This action cannot be undone."
      />
      {blogFormOpen && (
        <AddEditBlogModal
          open={blogFormOpen}
          blogId={editBlogId}
          onClose={() => setBlogFormOpen(false)}
          onSuccess={fetchBlogs}
        />
      )}
      {viewModalOpen && (
        <ViewBlogModal
          open={viewModalOpen}
          blogId={viewBlogId}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
};
export default BlogList;
