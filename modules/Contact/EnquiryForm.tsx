"use client";

import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().optional(),
    description: z
      .string()
      .min(10, "Please describe your enquiry (min 10 characters)"),
    email: z
      .string()
      .email("Enter a valid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^(\+?61|0)[2-478](\s?\d){8}$/, "Enter a valid AU phone number")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Provide at least an email address or phone number",
    path: ["email"],
  });

type FormValues = z.infer<typeof schema>;

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function EnquiryForm(): JSX.Element {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setSubmitState("submitting");
    try {
      await addDoc(collection(db, "mail"), {
        to: [process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "tanveerfb@proton.me"],
        message: {
          subject: `New Enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
          html: `
            <p><strong>Name:</strong> ${data.name}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
            <p><strong>Description:</strong></p>
            <p>${data.description.replace(/\n/g, "<br>")}</p>
            ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
          `,
        },
        submittedAt: serverTimestamp(),
        formData: {
          name: data.name,
          company: data.company ?? null,
          description: data.description,
          email: data.email ?? null,
          phone: data.phone ?? null,
        },
      });
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="enquiry-success">
        <p className="enquiry-success-msg">
          &gt; Message received. I&apos;ll be in touch soon.
        </p>
        <button
          type="button"
          className="enquiry-btn"
          onClick={() => setSubmitState("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="enquiry-form-title">Send an Enquiry</h2>

      <div className="enquiry-field">
        <label htmlFor="enq-name" className="enquiry-label">
          Name <span aria-hidden>*</span>
        </label>
        <input
          id="enq-name"
          className={`enquiry-input ${errors.name ? "enquiry-input--error" : ""}`}
          type="text"
          autoComplete="name"
          {...register("name")}
        />
        {errors.name && (
          <span className="enquiry-error">{errors.name.message}</span>
        )}
      </div>

      <div className="enquiry-field">
        <label htmlFor="enq-company" className="enquiry-label">
          Company <span className="enquiry-optional">(optional)</span>
        </label>
        <input
          id="enq-company"
          className="enquiry-input"
          type="text"
          autoComplete="organization"
          {...register("company")}
        />
      </div>

      <div className="enquiry-field">
        <label htmlFor="enq-desc" className="enquiry-label">
          What do you need? <span aria-hidden>*</span>
        </label>
        <textarea
          id="enq-desc"
          className={`enquiry-input enquiry-textarea ${errors.description ? "enquiry-input--error" : ""}`}
          rows={4}
          {...register("description")}
        />
        {errors.description && (
          <span className="enquiry-error">{errors.description.message}</span>
        )}
      </div>

      <p className="enquiry-contact-note">
        At least one of the following is required.
      </p>

      <div className="enquiry-row">
        <div className="enquiry-field">
          <label htmlFor="enq-email" className="enquiry-label">
            Email
          </label>
          <input
            id="enq-email"
            className={`enquiry-input ${errors.email ? "enquiry-input--error" : ""}`}
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="enquiry-error">{errors.email.message}</span>
          )}
        </div>

        <div className="enquiry-field">
          <label htmlFor="enq-phone" className="enquiry-label">
            Phone (AU)
          </label>
          <input
            id="enq-phone"
            className={`enquiry-input ${errors.phone ? "enquiry-input--error" : ""}`}
            type="tel"
            autoComplete="tel"
            placeholder="04xx xxx xxx"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="enquiry-error">{errors.phone.message}</span>
          )}
        </div>
      </div>

      {submitState === "error" && (
        <p className="enquiry-error enquiry-error--submit">
          Something went wrong. Try again or reach out directly.
        </p>
      )}

      <button
        type="submit"
        className="enquiry-btn"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
