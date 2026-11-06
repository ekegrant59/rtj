"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/Button";
import PillButton from "@/components/PillButton";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS } from "@/data/site";
import { CONTACT_SERVICES, contactSchema, getContactFieldErrors, type ContactFieldErrors, type ContactFormData } from "@/lib/contactValidation";
import type { ContactApiResponse } from "@/types/contact";
import styles from "./contact.module.css";

const emptyForm = (): ContactFormData => ({ name: "", email: "", company: "", services: [], message: "", honeypot: "" });

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (successMessage) successRef.current?.focus();
    else if (generalError) {
      const invalidField = formRef.current?.querySelector<HTMLElement>('input[aria-invalid="true"], textarea[aria-invalid="true"], [role="group"][data-invalid="true"] button');
      (invalidField || errorRef.current)?.focus();
    }
  }, [generalError, successMessage]);

  function clearFieldError(name: keyof ContactFormData) {
    setFieldErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    clearFieldError(name as keyof ContactFormData);
  }

  function toggleService(service: ContactFormData["services"][number]) {
    setFormData((previous) => ({
      ...previous,
      services: previous.services.includes(service) ? previous.services.filter((item) => item !== service) : [...previous.services, service],
    }));
    clearFieldError("services");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    setGeneralError("");
    setFieldErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors = getContactFieldErrors(result.error);
      setFieldErrors(errors);
      setGeneralError(errors.honeypot || "Please correct the highlighted fields.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(15000),
      });
      const data: ContactApiResponse | null = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) {
        if (data?.errors && typeof data.errors === "object") setFieldErrors(data.errors);
        setGeneralError(typeof data?.message === "string" ? data.message : "We couldn't send your message. Please try again or email us directly.");
        return;
      }
      setFormData(emptyForm());
      setSuccessMessage(data.message || "Thank you. Your inquiry has been received.");
    } catch (error) {
      setGeneralError(error instanceof DOMException && error.name === "TimeoutError"
        ? "The request timed out. Please try again or email us directly."
        : "Couldn't connect. Your details are still here—please try again or email us directly.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <main id="main-content" className={styles.contactPage}>
      <div className={`container ${styles.splitGrid}`}>
        <div className={styles.leftCol}>
          <span className={styles.eyebrow}>CONTACT</span>
          <div className={styles.titleWrapper}>
            <h1 className={styles.heroTitle}>Say hello</h1>
            <span className={styles.titleDot} aria-hidden="true" />
          </div>
          <p className={styles.leadText}>Tell us about your project. We reply within one working day.</p>
          <div className={styles.contactInfoGroup}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>EMAIL</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.infoValue}>{CONTACT_EMAIL}</a>
            </div>
            {CONTACT_PHONE && <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>PHONE</span>
              <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className={styles.infoValue}>{CONTACT_PHONE}</a>
            </div>}
            {SOCIAL_LINKS.length > 0 && <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>FOLLOW</span>
              <div className={styles.socials}>
                {SOCIAL_LINKS.map(({ href, label }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>{label}</a>)}
              </div>
            </div>}
          </div>
        </div>
        <div>
          {successMessage ? (
            <div ref={successRef} className={styles.successBanner} role="status" tabIndex={-1}>
              <h2>Message received</h2>
              <p>{successMessage}</p>
              <button type="button" className={`btn-underline ${styles.resetButton}`} onClick={() => {
                setSuccessMessage("");
                requestAnimationFrame(() => document.getElementById("contact-name")?.focus());
              }}>Send another message →</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form} aria-label="Contact form" aria-busy={isSubmitting} noValidate>
              {generalError && <div ref={errorRef} className={styles.errorBanner} role="alert" tabIndex={-1}>
                <p>{generalError}</p>
                <a href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a>
              </div>}
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <ContactField name="name" label="Your name" value={formData.name} error={fieldErrors.name} onChange={handleChange} autoComplete="name" maxLength={100} required disabled={isSubmitting} />
              <ContactField name="email" label="Your email" type="email" value={formData.email} error={fieldErrors.email} onChange={handleChange} autoComplete="email" maxLength={120} required disabled={isSubmitting} />
              <ContactField name="company" label="Company" value={formData.company || ""} error={fieldErrors.company} onChange={handleChange} autoComplete="organization" maxLength={100} disabled={isSubmitting} />
              <div className={styles.servicesWrapper} role="group" aria-labelledby="contact-services-label" data-invalid={Boolean(fieldErrors.services)} aria-describedby={fieldErrors.services ? "contact-services-error" : undefined}>
                <span id="contact-services-label" className={styles.servicesLabel}>What do you need help with?</span>
                <div className={styles.pillsRow}>
                  {CONTACT_SERVICES.map((service) => <PillButton key={service} selected={formData.services.includes(service)} onClick={() => toggleService(service)} disabled={isSubmitting}>{service}</PillButton>)}
                </div>
                {fieldErrors.services && <span id="contact-services-error" className={styles.fieldError}>{fieldErrors.services}</span>}
              </div>
              <ContactField name="message" label="Tell us about your project" value={formData.message} error={fieldErrors.message} onChange={handleChange} maxLength={3000} required disabled={isSubmitting} />
              <Button type="submit" disabled={isSubmitting} className={styles.submitBtn}>{isSubmitting ? "Sending..." : "Send message"}</Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

interface ContactFieldProps {
  name: "name" | "email" | "company" | "message";
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
  maxLength: number;
  required?: boolean;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function ContactField({ label, error, type = "text", ...props }: ContactFieldProps) {
  const id = `contact-${props.name}`;
  const common = { ...props, id, placeholder: label, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined };
  return <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.visuallyHidden}>{label}</label>
    {props.name === "message" ? <textarea {...common} rows={3} className={styles.textareaUnderline} /> : <input {...common} type={type} className={styles.inputUnderline} />}
    {error && <span id={`${id}-error`} className={styles.fieldError}>{error}</span>}
  </div>;
}
