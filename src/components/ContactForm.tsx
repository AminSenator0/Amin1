"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { MagneticWrapper } from "@/components/MagneticWrapper";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim() || data.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Please enter a valid email";
    if (!data.message.trim() || data.message.length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setStatus("loading");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  const inputStyle = (field: keyof FormData): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${
      errors[field]
        ? "var(--error-background-strong, #ef4444)"
        : "var(--neutral-alpha-medium)"
    }`,
    padding: "16px 4px 12px",
    fontSize: "16px",
    color: "var(--neutral-on-background-strong)",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease",
    position: "relative",
    zIndex: 1,
  });

  const labelStyle = (field: keyof FormData, value: string): React.CSSProperties => ({
    position: "absolute",
    left: "4px",
    top: value ? "0px" : "16px",
    fontSize: value ? "12px" : "16px",
    color: errors[field]
      ? "var(--error-background-strong, #ef4444)"
      : "var(--neutral-on-background-weak)",
    transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
    pointerEvents: "none",
    zIndex: 0,
  });

  if (status === "success") {
    return (
      <GlassCard style={{ textAlign: "center", padding: "56px 32px" }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--positive-background-strong, #10b981)",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--neutral-on-background-strong)",
            }}
          >
            Message Sent!
          </h3>
          <p style={{ color: "var(--neutral-on-background-weak)", fontSize: "15px" }}>
            Thanks for reaching out. I will get back to you soon.
          </p>
        </motion.div>
      </GlassCard>
    );
  }

  return (
    <GlassCard style={{ padding: "40px 32px" }}>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "32px", position: "relative" }}>
          <label htmlFor="name" style={labelStyle("name", form.name)}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={inputStyle("name")}
            autoComplete="name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  color: "var(--error-background-strong, #ef4444)",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ marginBottom: "32px", position: "relative" }}>
          <label htmlFor="email" style={labelStyle("email", form.email)}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={inputStyle("email")}
            autoComplete="email"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  color: "var(--error-background-strong, #ef4444)",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ marginBottom: "40px", position: "relative" }}>
          <label htmlFor="message" style={labelStyle("message", form.message)}>
            Your Message
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            style={{
              ...inputStyle("message"),
              resize: "vertical",
              minHeight: "120px",
              paddingTop: "20px",
            }}
            rows={4}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  color: "var(--error-background-strong, #ef4444)",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {errors.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MagneticWrapper strength={0.25}>
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              background: "var(--brand-background-strong)",
              color: "var(--brand-on-background-strong)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: status === "loading" ? "wait" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              transition: "opacity 0.3s ease",
              fontFamily: "inherit",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {status === "loading" ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </MagneticWrapper>
      </form>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </GlassCard>
  );
}