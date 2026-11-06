import { z } from "zod";

export const CONTACT_SERVICES = ["Marketing", "Design", "Development", "Not sure yet"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)").max(100, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(120, "Email is too long"),
  company: z.string().trim().max(100, "Company name is too long").optional(),
  services: z.array(z.enum(CONTACT_SERVICES, { error: "Please choose one of the listed services" }))
    .min(1, "Please select at least one service of interest")
    .max(CONTACT_SERVICES.length, "Please choose from the listed services")
    .transform((services) => [...new Set(services)]),
  budget: z.string().trim().max(100, "Budget is too long").optional(),
  message: z.string().trim().min(10, "Please provide some project details (at least 10 characters)").max(3000, "Message cannot exceed 3000 characters"),
  honeypot: z.string().max(0, "Unable to submit this form. Please email us directly.").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function getContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof ContactFormData | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}
