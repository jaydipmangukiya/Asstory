import axiosInstance from "@/lib/axiosInstance";

export interface ValuationReport {
  _id: string;
  name_of_the_customers: string;
  owner_name: string;
  report_date: string;
  case_ref_no: string;
  property_address: string;
  type_of_property: string;
  built_up_area_carpet_area_super_built_up_area: number;
  unit_rate_considered_for_ca_bua_sba: number;
  final_valuation: number;
  is_verified: boolean;
  is_active: boolean;
  createdAt: string;
}

export interface ReportsResponse {
  status: boolean;
  total: number;
  length: number;
  message: string;
  allReport: ValuationReport[];
}

export const getReports = async (
  limit: number = 10,
  skip: number = 0
): Promise<ReportsResponse> => {
  try {
    const response = await axiosInstance.get(
      `/report?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch reports");
  }
};
