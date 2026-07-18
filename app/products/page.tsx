"use client";

import { ProductCard } from "@/components/ProductCard";
import { WalletPanel } from "@/components/WalletPanel";
import { getCatalog, getWallet } from "@/lib/api";
import { cn, regionFromGroup } from "@/lib/format";
import type { CatalogItem, WalletData } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export default function ProductsPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("全部");
  const [sort, setSort] = useState<"default" | "price_asc" | "price_desc">(
    "default"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("group");
    if (g) setGroup(g);

    Promise.all([getCatalog(), getWallet()])
      .then(([c, w]) => {
        setItems(c.data.items);
        setWallet(w.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const groups = useMemo(() => {
    const set = new Set(items.map((i) => regionFromGroup(i.group_name)));
    return ["全部", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let list = items.slice();
    if (group !== "全部") {
      list = list.filter((i) => regionFromGroup(i.group_name) === group);
    }
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(s) ||
          i.description.toLowerCase().includes(s) ||
          i.group_name.toLowerCase().includes(s) ||
          i.capabilities.some((c) => c.toLowerCase().includes(s))
      );
    }
    if (sort === "price_asc") list.sort((a, b) => a.price_ldc - b.price_ldc);
    if (sort === "price_desc") list.sort((a, b) => b.price_ldc - a.price_ldc);
    return list;
  }, [items, group, q, sort]);

  return (
    <div className="container-page py-8 md:py-10">
      <div className="mb-6 md:mb-8">
        <h1
          className="text-2xl font-semibold tracking-tight md:text-3xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          商店
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
          余额、筛选和商品列表
        </p>
      </div>

      <div className="mb-8">
        <WalletPanel wallet={wallet} loading={loading} />
      </div>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <input
            className="input pl-9"
            placeholder="搜索产品、规格、线路…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--ink-faint)" }}
          >
            <SearchIcon />
          </span>
        </div>
        <select
          className="input w-full md:w-40"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "default" | "price_asc" | "price_desc")
          }
        >
          <option value="default">默认排序</option>
          <option value="price_asc">价格从低到高</option>
          <option value="price_desc">价格从高到低</option>
        </select>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            className={cn("btn btn-sm shrink-0")}
            style={{
              background: group === g ? "var(--accent-soft)" : "var(--bg-muted)",
              color: group === g ? "var(--accent-text)" : "var(--ink-secondary)",
              border:
                group === g
                  ? "1px solid color-mix(in srgb, var(--accent) 30%, transparent)"
                  : "1px solid var(--border)",
            }}
            onClick={() => setGroup(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="surface p-5">
              <div className="skeleton mb-3 h-5 w-20" />
              <div className="skeleton mb-2 h-5 w-3/4" />
              <div className="skeleton mb-4 h-12 w-full" />
              <div className="skeleton h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="surface flex flex-col items-center justify-center py-16 text-center"
        >
          <p className="text-sm font-medium">没有匹配的产品</p>
          <p className="mt-1 text-xs" style={{ color: "var(--ink-muted)" }}>
            试试其他关键词或分组
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm mt-4"
            onClick={() => {
              setQ("");
              setGroup("全部");
            }}
          >
            清除筛选
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-xs" style={{ color: "var(--ink-faint)" }}>
            共 {filtered.length} 个产品
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <ProductCard key={item.store_sku} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}
