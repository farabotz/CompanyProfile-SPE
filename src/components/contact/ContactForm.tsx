"use client";

import { useState, type FormEvent } from "react";

interface ContactFormDictionary {
  heading: string;
  notice: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    subject: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    messageRequired: string;
  };
  submitButton: string;
  recipientEmail: string;
}

interface ContactFormProps {
  dict: ContactFormDictionary;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ dict }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = dict.errors.nameRequired;
    if (!form.email.trim()) e.email = dict.errors.emailRequired;
    else if (!EMAIL_RE.test(form.email)) e.email = dict.errors.emailInvalid;
    if (!form.subject.trim()) e.subject = dict.errors.subjectRequired;
    if (!form.message.trim()) e.message = dict.errors.messageRequired;
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${dict.recipientEmail}?subject=${subject}&body=${body}`;
  }

  function copyEmailToClipboard() {
    navigator.clipboard.writeText(dict.recipientEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }

  const inputBase =
    "mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm text-neutral-800 transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-brand-orange/40";
  const inputOk = "border-neutral-200 bg-white focus:border-brand-orange";
  const inputErr = "border-red-400 bg-red-50/50 focus:border-red-400";

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-7 sm:p-9 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-heading text-2xl font-bold text-brand-teal-dark">{dict.heading}</h2>

        {/* Quick copy email pill */}
        <button
          type="button"
          onClick={copyEmailToClipboard}
          className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-brand-orange/10 hover:text-brand-orange-dark transition-all self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
          </svg>
          {copiedEmail ? "Tersalin!" : dict.recipientEmail}
        </button>
      </div>

      {/* Notice */}
      <div className="mt-4 flex items-start gap-3 rounded-xl bg-brand-teal/5 border border-brand-teal/10 px-4 py-3">
        <svg className="mt-0.5 shrink-0 text-brand-teal-dark" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 16v-4M12 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-brand-teal-dark leading-relaxed">{dict.notice}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700">
            {dict.fields.name.label} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={dict.fields.name.placeholder}
            value={form.name}
            onChange={handleChange}
            className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-600 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700">
            {dict.fields.email.label} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={dict.fields.email.placeholder}
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-700">
            {dict.fields.subject.label} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder={dict.fields.subject.placeholder}
            value={form.subject}
            onChange={handleChange}
            className={`${inputBase} ${errors.subject ? inputErr : inputOk}`}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1.5 text-xs text-red-600 font-medium">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700">
            {dict.fields.message.label} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder={dict.fields.message.placeholder}
            value={form.message}
            onChange={handleChange}
            className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-xs text-red-600 font-medium">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-orange-dark hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4l16 8-16 8V4z" fill="currentColor" />
          </svg>
          {dict.submitButton}
        </button>
      </form>
    </div>
  );
}
