"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  User,
  Shield,
  Lock,
  CreditCard,
  BarChart2,
  ChevronLeft,
  Bell,
  LogOut,
  Save,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type Tab = "general" | "account" | "privacy" | "billing" | "usage";

type UserProp = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  state: string | null;
  grade: string | null;
  parentName: string | null;
  parentMobile: string | null;
  parentEmail: string | null;
  courses: string[];
  aiTutor: string | null;
  createdAt: string;
};

// ── Constants ──────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; Icon: React.ElementType; emoji: string }[] = [
  { id: "general",  label: "General",  Icon: User,       emoji: "👤" },
  { id: "account",  label: "Account",  Icon: Shield,     emoji: "🔐" },
  { id: "privacy",  label: "Privacy",  Icon: Lock,       emoji: "🛡️" },
  { id: "billing",  label: "Billing",  Icon: CreditCard, emoji: "💳" },
  { id: "usage",    label: "Usage",    Icon: BarChart2,  emoji: "📊" },
];

const ALL_GRADES = [
  { id: "class-1",  label: "Class 1" },
  { id: "class-2",  label: "Class 2" },
  { id: "class-3",  label: "Class 3" },
  { id: "class-4",  label: "Class 4" },
  { id: "class-5",  label: "Class 5" },
  { id: "class-6",  label: "Class 6" },
  { id: "class-7",  label: "Class 7" },
  { id: "class-8",  label: "Class 8" },
  { id: "class-9",  label: "Class 9" },
  { id: "class-10", label: "Class 10" },
  { id: "class-11", label: "Class 11" },
  { id: "class-12", label: "Class 12" },
  { id: "uni-1",    label: "1st Year Uni" },
  { id: "uni-2",    label: "2nd Year Uni" },
  { id: "uni-3",    label: "3rd Year Uni" },
  { id: "uni-4",    label: "4th Year Uni" },
  { id: "graduate", label: "Graduate" },
  { id: "adult",    label: "Adult Learner" },
  { id: "other",    label: "Other" },
];

// ── Shared UI primitives ───────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-xs font-bold text-green-700 mb-1"
      style={{ fontFamily: "var(--font-fredoka)" }}
    >
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="panda-input w-full disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
    />
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-extrabold text-gray-800 text-lg mb-5"
      style={{ fontFamily: "var(--font-fredoka)" }}
    >
      {children}
    </h2>
  );
}

function SubTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-4">
      <h3
        className="font-extrabold text-gray-800"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        {children}
      </h3>
      {note && <p className="text-xs text-gray-400 mt-0.5">{note}</p>}
    </div>
  );
}

const tabAnim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
  transition: { duration: 0.22 },
};

// ── TAB: General (Profile) ────────────────────────────────────────────────

