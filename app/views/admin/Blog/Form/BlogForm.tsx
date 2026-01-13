"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createBlog, getBlogById, updateBlog } from "@/app/api/blog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { blogCategoryOptions } from "@/lib/constant";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blogId?: string | null;
}

const decodeHtmlEntities = (html: string) => {
  if (typeof document === "undefined") return html;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

interface BlogFormValues {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image: File | null;
  isPublished: boolean;
}

const getValidationSchema = () =>
  Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    author: Yup.string().required("Author is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    content: Yup.string()
      .test("not-empty", "Content is required", (value) => {
        if (!value) return false;
        return value.replace(/<(.|\n)*?>/g, "").trim().length > 0;
      })
      .required("Content is required"),
    image: Yup.mixed().nullable(),
  });

const AddEditBlogModal = ({ open, onClose, onSuccess, blogId }: Props) => {
  const { toast } = useToast();
  const isEditMode = !!blogId;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const initialValues: BlogFormValues = {
    title: "",
    category: "",
    author: "",
    excerpt: "",
    content: "",
    image: null,
    isPublished: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          ...values,
          removeExistingImage,
        };
        if (isEditMode && blogId) {
          await updateBlog(blogId, payload);
          toast({
            title: "Updated ✅",
            description: "Blog updated successfully",
          });
        } else {
          await createBlog(payload);
          toast({
            title: "Created ✅",
            description: "Blog created successfully",
          });
        }

        formik.resetForm();
        setImagePreview(null);
        setFileName("");
        onSuccess?.();
        onClose();
      } catch (err: any) {
        toast({
          title: "Failed ❌",
          description:
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
  } = formik;

  useEffect(() => {
    if (isEditMode && blogId && open) {
      const fetchBlog = async () => {
        try {
          setFetching(true);
          const data = await getBlogById(blogId);

          const imageUrl =
            typeof data?.image === "string" ? data.image : data?.image?.url;

          setValues({
            title: data?.title || "",
            category: data?.category || "",
            author: data?.author || "",
            excerpt: data?.excerpt || "",
            content: data?.content ? decodeHtmlEntities(data.content) : "",
            image: null,
            isPublished: data?.isPublished ?? true,
          });

          if (imageUrl) {
            setImagePreview(imageUrl);
            setFileName("Current image");
          }
        } catch (err: any) {
          toast({
            title: "Failed to load blog ❌",
            description: err.message,
            variant: "destructive",
          });
        } finally {
          setFetching(false);
        }
      };

      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId, open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large ❌",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type ❌",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }

      formik.setFieldValue("image", file);
      setRemoveExistingImage(false);
      setFileName(file.name);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
    setFileName("");
    setRemoveExistingImage(true);
  };

  const handleClose = () => {
    resetForm();
    setImagePreview(null);
    setFileName("");
    onClose();
    setRemoveExistingImage(false);
  };

  const RequiredLabel = ({ children }: { children: string }) => (
    <Label className="mb-2 flex gap-1">
      {children}
      <span className="text-red-500">*</span>
    </Label>
  );

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Blog" : "Add Blog"}
          </DialogTitle>
        </DialogHeader>

        {fetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin mr-2 text-emerald-600" />
            <p className="text-slate-600">Loading blog data...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-h-[70vh] overflow-y-auto"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <RequiredLabel>Title</RequiredLabel>
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                />
                {touched.title && errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <RequiredLabel>Category</RequiredLabel>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="border rounded p-2 w-full bg-white"
                >
                  <option value="">Select Category</option>
                  {blogCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {touched.category && errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <RequiredLabel>Author</RequiredLabel>
                <Input
                  name="author"
                  value={values.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />
                {touched.author && errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
              </div>

              <div>
                <Label>Blog Image</Label>
                <div className="space-y-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="cursor-pointer"
                  />
                  {fileName && (
                    <p className="text-sm text-slate-600">File: {fileName}</p>
                  )}
                  {touched.image && errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="border rounded-lg p-4 bg-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Image Preview
                    </p>
                    <div className="relative w-64 h-48 rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Blog preview"
                        fill
                        className="object-cover"
                        sizes="256px"
                        priority
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={loading}
                    className="mt-1 p-1 hover:bg-red-100 rounded transition-colors"
                    title="Remove image"
                  >
                    <X className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Excerpt */}
            <div>
              <RequiredLabel>Excerpt</RequiredLabel>
              <Textarea
                name="excerpt"
                value={values.excerpt}
                onChange={handleChange}
                placeholder="Short blog summary"
              />
              {touched.excerpt && errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <RequiredLabel>Content</RequiredLabel>

              <div className="border rounded-md bg-white">
                <ReactQuill
                  theme="snow"
                  value={values.content}
                  modules={quillModules}
                  formats={quillFormats}
                  onChange={(value) => {
                    formik.setFieldValue("content", value);
                  }}
                  placeholder="Write full blog content here..."
                  style={{
                    height: "200px",
                    marginBottom: "40px",
                    border: "none",
                  }}
                />
              </div>

              {touched.content && errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#003f32] text-white"
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update Blog"
                  : "Add Blog"}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBlogModal;
