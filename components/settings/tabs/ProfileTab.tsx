"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle2, Camera, Star } from "lucide-react";
import { tabAnim } from "@/lib/animations/settings";
import { ALL_GRADES, COURSE_CATEGORIES } from "@/data/settings";
import type { UserProp } from "@/types/settings";

export default function ProfileTab({ user }: { user: UserProp }) {
  const [form, setForm] = useState({
    firstName:    user.firstName    ?? "",
    lastName:     user.lastName     ?? "",
    city:         user.city         ?? "",
    state:        user.state        ?? "",
    grade:        user.grade        ?? "",
    schoolBoard:  user.schoolBoard  ?? "",
    parentName:   user.parentName   ?? "",
    parentMobile: user.parentMobile ?? "",
    parentEmail:  user.parentEmail  ?? "",
    about:        "",
  });
  const [courses, setCourses] = useState<string[]>(user.courses);
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved]    = useState(false);
  const [error,  setError]    = useState(false);

  const set = (field: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const toggleCourse = (course: string) =>
    setCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );

  const handleSave = async () => {
    setSaving(true);
    setError(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courses }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else setError(true);
    } catch { setError(true); }
    finally { setSaving(false); }
  };

  const displayName = form.firstName
    ? `${form.firstName} ${form.lastName}`.trim()
    : user.name ?? "Learner";

  const gradeLabel = ALL_GRADES.find((g) => g.id === form.grade)?.label;
  const location   = [form.city, form.state].filter(Boolean).join(", ") || null;

  return (
    <motion.div key="profile" {...tabAnim} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Avatar & Rewards ── */}
        <section className="lg:col-span-1 flex flex-col gap-6">

          {/* Avatar card */}
          <div className="bg-[#F5F2EA] p-8 rounded-2xl text-center relative overflow-hidden group">
            <div className="absolute -top-8 -right-8 text-[100px] opacity-[0.06] group-hover:rotate-12 transition-transform duration-500 select-none pointer-events-none">
              🌿
            </div>
            <div className="relative w-32 h-32 mx-auto mb-5">
              <div className="w-full h-full rounded-full bg-[#C8E6C9] border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-[#1B5E20] overflow-hidden">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  displayName[0]?.toUpperCase()
                )}
              </div>
              <button
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#43A047] hover:bg-[#388E3C] text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
                type="button"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <h3
              className="font-bold text-xl text-[#1B5E20]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {displayName}
            </h3>
            <p className="text-xs text-[#44483D]/60 uppercase tracking-widest font-semibold mt-1 mb-5">
              {[location, gradeLabel].filter(Boolean).join(" • ") || "Complete your profile"}
            </p>
            <button
              className="w-full py-3 px-6 bg-[#E8E4D9] hover:bg-[#CFD8DC]/80 text-[#43A047] font-bold rounded-full transition-colors text-sm"
              style={{ fontFamily: "var(--font-fredoka)" }}
              type="button"
            >
              Change Avatar
            </button>
          </div>

          {/* Upcoming rewards */}
          <div className="bg-[#F5F2EA] p-5 rounded-2xl border-l-4 border-amber-400">
            <h4
              className="font-bold text-amber-700 mb-1 flex items-center gap-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <Star className="h-4 w-4" />
              Upcoming Rewards
            </h4>
            <p className="text-sm text-[#44483D]/70">
              {courses.length > 0
                ? "Complete 3 more lessons to unlock the 'Digital Bamboo' badge!"
                : "Add courses and start learning to earn your first badge!"}
            </p>
          </div>
        </section>

        {/* ── Right: Form ── */}
        <section className="lg:col-span-2 flex flex-col gap-6">

          {/* Profile form */}
          <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
            <div className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name">
                  <Input value={form.firstName} onChange={set("firstName")} placeholder="e.g. Aarav" />
                </Field>
                <Field label="Last Name">
                  <Input value={form.lastName} onChange={set("lastName")} placeholder="e.g. Sharma" />
                </Field>
              </div>

              <Field label="Email Address">
                <div className="relative">
                  <Input value={user.email} disabled />
                  <span className="absolute right-4 top-3.5 text-[#75796C] text-sm">🔒</span>
                </div>
                <p className="text-xs text-[#75796C] mt-1.5">Managed by Google — cannot be changed here.</p>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="City / Town">
                  <Input value={form.city} onChange={set("city")} placeholder="e.g. Mumbai" />
                </Field>
                <Field label="State">
                  <Input value={form.state} onChange={set("state")} placeholder="e.g. Maharashtra" />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Current Grade">
                  <SelectInput value={form.grade} onChange={set("grade")}>
                    <option value="">Select grade</option>
                    {ALL_GRADES.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </SelectInput>
                </Field>
                <Field label="Educational Board">
                  <SelectInput value={form.schoolBoard} onChange={set("schoolBoard")}>
                    <option value="">Select board</option>
                    {["CBSE (India)", "ICSE", "IGCSE", "IB", "State Board", "Other"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </SelectInput>
                </Field>
              </div>

              <Field label="About Me">
                <textarea
                  value={form.about}
                  onChange={(e) => set("about")(e.target.value)}
                  placeholder="Share your learning goals..."
                  rows={3}
                  className="w-full bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#43A047]/20 focus:bg-white rounded-xl py-3 px-4 text-[#1B1C17] transition-all placeholder:text-[#75796C] outline-none resize-none"
                />
              </Field>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#43A047]/10">
                {error && <p className="text-sm text-red-500 font-medium self-center">Something went wrong. Please try again.</p>}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                  type="button"
                >
                  {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                  : saved  ? <><CheckCircle2 className="h-4 w-4" /> Saved!</>
                  :          <><Save className="h-4 w-4" /> Save Changes</>}
                </button>
                <button
                  onClick={() => setForm({
                    firstName: user.firstName ?? "", lastName: user.lastName ?? "",
                    city: user.city ?? "", state: user.state ?? "",
                    grade: user.grade ?? "", schoolBoard: user.schoolBoard ?? "",
                    parentName: user.parentName ?? "", parentMobile: user.parentMobile ?? "",
                    parentEmail: user.parentEmail ?? "", about: "",
                  })}
                  className="px-8 py-4 bg-[#E8E4D9] hover:bg-[#CFD8DC]/80 text-[#44483D] font-bold rounded-full transition-colors text-sm"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
            <h3 className="font-bold text-[#1B5E20] text-lg mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
              Enrolled Courses
            </h3>
            <p className="text-sm text-[#44483D]/60 mb-5">
              Select the subjects you want to study — this updates your Ask Panda options.
            </p>
            <div className="space-y-4">
              {COURSE_CATEGORIES.map((cat) => (
                <div key={cat.label}>
                  <p className="text-[11px] font-bold text-[#75796C] uppercase tracking-wider mb-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}>{cat.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.courses.map((course) => {
                      const selected = courses.includes(course);
                      return (
                        <button
                          key={course}
                          type="button"
                          onClick={() => toggleCourse(course)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                            selected
                              ? "bg-[#43A047] border-[#43A047] text-white"
                              : "bg-white border-[#CFD8DC] text-[#44483D] hover:border-[#43A047]/50 hover:text-[#43A047]"
                          }`}
                        >
                          {course}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parent / Guardian */}
          <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
            <h3 className="font-bold text-[#1B5E20] text-lg mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
              Parent / Guardian
            </h3>
            <p className="text-sm text-[#44483D]/60 mb-5">Contact details for your parent or guardian.</p>
            <div className="space-y-4">
              <Field label="Full Name">
                <Input value={form.parentName} onChange={set("parentName")} placeholder="e.g. Priya Sharma" />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Mobile Number">
                  <Input type="tel" value={form.parentMobile} onChange={set("parentMobile")} placeholder="e.g. 9876543210" />
                </Field>
                <Field label="Email Address">
                  <Input type="email" value={form.parentEmail} onChange={set("parentEmail")} placeholder="e.g. parent@email.com" />
                </Field>
              </div>
            </div>
          </div>

        </section>
      </div>
    </motion.div>
  );
}

// ── Shared mini-components ──────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-[#1B5E20] px-1" style={{ fontFamily: "var(--font-fredoka)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", disabled = false }: {
  value: string; onChange?: (v: string) => void;
  placeholder?: string; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#43A047]/20 focus:bg-white rounded-xl py-3 px-4 text-[#1B1C17] transition-all placeholder:text-[#75796C] outline-none disabled:bg-[#E8E4D9]/50 disabled:cursor-not-allowed disabled:text-[#44483D]/60"
    />
  );
}

function SelectInput({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#F5F2EA] border-none focus:ring-2 focus:ring-[#43A047]/20 focus:bg-white rounded-xl py-3 px-4 text-[#1B1C17] transition-all outline-none pr-10"
      >
        {children}
      </select>
      <span className="absolute right-4 top-3.5 pointer-events-none text-[#75796C] text-sm">▾</span>
    </div>
  );
}
