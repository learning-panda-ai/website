import { requireAuth } from "@/lib/server-auth";
import { redirect, notFound } from "next/navigation";
import ChatSessionPage from "./ChatSessionPage";
import Navbar from "@/components/Navbar";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function DedicatedChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = await requireAuth();
  const { id } = await params;

  const [meRes, sessionRes] = await Promise.all([
    fetch(`${BACKEND_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
    fetch(`${BACKEND_URL}/api/v1/chat/sessions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  ]);

  if (!meRes.ok) redirect("/login");
  if (sessionRes.status === 404) notFound();
  if (!sessionRes.ok) redirect("/dashboard/history");

  const user = await meRes.json();
  const session = await sessionRes.json();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "var(--font-nunito)" }}>
      <Navbar user={user} />
      <ChatSessionPage
        sessionId={id}
        subject={session.subject}
        className={session.class_name}
        title={session.title}
      />
    </div>
  );
}
