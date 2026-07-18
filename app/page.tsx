"use client";

import { ProductCard } from "@/components/ProductCard";
import { getCatalog } from "@/lib/api";
import type { CatalogItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const HIGHLIGHTS = [
  {
    title: "全球节点",
    desc: "香港 · 美国 · 德国 · 日本 · 新加坡，CN2 / 9929 / SoftBank 线路可选",
    icon: "🌐",
  },
  {
    title: "LDC 预存",
    desc: "积分全款开通，余额透明可查，无分期欠款干扰",
    icon: "⚡",
  },
  {
    title: "LinuxDo 登录",
    desc: "社区身份一键接入，服务与钱包统一账户管理",
    icon: "🔐",
  },
];

const REGIONS = [
  { name: "香港", color: "#f43f5e" },
  { name: "美国", color: "#3b82f6" },
  { name: "德国", color: "#f59e0b" },
  { name: "日本", color: "#ec4899" },
  { name: "新加坡", color: "#10b981" },
  { name: "CDN", color: "#8b5cf6" },
  { name: "裸金属", color: "#06b6d4" },
  { name: "住宅 IP", color: "#a855f7" },
];

const STATS = [
  { label: "覆盖区域", value: "8+" },
  { label: "示例 SKU", value: "350+" },
  { label: "支付方式", value: "LDC 预存" },
  { label: "开通模式", value: "全款即时" },
  { label: "登录", value: "LinuxDo" },
  { label: "线路", value: "CN2 · 9929" },
];

export default function HomePage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatalog()
      .then((r) => setItems(r.data.items.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero-mesh">
        <div className="hero-grid" />
        <div className="aurora-orb aurora-orb-a" />
        <div className="aurora-orb aurora-orb-b" />
        <div className="aurora-orb aurora-orb-c" />
        <div className="container-page pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <div className="mb-5 inline-flex flex-wrap items-center justify-center gap-2">
              <span className="badge badge-accent">云产品销售门户</span>
              <span className="badge badge-violet">预存 · LDC</span>
              <span className="badge badge-success">全款开通</span>
            </div>
            <h1
              className="mb-5 text-4xl font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.6rem]"
              style={{ letterSpacing: "-0.05em" }}
            >
              全球节点，
              <span className="text-gradient">一站开通</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--ink-muted)" }}
            >
              VPS、裸金属、住宅 IP、CDN。LinuxDo 登录，LDC 积分预存支付——
              从选购到控制台，一套鲜亮的云基建体验。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/products" className="btn btn-primary btn-lg">
                浏览商店 →
              </Link>
              <Link href="/services" className="btn btn-secondary btn-lg">
                我的服务
              </Link>
            </div>
          </div>

          <div
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 animate-fade-up"
            style={{ animationDelay: "0.06s" }}
          >
            {REGIONS.map((r) => (
              <Link
                key={r.name}
                href={`/products?group=${encodeURIComponent(r.name)}`}
                className="region-chip"
              >
                <span className="region-dot" style={{ background: r.color, color: r.color }} />
                {r.name}
              </Link>
            ))}
          </div>

          <div
            className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="highlight-card surface-muted p-4 text-left md:p-5">
                <div className="icon-blob mb-3">{h.icon}</div>
                <h3
                  className="mb-1.5 text-sm font-semibold tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {h.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-wrap border-y py-3" style={{ borderColor: "var(--border)" }}>
          <div className="marquee-track">
            {[...STATS, ...STATS].map((s, i) => (
              <span key={`${s.label}-${i}`} className="stat-pill">
                <strong>{s.value}</strong>
                <span style={{ color: "var(--ink-muted)" }}>{s.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-text)" }}>
              Featured
            </p>
            <h2
              className="text-xl font-semibold tracking-tight md:text-2xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              精选产品
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
              代表性节点与规格，完整目录请进入商店
            </p>
          </div>
          <Link href="/products" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            查看全部 →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="surface p-5">
                <div className="skeleton mb-3 h-5 w-16" />
                <div className="skeleton mb-2 h-5 w-3/4" />
                <div className="skeleton mb-4 h-10 w-full" />
                <div className="skeleton h-8 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <ProductCard key={item.store_sku} item={item} compact />
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/products" className="btn btn-secondary">
            查看全部产品
          </Link>
        </div>
      </section>
    </>
  );
}
