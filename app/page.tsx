"use client";

import { ProductCard } from "@/components/ProductCard";
import { getCatalog } from "@/lib/api";
import type { CatalogItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const REGIONS: { name: string; color: string }[] = [
  { name: "香港", color: "#fa5252" },
  { name: "美国", color: "#5b6cff" },
  { name: "德国", color: "#f59f00" },
  { name: "日本", color: "#e64980" },
  { name: "新加坡", color: "#12b886" },
  { name: "CDN", color: "#7950f2" },
  { name: "裸金属", color: "#15aabf" },
  { name: "住宅 IP", color: "#be4bdb" },
];

const STEPS = [
  { t: "LinuxDo 登录", d: "社区身份接入，服务与钱包统一" },
  { t: "LDC 预存", d: "余额充值后全款开通，无分期" },
  { t: "选购节点", d: "地区 / 线路 / 规格筛选下单" },
  { t: "控制台使用", d: "面板入口与接入码随时可查" },
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
      <section className="hero-modern">
        <div className="container-page py-12 md:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="animate-fade-up">
              <div className="hero-kicker mb-5">
                <span className="pulse" aria-hidden>
                  <i />
                </span>
                LinuxDo 登录 · LDC 预存全款
              </div>
              <h1 className="hero-title mb-4 text-[2.15rem] md:text-5xl lg:text-[3.15rem]">
                全球节点云产品
                <br />
                <span style={{ color: "var(--accent-text)" }}>选得清，买得快</span>
              </h1>
              <p
                className="mb-7 max-w-md text-[15px] leading-relaxed md:text-base"
                style={{ color: "var(--ink-muted)" }}
              >
                VPS、裸金属、住宅 IP、CDN。规格表直出、库存可见、余额可预期——
                给社区用户做的现代云商店体验。
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
              <div className="hero-panel-chrome">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="micro-label ml-2" style={{ textTransform: "none", letterSpacing: 0 }}>
                  store.preview
                </span>
              </div>
              <div className="p-4 md:p-5">
                <p className="micro-label mb-3">Why buy here</p>
                <ul className="space-y-3.5">
                  {[
                    ["规格先扫", "核数 / 内存 / 带宽 / 线路同卡展示，减少来回点详情"],
                    ["价格好比", "首购与续费同屏，支持价格排序与地区筛选"],
                    ["库存有感", "低库存角标提示稀缺机型"],
                    ["余额可预期", "够付即开通，不够先充值，无分期噪音"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <div>
                        <p className="text-sm font-semibold tracking-tight">{t}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                          {d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/products" className="btn btn-primary mt-5 w-full">
                  去商店看库存与价格
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-page py-10 md:py-12">
        <div className="bento">
          <div className="bento-tile bento-wide">
            <p className="micro-label mb-3">Purchase path</p>
            <h2 className="mb-4 text-lg font-semibold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              四步开通
            </h2>
            <div>
              {STEPS.map((s, i) => (
                <div key={s.t} className="step-row">
                  <span className="step-idx">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold">{s.t}</p>
                    <p className="mt-0.5 text-[13px]" style={{ color: "var(--ink-muted)" }}>
                      {s.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bento-tile dark">
            <p className="micro-label mb-3 muted">Payment</p>
            <p className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              LDC 预存
            </p>
            <p className="muted mt-2 text-[13px] leading-relaxed">
              全款开通，余额透明，够付直接下单。
            </p>
          </div>
          <div className="bento-tile">
            <p className="micro-label mb-3">Identity</p>
            <p className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              LinuxDo
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              社区身份一键登录，服务与钱包同一账户。
            </p>
          </div>
          <div className="bento-tile">
            <p className="micro-label mb-3">Catalog</p>
            <p className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              多区多品类
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              VPS · 裸金属 · 住宅 IP · CDN
            </p>
          </div>
          <div className="bento-tile" style={{ background: "var(--accent-soft)", borderColor: "var(--accent-border)" }}>
            <p className="micro-label mb-3" style={{ color: "var(--accent-text)" }}>
              Activate
            </p>
            <p className="text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em", color: "var(--accent-text)" }}>
              够付即开通
            </p>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
              无分期欠款流程，减少下单摩擦。
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-14 md:pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="micro-label mb-2">Featured</p>
            <h2
              className="text-xl font-semibold tracking-tight md:text-2xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              先看这些机型
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
              覆盖流量云、精品线路、住宅与 CDN
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
