"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";

const ADMIN_SETTINGS = [
  {
    id: "review",
    title: "Listing moderation",
    description: "Control how new community items enter the queue.",
    icon: "shield",
    items: [
      {
        key: "holdListings",
        label: "Hold new listings for review",
        description:
          "Keep newly submitted listings in Pending Items until approved by an admin.",
      },
    ],
  },
  {
    id: "alerts",
    title: "Essential alerts",
    description: "Keep only critical moderation updates enabled.",
    icon: "bell",
    items: [
      {
        key: "newListings",
        label: "New listing submissions",
        description: "Notify when a member submits a listing for approval.",
      },
      {
        key: "communityReports",
        label: "Community reports",
        description: "Notify when a member flags a listing or user account.",
      },
    ],
  },
];

const DEFAULT_PREFS = {
  holdListings: true,
  newListings: true,
  communityReports: true,
};

const svgProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function SectionIcon({ name }) {
  if (name === "shield") {
    return (
      <svg {...svgProps}>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16z" />
      <path d="M10 20.5a2 2 0 004 0" />
    </svg>
  );
}

function getInitials(name) {
  if (!name || typeof name !== "string") return "AD";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [message, setMessage] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setMessage("");
  };

  const handleSave = () => {
    setMessage("Admin settings updated.");
  };

  const handleReset = () => {
    setPrefs(DEFAULT_PREFS);
    setMessage("Reset to default settings.");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setMessage("");

    try {
      await authService.logout();
      if (typeof logout === "function") {
        await logout();
      }
      router.push("/login");
      router.refresh();
    } catch {
      setMessage("Could not log out. Please try again.");
      setIsLoggingOut(false);
    }
  };
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 bg-[#fffefa] px-4 py-6 text-neutral-900 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 lg:px-8">
      {/* Main column */}
      <main className="min-w-0">
        <header className="flex flex-col justify-between gap-4 border-b border-[#e4e3da] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#4a8a68]">
              Admin settings
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Workspace controls
            </h1>
            <p className="mt-1.5 text-sm text-[#55584f]">
              Essential moderation and alert preferences for administrators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer rounded-lg border border-[#dcdbd0] px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f4f3ec]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="cursor-pointer rounded-lg bg-[#0f5a3c] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b462e]"
            >
              Save settings
            </button>
          </div>
        </header>

        <p
          role="status"
          aria-live="polite"
          className="mt-3 min-h-5 text-sm font-medium text-[#0f5a3c]"
        >
          {message}
        </p>

        {ADMIN_SETTINGS.map((section) => (
          <section
            key={section.id}
            className="border-b border-[#e4e3da] py-6 last:border-b-0"
          >
            <div className="mb-4 flex items-center gap-3.5">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg text-[#0f5a3c] ${
                  section.icon === "bell" ? "bg-[#f8ead6]" : "bg-[#eef2e4]"
                }`}
              >
                <SectionIcon name={section.icon} />
              </span>
              <div>
                <h2 className="text-lg font-bold">{section.title}</h2>
                <p className="text-sm text-[#55584f]">{section.description}</p>
              </div>
            </div>

            <ul className="divide-y divide-[#e4e3da]">
              {section.items.map((item) => {
                const enabled = Boolean(prefs[item.key]);
                return (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-6 py-4"
                  >
                    <div>
                      <p
                        id={`${item.key}-label`}
                        className="font-medium text-neutral-900"
                      >
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm text-[#55584f]">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      aria-labelledby={`${item.key}-label`}
                      onClick={() => togglePref(item.key)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                        enabled ? "bg-[#0f5a3c]" : "bg-neutral-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>

      {/* Right Sidebar: Account, Session & Quick Links */}
      <aside className="flex flex-col justify-between border-t border-[#e4e3da] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Account & Session
            </p>
            <h2 className="mt-1 text-xl font-bold">Admin session</h2>
          </div>

          <div className="flex items-center gap-3.5 border-b border-[#e4e3da] pb-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#b7c466] text-base font-bold text-[#0f5a3c]">
              {getInitials(user?.fullname)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-neutral-900">
                {user?.fullname || "Admin User"}
              </p>
              <p className="text-xs text-[#55584f]">Administrator</p>
            </div>
          </div>

          <div className="border-b border-[#e4e3da] pb-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Quick navigation
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link
                href="/admin/pending-items"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold text-[#0f5a3c] transition hover:bg-[#f3f5ec]"
              >
                <span>Pending items</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/admin/community-reports"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm font-semibold text-[#0f5a3c] transition hover:bg-[#f3f5ec]"
              >
                <span>Community reports</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full cursor-pointer rounded-lg border  bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
