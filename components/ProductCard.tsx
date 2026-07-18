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

const REGION_COLOR: Record<string, string> = {
  香港: "#e03131",
  美国: "#3b5bdb",
  德国: "#f08c00",
  日本: "#d6336c",
  新加坡: "#0ca678",
  CDN: "#7048e8",
  裸金属: "#1098ad",
  "住宅 IP": "#ae3ec9",
  全球: "#3b5bdb",
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
  if (s.ddos) pairs.push(["DDoS", String(s.ddos)]);
  return pairs.slice(0, 4);
}

export function ProductCard({ item, featured, compact }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const region = regionFromGroup(item.group_name);
  const soldOut = item.status !== "active" || item.stock <= 0;
  const accent = REGION_COLOR[region] || "var(--accent)";
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
      className={cn("product-card surface flex flex-col", featured && "md:col-span-1")}
      style={
        {
          padding: compact ? "1rem 1rem 1rem 1.1rem" : "1.15rem 1.15rem 1.15rem 1.25rem",
          ["--card-accent" as string]: accent,
        } as React.CSSProperties
      }
    >
      <span className="rail" aria-hidden />
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span
            className="badge"
            style={{
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`,
            }}
          >
            {region}
          </span>
          {item.stock > 0 && item.stock <= 5 && (
            <span className="badge badge-warning">仅剩 {item.stock}</span>
          )}
          {soldOut && <span className="badge badge-danger">售罄</span>}
        </div>
        <span className="font-mono text-[11px]" style={{ color: "var(--ink-faint)" }}>
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
        className="price-row mt-auto border-t pt-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div>
            <span className="price-main">{formatLdc(item.price_ldc)}</span>
            <span className="price-unit">LDC</span>
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "var(--ink-faint)" }}>
            续费 {formatLdc(item.renew_price_ldc)} LDC / 月
          </p>
        </div>
        <button
          type="button"
          className="btn btn-buy btn-sm"
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
