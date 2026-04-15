"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

export type { BasicDetailsData } from "@/types/onboarding";
import type { BasicDetailsData } from "@/types/onboarding";
import { INDIAN_STATES } from "@/data/geography";


/* ── Component ── */

interface BasicDetailsProps {
  data: BasicDetailsData;
  onChange: (data: BasicDetailsData) => void;
}

export default function BasicDetails({ data, onChange }: BasicDetailsProps) {
  const update = (field: keyof BasicDetailsData, value: string) => {
    if (field === "state") {
      onChange({ ...data, state: value, city: "" });
    } else {
      onChange({ ...data, [field]: value });
    }
  };

  const phoneClean = data.parentMobile.replace(/[\s\-+()]/g, "");
  const phoneError =
    data.parentMobile.trim() !== "" && !/^\d{10}$/.test(phoneClean);
  const emailError =
    data.parentEmail.trim() !== "" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.parentEmail);

  const allValid =
    data.firstName.trim() !== "" &&
    data.lastName.trim() !== "" &&
    data.state.trim() !== "" &&
    data.city.trim() !== "" &&
    data.parentName.trim() !== "" &&
    data.parentMobile.trim() !== "" &&
    data.parentEmail.trim() !== "" &&
    !phoneError &&
    !emailError;

  const selectClass =
    "panda-input w-full appearance-none cursor-pointer pr-8 bg-white";

  return (
    <motion.section
      key="basic-details"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="rounded-4xl border-2 border-green-200 bg-white/80 p-6 shadow-lg shadow-green-100/40 backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-lg">
          👋
        </span>
        <div>
          <h2
            className="text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Tell us about yourself!
          </h2>
          <p className="text-xs text-green-500 font-medium">
            A few quick details to get started 🌟
          </p>
        </div>
        {allValid && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-green-500"
          >
            <CheckCircle2 className="h-4 w-4 text-white" />
          </motion.span>
        )}
      </div>

      <div className="space-y-4">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="panda-label">First Name</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="e.g. Aarav"
              className="panda-input"
            />
          </div>
          <div>
            <label className="panda-label">Last Name</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="e.g. Sharma"
              className="panda-input"
            />
          </div>
        </div>

        {/* State → City (state first, city depends on state) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              className="mb-1 block text-xs font-bold text-green-700"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              State
            </label>
            <div className="relative">
              <select
                value={data.state}
                onChange={(e) => update("state", e.target.value)}
                className={selectClass}
              >
                <option value="">Select your state…</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
            </div>
          </div>
          <div>
            <label
              className="mb-1 block text-xs font-bold text-green-700"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              City / Town
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Mumbai"
              className="panda-input w-full"
            />
          </div>
        </div>

        {/* Parent Name */}
        <div>
          <label className="panda-label">Parent / Guardian Name</label>
          <input
            type="text"
            value={data.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="panda-input"
          />
        </div>

        {/* Parent Mobile & Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="panda-label">Parent Mobile Number</label>
            <input
              type="tel"
              value={data.parentMobile}
              onChange={(e) => update("parentMobile", e.target.value)}
              placeholder="e.g. 9876543210"
              maxLength={10}
              className={`panda-input w-full ${phoneError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
            />
            {phoneError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500"
              >
                <AlertCircle className="h-3 w-3" />
                Must be exactly 10 digits
              </motion.p>
            )}
          </div>
          <div>
            <label className="panda-label">Parent Email</label>
            <input
              type="email"
              value={data.parentEmail}
              onChange={(e) => update("parentEmail", e.target.value)}
              placeholder="e.g. parent@email.com"
              className={`panda-input w-full ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
            />
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500"
              >
                <AlertCircle className="h-3 w-3" />
                Please enter a valid email address
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
