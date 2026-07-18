"use client";

import { createOrder, handlePaymentRedirect } from "@/lib/api";
import { cn, formatLdc, regionFromGroup } from "@/lib/format";
import type { CatalogItem } from "@/lib/types";
import { useState } from "react";

type Props = {
  item: CatalogItem;
  featured?: boolean;
  compact?: boolean;
};

export function ProductCard({ item, featured, compact }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const region = regionFromGroup(item.group_name);
  const soldOut = item.status !== "active" || item.stock <= 0;

  async function onBuy() {
    if (soldOut || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await createOrder({
        order_type: "purchase",
        plan_key: item.store_sku,
      });
      if (res.code >= 400) {
        setError(res.message || "下单失败");
        return;
      }
      if (res.data.payment_status !== "paid" && res.data.remaining_amount !== "0.00") {
        setError("余额不足，请先充值");
        // still allow redirect path for demo
        setTimeout(() => handlePaymentRedirect(res.data), 1200);
        return;
      }
      handlePaymentRedirect(res.data);
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      className={cn(
        "product-card surface flex flex-col",
        featured && "md:col-span-1"
      )}
      style={{ padding: compact ? "1rem" : "1.25rem" }}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-accent">{region}</span>
          {item.stock > 0 && item.stock <= 5 && (
            <span className="badge badge-warning">仅剩 {item.stock}</span>
          )}
          {soldOut && <span className="badge badge-danger">售罄</span>}
        </div>
        <span
          className="font-mono text-[11px]"
          style={{ color: "var(--ink-faint)" }}
        >
          {item.term_months} 月
        </span>
      </div>

      <h3
        className="mb-1.5 text-[15px] font-semibold leading-snug tracking-tight"
        style={{ letterSpacing: "-0.02em" }}
      >
        {item.name}
      </h3>
      <p
        className="mb-4 line-clamp-2 text-[13px] leading-relaxed"
        style={{ color: "var(--ink-muted)" }}
      >
        {item.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {item.capabilities.slice(0, 5).map((cap) => (
          <span key={cap} className="badge">
            {cap}
          </span>
        ))}
        {item.capabilities.length > 5 && (
          <span className="badge">+{item.capabilities.length - 5}</span>
        )}
      </div>

      <div
        className="mt-auto flex items-end justify-between gap-3 border-t pt-4"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-xl font-semibold tracking-tight tabular-nums"
              style={{ letterSpacing: "-0.03em" }}
            >
              {formatLdc(item.price_ldc)}
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
              LDC
            </span>
          </div>
          <p className="mt-0.5 text-[11px]" style={{ color: "var(--ink-faint)" }}>
            续费 {formatLdc(item.renew_price_ldc)} LDC / 月
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={soldOut || loading}
          onClick={onBuy}
        >
          {loading ? "处理中…" : soldOut ? "已售罄" : "购买"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </article>
  );
}
