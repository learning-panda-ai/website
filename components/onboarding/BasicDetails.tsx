"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface BasicDetailsData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
}

interface BasicDetailsProps {
  data: BasicDetailsData;
  onChange: (data: BasicDetailsData) => void;
}

export default function BasicDetails({ data, onChange }: BasicDetailsProps) {
  const update = (field: keyof BasicDetailsData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const allFilled =
    data.firstName.trim() !== "" &&
    data.lastName.trim() !== "" &&
    data.city.trim() !== "" &&
    data.state.trim() !== "" &&
    data.parentName.trim() !== "" &&
    data.parentMobile.trim() !== "" &&
    data.parentEmail.trim() !== "";

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
        {allFilled && (
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

        {/* City & State */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="panda-label">City / Town</label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="e.g. Mumbai"
              className="panda-input"
            />
          </div>
          <div>
            <label className="panda-label">State</label>
            <input
              type="text"
              value={data.state}
              onChange={(e) => update("state", e.target.value)}
              placeholder="e.g. Maharashtra"
              className="panda-input"
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
              className="panda-input"
            />
          </div>
          <div>
            <label className="panda-label">Parent Email</label>
            <input
              type="email"
              value={data.parentEmail}
              onChange={(e) => update("parentEmail", e.target.value)}
              placeholder="e.g. parent@email.com"
              className="panda-input"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
