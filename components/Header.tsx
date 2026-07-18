"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";
import { cn } from "@/lib/format";
import { useTheme } from "@/lib/theme";
import type { AuthMe } from "@/lib/types";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/products", label: "商店" },
  { href: "/services", label: "我的服务" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggle, ready } = useTheme();
  const [me, setMe] = useState<AuthMe | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMe()
      .then((r) => setMe(r.data))
      .catch(() => setMe(null));
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="nav-glass sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        height: "var(--nav-h)",
      }}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="logo-mark flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-semibold tracking-tight">
              42
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              42mjj
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                )}
                style={{
                  color: isActive(item.href)
                    ? "var(--ink)"
                    : "var(--ink-muted)",
                  background: isActive(item.href)
                    ? "var(--bg-muted)"
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggle}
            aria-label="切换主题"
            title={ready ? (theme === "dark" ? "浅色模式" : "深色模式") : "主题"}
          >
            {ready && theme === "dark" ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>

          <div className="hidden sm:block">
            {me?.logged_in && me.user ? (
              <div className="flex items-center gap-2">
                <span
                  className="badge"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}
                >
                  @{me.user.username}
                </span>
                <a href={me.logout_url} className="btn btn-ghost btn-sm">
                  退出
                </a>
              </div>
            ) : me ? (
              <a href={me.login_url} className="btn btn-primary btn-sm">
                LinuxDo 登录
              </a>
            ) : (
              <span className="skeleton h-8 w-24 inline-block" />
            )}
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="菜单"
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 md:hidden"
          style={{ background: "var(--bg)" }}
        >
          <nav className="container-page flex flex-col gap-1 py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium"
                style={{
                  color: isActive(item.href) ? "var(--ink)" : "var(--ink-secondary)",
                  background: isActive(item.href) ? "var(--bg-muted)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="mt-4 border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              {me?.logged_in && me.user ? (
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
                    @{me.user.username}
                  </span>
                  <a href={me.logout_url} className="btn btn-secondary btn-sm">
                    退出
                  </a>
                </div>
              ) : me ? (
                <a href={me.login_url} className="btn btn-primary w-full">
                  LinuxDo 登录
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
