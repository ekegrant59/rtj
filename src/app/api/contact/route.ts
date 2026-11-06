import { NextRequest, NextResponse } from "next/server";
import { contactSchema, getContactFieldErrors } from "@/lib/contactValidation";
import { saveInquiry } from "@/lib/storage";

const MAX_BODY_BYTES = 32 * 1024;

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ success: false, message: "Please submit the contact form as JSON." }, { status: 415 });
  }
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, message: "Your message is too large. Please shorten it and try again." }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, message: "Your message is too large. Please shorten it and try again." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, message: "The form could not be read. Please try again." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors = getContactFieldErrors(result.error);
    const message = errors.honeypot || "Please correct the errors in the form.";
    return NextResponse.json({ success: false, message, errors: errors.honeypot ? undefined : errors }, { status: 400 });
  }

  try {
    const { name, email, company, services, budget, message } = result.data;
    const saved = await saveInquiry({ name, email, company, services, budget, message });
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. Your inquiry has been received.",
      inquiryId: saved.id,
    }, { status: 201 });
  } catch (error) {
    console.error("Contact inquiry could not be saved:", (error as NodeJS.ErrnoException).code || "storage error");
    return NextResponse.json({ success: false, message: "We couldn't save your message. Please try again or email us directly." }, { status: 503 });
  }
}
