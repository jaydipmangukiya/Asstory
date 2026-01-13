import axiosInstance from "@/lib/axiosInstance";

export interface ImageData {
  public_id: string;
  url: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  image?: ImageData;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface BlogResponse {
  blogs: Blog[];
  pagination: {
    totalCount: number;
  };
}

/* GET ALL BLOGS */
export const getBlogs = async (
  limit: number,
  skip: number,
  isPublished?: boolean
): Promise<BlogResponse> => {
  try {
    const params: any = { limit, skip };

    if (typeof isPublished !== "undefined") {
      params.isPublished = isPublished;
    }

    const res = await axiosInstance.get("/blogs", { params });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch blogs");
  }
};

/* DELETE BLOG */
export const deleteBlog = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to delete blog");
  }
};

export const createBlog = async (data: any) => {
  try {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof File) {
        // Add file if it exists
        formData.append("file", data[key]);
      } else if (key !== "image") {
        // Add other fields
        formData.append(key, data[key]);
      } else if (typeof data[key] === "string" && data[key]) {
        // Add image URL if it's a string
        formData.append(key, data[key]);
      }
    });

    const res = await axiosInstance.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to create blog");
  }
};

/* UPDATE BLOG */
export const updateBlog = async (id: string, data: any) => {
  try {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof File) {
        // Add file if it exists
        formData.append("file", data[key]);
      } else if (key !== "image") {
        // Add other fields
        formData.append(key, data[key]);
      } else if (typeof data[key] === "string" && data[key]) {
        // Add image URL if it's a string
        formData.append(key, data[key]);
      }
    });

    const res = await axiosInstance.put(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to update blog");
  }
};
/* GET BLOG BY ID */
export const getBlogById = async (id: string): Promise<Blog> => {
  try {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data.blog;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch blog");
  }
};

export const updateBlogPublishStatus = async (
  blogId: string,
  isPublished: boolean
) => {
  const status = isPublished ? "true" : "false";
  try {
    const res = await axiosInstance.put(`/blogs/${blogId}/publish/${status}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to update publish status");
  }
};
