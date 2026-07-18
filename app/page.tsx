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
  },
  {
    title: "LDC 预存",
    desc: "积分全款开通，余额透明可查，无分期欠款干扰",
  },
  {
    title: "LinuxDo 登录",
    desc: "社区身份一键接入，服务与钱包统一账户管理",
  },
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
        <div className="container-page pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="badge badge-accent">云产品销售门户</span>
              <span className="badge">预存 · LDC</span>
            </div>
            <h1
              className="mb-5 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.5rem]"
              style={{ letterSpacing: "-0.045em" }}
            >
              全球节点，
              <span style={{ color: "var(--accent-text)" }}>一站开通</span>
            </h1>
            <p
              className="mx-auto mb-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--ink-muted)" }}
            >
              VPS、裸金属、住宅 IP、CDN。用 LinuxDo 登录，LDC 积分预存支付，
              从选购到控制台一气呵成。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/products" className="btn btn-primary btn-lg">
                浏览商店
              </Link>
              <Link href="/services" className="btn btn-secondary btn-lg">
                我的服务
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: "0.08s" }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="surface-muted p-4 text-left md:p-5">
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
      </section>

      <section className="container-page pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
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
          <Link
            href="/products"
            className="btn btn-ghost btn-sm hidden sm:inline-flex"
          >
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
