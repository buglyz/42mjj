"use client";

import { ProductCard } from "@/components/ProductCard";
import { getCatalog } from "@/lib/api";
import type { CatalogItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const REGIONS: { name: string; color: string }[] = [
  { name: "香港", color: "#e03131" },
  { name: "美国", color: "#3b5bdb" },
  { name: "德国", color: "#f08c00" },
  { name: "日本", color: "#d6336c" },
  { name: "新加坡", color: "#0ca678" },
  { name: "CDN", color: "#7048e8" },
  { name: "裸金属", color: "#1098ad" },
  { name: "住宅 IP", color: "#ae3ec9" },
];

const STEPS = [
  { t: "LinuxDo 登录", d: "社区身份接入，服务与钱包统一" },
  { t: "LDC 预存", d: "余额充值后全款开通，无分期" },
  { t: "选购节点", d: "按地区 / 线路 / 规格筛选下单" },
  { t: "控制台使用", d: "面板入口与接入码随时可查" },
];

const TRUST = [
  { k: "支付", v: "LDC 预存全款" },
  { k: "身份", v: "LinuxDo" },
  { k: "开通", v: "余额够即开通" },
  { k: "品类", v: "VPS / 裸金属 / IP / CDN" },
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
      <section className="hero-commerce">
        <div className="container-page py-12 md:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="animate-fade-up">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="badge badge-accent">LinuxDo · LDC</span>
                <span className="badge badge-buy">预存全款开通</span>
              </div>
              <h1
                className="mb-4 text-[2rem] font-semibold leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem]"
                style={{ letterSpacing: "-0.035em", color: "var(--ink)" }}
              >
                用 LDC 买全球节点，
                <br className="hidden sm:block" />
                从选购到控制台一步到位
              </h1>
              <p
                className="mb-7 max-w-lg text-[15px] leading-relaxed md:text-base"
                style={{ color: "var(--ink-muted)" }}
              >
                香港 / 美国 / 德国 / 日本等 VPS、裸金属、住宅 IP 与 CDN。
                规格清晰、库存可见、价格透明——适合对比后直接下单。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn btn-buy btn-lg">
                  立即选购
                </Link>
                <Link href="/services" className="btn btn-secondary btn-lg">
                  我的服务
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {REGIONS.map((r) => (
                  <Link
                    key={r.name}
                    href={`/products?group=${encodeURIComponent(r.name)}`}
                    className="region-chip"
                  >
                    <span className="region-dot" style={{ ["--dot" as string]: r.color }} />
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="hero-panel animate-fade-up" style={{ animationDelay: "0.06s" }}>
              <div className="hero-panel-head">
                <div className="flex items-center gap-2">
                  <span className="live-dot" />
                  <span className="text-sm font-semibold">为什么在这里买</span>
                </div>
                <span className="badge badge-accent">社区商店</span>
              </div>
              <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
                {[
                  {
                    t: "规格先看清",
                    d: "核数 / 内存 / 硬盘 / 带宽 / 线路标签直接贴在卡片上，不用点进详情才知道。",
                  },
                  {
                    t: "价格好对比",
                    d: "首购价与续费价同屏展示，按价格排序、按地区筛选，减少来回切换。",
                  },
                  {
                    t: "库存有信号",
                    d: "低库存角标提示稀缺机型，避免挑完才发现没货。",
                  },
                  {
                    t: "预存可预期",
                    d: "LDC 钱包余额可见，够付就下单，不够先充值——没有分期欠款噪音。",
                  },
                ].map((item) => (
                  <li key={item.t} className="px-4 py-3.5 md:px-5">
                    <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      {item.t}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                      {item.d}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t p-4 md:p-5" style={{ borderColor: "var(--border)" }}>
                <Link href="/products" className="btn btn-primary w-full">
                  去商店看库存与价格
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="trust-band">
        <div className="container-page py-10 md:py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider muted">
                购买路径
              </p>
              <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                四步完成开通
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs muted">
              {TRUST.map((t) => (
                <span key={t.k}>
                  <span className="opacity-70">{t.k} · </span>
                  <span style={{ color: "var(--ink-on-dark)" }}>{t.v}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.t}
                className="rounded-[var(--radius)] border p-4"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="step-num">{i + 1}</span>
                  <h3 className="text-sm font-semibold">{s.t}</h3>
                </div>
                <p className="text-[13px] leading-relaxed muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p
              className="mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--accent-text)" }}
            >
              精选机型
            </p>
            <h2
              className="text-xl font-semibold tracking-tight md:text-2xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              先看这些再决定
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
              覆盖流量云、精品线路、住宅与 CDN 的代表性 SKU
            </p>
          </div>
          <Link href="/products" className="btn btn-secondary btn-sm hidden sm:inline-flex">
            全部商品 →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="surface p-5">
                <div className="skeleton mb-3 h-5 w-16" />
                <div className="skeleton mb-2 h-5 w-3/4" />
                <div className="skeleton mb-4 h-16 w-full" />
                <div className="skeleton h-10 w-full" />
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
            查看全部商品
          </Link>
        </div>
      </section>
    </>
  );
}
