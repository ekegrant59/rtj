export interface ContactInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget?: string;
  message: string;
  status: "new" | "reviewed" | "archived";
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
  errors?: Record<string, string>;
}
