import axiosInstance from "@/lib/axiosInstance";

export interface SupportResponse {
  success: boolean;
  message: string;
}

export interface SupportPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SupportQuery {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "open" | "resolved";
  createdAt: string;
}

export const createSupportQuery = async (
  payload: SupportPayload
): Promise<SupportResponse> => {
  try {
    const res = await axiosInstance.post("/support", payload);
    return res.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to submit support query"
    );
  }
};

export const getSupportQueries = async (
  limit = 10,
  skip = 0,
  status?: string
): Promise<{ success: boolean; total: number; data: SupportQuery[] }> => {
  try {
    const query = new URLSearchParams({
      limit: String(limit),
      skip: String(skip),
      ...(status ? { status } : {}),
    }).toString();

    const res = await axiosInstance.get(`/support?${query}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch support queries");
  }
};

export const updateSupportQueryStatus = async (
  id: string,
  status: "open" | "resolved"
): Promise<SupportResponse> => {
  try {
    const res = await axiosInstance.put(`/support/${id}/status`, { status });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || "Failed to update support query status"
    );
  }
};
