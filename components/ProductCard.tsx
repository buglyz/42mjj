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

function specPairs(item: CatalogItem): [string, string][] {
  const s = item.spec || {};
  const pairs: [string, string][] = [];
  if (s.cpu != null) pairs.push(["CPU", `${s.cpu} 核`]);
  if (s.memory != null) {
    const m = Number(s.memory);
    pairs.push(["内存", m >= 1024 ? `${m / 1024}G` : `${m}M`]);
  }
  if (s.disk != null) pairs.push(["硬盘", `${s.disk}G`]);
  if (s.bandwidth) pairs.push(["带宽", String(s.bandwidth)]);
  if (s.traffic) pairs.push(["流量", String(s.traffic)]);
  if (s.nodes) pairs.push(["节点", String(s.nodes)]);
  if (s.ddos) pairs.push(["防护", String(s.ddos)]);
  return pairs.slice(0, 4);
}

export function ProductCard({ item, compact }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const region = regionFromGroup(item.group_name);
  const soldOut = item.status !== "active" || item.stock <= 0;
  const pairs = specPairs(item);

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
      if (
        res.data.payment_status !== "paid" &&
        res.data.remaining_amount !== "0.00"
      ) {
        setError("余额不足，请先充值");
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
      className={cn("product-card surface flex flex-col")}
      style={{ padding: compact ? "1rem" : "1.1rem" }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-accent">{region}</span>
          {item.stock > 0 && item.stock <= 5 && (
            <span className="badge badge-warning">剩 {item.stock}</span>
          )}
          {soldOut && <span className="badge badge-danger">售罄</span>}
        </div>
        <span className="text-[11px]" style={{ color: "var(--ink-faint)" }}>
          {item.term_months} 个月
        </span>
      </div>

      <h3 className="mb-1.5 text-[14.5px] font-semibold leading-snug">
        {item.name}
      </h3>
      <p
        className="mb-3 line-clamp-2 text-[12.5px] leading-relaxed"
        style={{ color: "var(--ink-muted)" }}
      >
        {item.description}
      </p>

      {pairs.length > 0 ? (
        <dl className="spec-grid mb-3">
          {pairs.map(([k, v]) => (
            <div key={k} className="contents">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {item.capabilities.slice(0, 4).map((cap) => (
            <span key={cap} className="badge">
              {cap}
            </span>
          ))}
        </div>
      )}

      <div
        className="mt-auto flex items-end justify-between gap-3 border-t pt-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div>
            <span className="price-main">{formatLdc(item.price_ldc)}</span>
            <span className="price-unit">LDC</span>
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "var(--ink-faint)" }}>
            续费 {formatLdc(item.renew_price_ldc)} / 月
          </p>
        </div>
        <button
          type="button"
          className="btn btn-buy btn-sm"
          disabled={soldOut || loading}
          onClick={onBuy}
        >
          {loading ? "…" : soldOut ? "售罄" : "购买"}
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
