"use client";

import { createOrder, getServices, handlePaymentRedirect } from "@/lib/api";
import { cn, daysUntil, formatLdc } from "@/lib/format";
import type { ServiceItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServices()
      .then((r) => setItems(r.data.items))
      .finally(() => setLoading(false));
  }, []);

  async function renew(svc: ServiceItem) {
    setBusyKey(svc.service_key);
    setError(null);
    try {
      const res = await createOrder({
        order_type: "renew",
        plan_key: svc.plan_key,
        target_container: svc.service_key,
      });
      if (res.code >= 400) {
        setError(res.message || "续费失败");
        return;
      }
      handlePaymentRedirect(res.data);
    } catch {
      setError("网络错误");
    } finally {
      setBusyKey(null);
    }
  }

  function copyCode(code: string) {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="container-page py-8 md:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            我的服务
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            已购实例、到期与控制台
          </p>
        </div>
        <Link href="/products" className="btn btn-secondary btn-sm">
          去商店
        </Link>
      </div>

      {error && (
        <div
          className="mb-4 rounded-lg px-4 py-3 text-sm"
          style={{
            background: "var(--danger-soft)",
            color: "var(--danger)",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="surface p-5">
              <div className="skeleton mb-3 h-5 w-40" />
              <div className="skeleton mb-2 h-4 w-64" />
              <div className="skeleton h-10 w-full" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="surface flex flex-col items-center py-16 text-center">
          <p className="text-sm font-medium">还没有服务</p>
          <p className="mt-1 text-xs" style={{ color: "var(--ink-muted)" }}>
            去商店选一台机器，全款开通后会显示在这里
          </p>
          <Link href="/products" className="btn btn-primary mt-5">
            浏览商店
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((svc) => {
            const days = daysUntil(svc.expires_at);
            const statusBadge =
              svc.service_status === "active"
                ? days <= 7
                  ? "badge-warning"
                  : "badge-success"
                : svc.service_status === "expired"
                  ? "badge-danger"
                  : "badge";

            return (
              <article key={svc.service_key} className="surface p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2
                        className="text-base font-semibold tracking-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {svc.display_name || svc.plan_name}
                      </h2>
                      <span className={cn("badge", statusBadge)}>
                        {svc.service_status === "active"
                          ? days <= 7
                            ? `${days} 天后到期`
                            : "运行中"
                          : svc.service_status}
                      </span>
                    </div>
                    <p
                      className="mb-3 font-mono text-xs"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {svc.service_key} · 订单 {svc.source_order_id}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {svc.capabilities.map((c) => (
                        <span key={c} className="badge">
                          {c}
                        </span>
                      ))}
                    </div>
                    <dl
                      className="grid gap-2 text-sm sm:grid-cols-2"
                      style={{ color: "var(--ink-secondary)" }}
                    >
                      <div>
                        <dt className="text-xs" style={{ color: "var(--ink-faint)" }}>
                          开通时间
                        </dt>
                        <dd className="font-mono text-[13px]">{svc.service_start_at}</dd>
                      </div>
                      <div>
                        <dt className="text-xs" style={{ color: "var(--ink-faint)" }}>
                          到期时间
                        </dt>
                        <dd className="font-mono text-[13px]">{svc.expires_at}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs" style={{ color: "var(--ink-faint)" }}>
                          接入码
                        </dt>
                        <dd className="mt-0.5 flex items-center gap-2">
                          <code
                            className="rounded px-2 py-1 font-mono text-[13px]"
                            style={{
                              background: "var(--bg-muted)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {svc.access_code}
                          </code>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => copyCode(svc.access_code)}
                          >
                            {copied === svc.access_code ? "已复制" : "复制"}
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex shrink-0 flex-row gap-2 md:flex-col md:items-stretch">
                    <div className="mb-1 hidden text-right md:block">
                      <p className="text-xs" style={{ color: "var(--ink-faint)" }}>
                        续费
                      </p>
                      <p className="text-sm font-semibold tabular-nums">
                        {formatLdc(svc.renew_price)} LDC
                      </p>
                    </div>
                    {svc.actions.includes("console") && (
                      <a
                        href={svc.panel_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        控制台
                      </a>
                    )}
                    {svc.actions.includes("renew") && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={busyKey === svc.service_key}
                        onClick={() => renew(svc)}
                      >
                        {busyKey === svc.service_key ? "处理中…" : "续费"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
