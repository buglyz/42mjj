"use client";

import { ProductCard } from "@/components/ProductCard";
import { getCatalog } from "@/lib/api";
import type { CatalogItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const REGIONS = ["香港", "美国", "德国", "日本", "新加坡", "CDN", "裸金属", "住宅 IP"];

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
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container-page py-12 md:py-16">
          <div className="max-w-xl">
            <p className="mb-3 text-sm" style={{ color: "var(--ink-muted)" }}>
              LinuxDo 登录 · LDC 预存支付
            </p>
            <h1
              className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
            >
              买服务器，先看规格和库存
            </h1>
            <p className="mb-7 text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              香港、美国、德国、日本等节点的 VPS、裸金属、住宅 IP 和 CDN。
              余额够就全款开通，不够先充值。
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/products" className="btn btn-buy btn-lg">
                去商店
              </Link>
              <Link href="/services" className="btn btn-secondary btn-lg">
                我的服务
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {REGIONS.map((name) => (
              <Link
                key={name}
                href={`/products?group=${encodeURIComponent(name)}`}
                className="region-chip"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10 md:py-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["规格同卡展示", "核数、内存、硬盘、带宽和线路直接写在商品卡上。"],
            ["价格好对比", "首购价和续费价都在，可按地区筛选、按价格排序。"],
            ["预存全款", "LDC 钱包够付就下单开通，没有分期欠款。"],
          ].map(([t, d]) => (
            <div key={t} className="surface p-4 md:p-5">
              <h2 className="mb-1.5 text-sm font-semibold">{t}</h2>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 md:pb-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              精选商品
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
              几台代表性机型，完整列表在商店
            </p>
          </div>
          <Link href="/products" className="btn btn-ghost btn-sm hidden sm:inline-flex">
            全部商品
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
