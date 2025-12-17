import axiosInstance from "@/lib/axiosInstance";

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (
  payload: ContactPayload
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post("/contact/send", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to send message"
    );
  }
};