function GeneralTab({ user }: { user: UserProp }) {
  const [form, setForm] = useState({
    firstName:    user.firstName    ?? "",
    lastName:     user.lastName     ?? "",
    city:         user.city         ?? "",
    state:        user.state        ?? "",
    grade:        user.grade        ?? "",
    parentName:   user.parentName   ?? "",
    parentMobile: user.parentMobile ?? "",
    parentEmail:  user.parentEmail  ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState(false);

  const set = (field: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSave = async () => {
    setSaving(true);
    setError(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : user.name ?? "Learner";

  return (
    <motion.div key="general" {...tabAnim} className="space-y-6">
      {/* Avatar + name */}
      <SectionCard>
        <SectionTitle>Profile</SectionTitle>
        <div className="flex items-center gap-5">
          {user.image ? (
            <img
              src={user.image}
              alt={displayName}
              className="h-20 w-20 rounded-2xl border-2 border-green-200 object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-3xl font-bold text-green-700">
              {displayName[0]}
            </div>
          )}
          <div>
            <p className="font-bold text-gray-800">{displayName}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Profile photo is synced from your Google account
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Personal info */}
      <SectionCard>
        <SubTitle>Personal Information</SubTitle>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>First Name</FieldLabel>
              <TextInput value={form.firstName} onChange={set("firstName")} placeholder="e.g. Aarav" />
            </div>
            <div>
              <FieldLabel>Last Name</FieldLabel>
              <TextInput value={form.lastName} onChange={set("lastName")} placeholder="e.g. Sharma" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>City / Town</FieldLabel>
              <TextInput value={form.city} onChange={set("city")} placeholder="e.g. Mumbai" />
            </div>
            <div>
              <FieldLabel>State</FieldLabel>
              <TextInput value={form.state} onChange={set("state")} placeholder="e.g. Maharashtra" />
            </div>
          </div>
          <div>
            <FieldLabel>Grade / Level</FieldLabel>
            <select
              value={form.grade}
              onChange={(e) => set("grade")(e.target.value)}
              className="panda-input w-full"
            >
              <option value="">Select grade</option>
              {ALL_GRADES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Parent / Guardian */}
      <SectionCard>
        <SubTitle note="Contact details for your parent or guardian">
          Parent / Guardian
        </SubTitle>
        <div className="space-y-4">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <TextInput value={form.parentName} onChange={set("parentName")} placeholder="e.g. Priya Sharma" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Mobile Number</FieldLabel>
              <TextInput
                value={form.parentMobile}
                onChange={set("parentMobile")}
                placeholder="e.g. 9876543210"
                type="tel"
              />
            </div>
            <div>
              <FieldLabel>Email Address</FieldLabel>
              <TextInput
                value={form.parentEmail}
                onChange={set("parentEmail")}
                placeholder="e.g. parent@email.com"
                type="email"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex items-center justify-between">
        {error && (
          <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again.</p>
        )}
        <div className="ml-auto">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-md disabled:opacity-60 text-sm"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {saving ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : saved ? (
              <><CheckCircle2 className="h-4 w-4" /> Saved!</>
            ) : (
              <><Save className="h-4 w-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── TAB: Account ──────────────────────────────────────────────────────────

function AccountTab({ user }: { user: UserProp }) {
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div key="account" {...tabAnim} className="space-y-6">
      <SectionCard>
        <SectionTitle>Account Details</SectionTitle>
        <div className="space-y-5">
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <div className="flex items-center gap-3">
              <TextInput value={user.email} disabled />
              <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Your email is managed by Google and cannot be changed here.
            </p>
          </div>
          <div>
            <FieldLabel>Member Since</FieldLabel>
            <p className="text-sm font-semibold text-gray-700">{memberSince}</p>
          </div>
        </div>
      </SectionCard>

      {/* Connected accounts */}
      <SectionCard>
        <SubTitle>Connected Accounts</SubTitle>
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-xl border border-blue-100 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Google</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            Connected
          </span>
        </div>
      </SectionCard>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <h3
            className="font-extrabold text-red-600"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Danger Zone
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Once you delete your account, all your learning data will be permanently removed.
          This action cannot be undone.
        </p>
        <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-2.5 px-5 rounded-xl transition-all text-sm">
          <AlertTriangle className="h-4 w-4" />
          Delete Account
        </button>
      </div>
    </motion.div>
  );
}

// ── TAB: Privacy ──────────────────────────────────────────────────────────

function PrivacyTab() {
  const [prefs, setPrefs] = useState({
    analytics:       true,
    personalised:    true,
    notifications:   false,
    parentReports:   true,
  });

  const toggle = (k: keyof typeof prefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [k]: v }));

  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    {
      key: "analytics",
      label: "Learning Analytics",
      desc: "Share your learning progress data to help us improve the app and provide better insights.",
    },
    {
      key: "personalised",
      label: "Personalised Recommendations",
      desc: "Allow Panda to suggest topics and content based on your learning history.",
    },
    {
      key: "notifications",
      label: "Learning Notifications",
      desc: "Receive study reminders, streak alerts, and tips to keep you on track.",
    },
    {
      key: "parentReports",
      label: "Parent Progress Reports",
      desc: "Share weekly learning summaries with your parent or guardian's email.",
    },
  ];

  return (
    <motion.div key="privacy" {...tabAnim} className="space-y-6">
      <SectionCard>
        <SectionTitle>Privacy Settings</SectionTitle>
        <p className="text-sm text-gray-400 mb-6 -mt-3">
          Control how your data is used to personalise your experience.
        </p>
        <div className="space-y-0">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-start justify-between gap-4 py-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <ToggleSwitch checked={prefs[item.key]} onChange={toggle(item.key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
        <div className="flex gap-3">
          <span className="text-xl mt-0.5">🐼</span>
          <div>
            <p className="text-sm font-bold text-green-800 mb-1">Your data is safe with Panda!</p>
            <p className="text-xs text-green-600 leading-relaxed">
              We never sell your personal data to third parties. All data is used only to improve
              your learning experience and keep it personalised just for you.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── TAB: Billing ──────────────────────────────────────────────────────────

const FREE_FEATURES = [
  { ok: true,  text: "Ask Panda up to 20 questions / day" },
  { ok: true,  text: "Access to all core subjects" },
  { ok: true,  text: "Basic progress tracking" },
  { ok: true,  text: "Study streak tracking" },
  { ok: false, text: "Advanced AI explanations" },
  { ok: false, text: "Unlimited questions" },
  { ok: false, text: "Offline mode" },
  { ok: false, text: "Priority support" },
];

function BillingTab() {
  return (
    <motion.div key="billing" {...tabAnim} className="space-y-6">
      <SectionCard>
        <SectionTitle>Current Plan</SectionTitle>

        {/* Plan badge */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🌱</span>
              <p
                className="font-extrabold text-green-800 text-lg"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Free Learner
              </p>
            </div>
            <p className="text-sm text-green-600">Enjoy free access to core learning features</p>
          </div>
          <p
            className="text-2xl font-extrabold text-green-700"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            ₹0 / mo
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2.5 mb-6">
          {FREE_FEATURES.map((f, i) => (
            <p
              key={i}
              className={`text-sm flex items-center gap-2 ${f.ok ? "text-gray-700" : "text-gray-400"}`}
            >
              <span>{f.ok ? "✅" : "❌"}</span>
              {f.text}
            </p>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg text-sm">
          <Zap className="h-4 w-4" />
          Upgrade to Panda Pro
        </button>
      </SectionCard>

      <SectionCard>
        <SubTitle>Payment Methods</SubTitle>
        <p className="text-sm text-gray-400">No payment methods added yet.</p>
        <button className="mt-3 text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
          + Add payment method
        </button>
      </SectionCard>

      <SectionCard>
        <SubTitle>Billing History</SubTitle>
        <p className="text-sm text-gray-400">
          No invoices yet. Upgrade to Panda Pro to start your premium learning journey!
        </p>
      </SectionCard>
    </motion.div>
  );
}

// ── TAB: Usage ────────────────────────────────────────────────────────────

const USAGE_STATS = [
  { label: "Study Streak",    value: "7 days", icon: "🔥", bg: "bg-orange-50", text: "text-orange-600" },
  { label: "Topics Learned",  value: "24",     icon: "📚", bg: "bg-blue-50",   text: "text-blue-600"   },
  { label: "Questions Asked", value: "142",    icon: "💬", bg: "bg-purple-50", text: "text-purple-600" },
  { label: "Score Average",   value: "88%",    icon: "⭐", bg: "bg-amber-50",  text: "text-amber-600"  },
];

function aiTutorLabel(id: string | null) {
  switch (id) {
    case "text":  return "📝 Text — Read & Learn";
    case "audio": return "🎧 Audio — Listen & Learn";
    case "video": return "🎬 Video — Watch & Learn";
    default:      return "Not set";
  }
}

function UsageTab({ user }: { user: UserProp }) {
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
  });

  const gradeLabel = ALL_GRADES.find((g) => g.id === user.grade)?.label ?? "Not set";

  return (
    <motion.div key="usage" {...tabAnim} className="space-y-6">
      <SectionCard>
        <SectionTitle>Learning Stats</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          {USAGE_STATS.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-xl p-4 flex items-center gap-3`}
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p
                  className={`font-extrabold ${s.text}`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <SubTitle>Learning Preferences</SubTitle>
        <div className="space-y-3">
          {[
            { label: "AI Tutor Format",   value: aiTutorLabel(user.aiTutor) },
            { label: "Grade Level",       value: gradeLabel },
            { label: "Enrolled Courses",  value: `${user.courses.length} courses` },
            { label: "Member Since",      value: memberSince },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm py-1">
              <span className="text-gray-500">{row.label}</span>
              <span className="font-bold text-gray-700">{row.value}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {user.courses.length > 0 && (
        <SectionCard>
          <SubTitle>Enrolled Courses</SubTitle>
          <div className="flex flex-wrap gap-2">
            {user.courses.map((c) => (
              <span
                key={c}
                className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </SectionCard>
      )}
    </motion.div>
  );
}

// ── Main Settings Client ──────────────────────────────────────────────────

export default function SettingsClient({ user }: { user: UserProp }) {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : user.name ?? "Learner";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #F1F8E9 0%, #ffffff 50%)",
        fontFamily: "var(--font-nunito)",
      }}
    >
      {/* ── Header ── */}
      <header className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐼</span>
              <span
                className="text-lg font-extrabold text-green-700"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Settings
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Bell className="h-4 w-4 text-gray-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              {user.image ? (
                <img
                  src={user.image}
                  alt={displayName}
                  className="h-8 w-8 rounded-full border-2 border-green-200"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-sm font-bold text-green-700">
                  {displayName[0]}
                </div>
              )}
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {displayName}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* User card */}
              <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-b from-green-50 to-white border-b border-gray-100">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={displayName}
                    className="h-16 w-16 rounded-2xl border-2 border-green-200 object-cover mb-3"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-3">
                    {displayName[0]}
                  </div>
                )}
                <p
                  className="font-extrabold text-gray-800 text-sm text-center"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {displayName}
                </p>
                <p className="text-xs text-gray-400 text-center truncate max-w-full px-2 mt-0.5">
                  {user.email}
                </p>
              </div>

              {/* Nav links */}
              <nav className="p-3 space-y-0.5">
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeTab === id
                        ? "bg-green-50 text-green-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 ${
                        activeTab === id ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Content ── */}
          <main className="flex-1 min-w-0">
            {/* Mobile tab bar */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
              {TABS.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTab === id
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-green-200"
                  }`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  <span>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === "general" && <GeneralTab user={user} key="general" />}
              {activeTab === "account" && <AccountTab user={user} key="account" />}
              {activeTab === "privacy" && <PrivacyTab key="privacy" />}
              {activeTab === "billing" && <BillingTab key="billing" />}
              {activeTab === "usage"   && <UsageTab   user={user} key="usage"   />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
