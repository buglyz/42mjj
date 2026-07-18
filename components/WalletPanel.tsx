"use client";

import { createRecharge, handlePaymentRedirect } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import type { WalletData } from "@/lib/types";
import { useState } from "react";

const PRESETS = [500, 1000, 2000, 5000, 10000];

type Props = {
  wallet: WalletData | null;
  loading?: boolean;
};

export function WalletPanel({ wallet, loading }: Props) {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function recharge() {
    const n = custom ? Number(custom) : amount;
    if (!n || n <= 0 || Number.isNaN(n)) {
      setMsg("请输入有效金额");
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await createRecharge(n);
      if (res.code >= 400) {
        setMsg(res.message || "充值失败");
        return;
      }
      setMsg("正在跳转支付…");
      handlePaymentRedirect(res.data);
    } catch {
      setMsg("网络错误");
    } finally {
      setBusy(false);
    }
  }

  if (loading || !wallet) {
    return (
      <div className="surface p-5 md:p-6">
        <div className="skeleton mb-3 h-4 w-24" />
        <div className="skeleton mb-6 h-10 w-40" />
        <div className="skeleton h-10 w-full" />
      </div>
    );
  }

  const { account } = wallet;

  return (
    <div className="surface wallet-panel overflow-hidden">
      <div className="relative px-5 py-5 md:px-6 md:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs" style={{ color: "var(--ink-muted)" }}>
              钱包余额
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight tabular-nums md:text-[2.1rem]">
                {formatMoney(account.balance)}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--ink-muted)" }}
              >
                LDC
              </span>
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--ink-muted)" }}>
              累计充值 {formatMoney(account.total_recharged)} · 已消费{" "}
              {formatMoney(account.total_spent)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="badge">预存全款</span>
          </div>
        </div>
      </div>

      <div
        className="border-t px-5 py-4 md:px-6"
        style={{ borderColor: "var(--border)" }}
      >
        <p
          className="mb-2.5 text-xs font-medium"
          style={{ color: "var(--ink-secondary)" }}
        >
          充值金额
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className="btn btn-sm"
              style={{
                background:
                  !custom && amount === p
                    ? "var(--accent-soft)"
                    : "var(--bg-muted)",
                color:
                  !custom && amount === p
                    ? "var(--accent-text)"
                    : "var(--ink-secondary)",
                border:
                  !custom && amount === p
                    ? "1px solid color-mix(in srgb, var(--accent) 30%, transparent)"
                    : "1px solid var(--border)",
              }}
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
            >
              {p.toLocaleString("zh-CN")}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="input"
            type="number"
            min={1}
            placeholder="自定义金额"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-buy shrink-0"
            disabled={busy}
            onClick={recharge}
          >
            {busy ? "处理中…" : "充值"}
          </button>
        </div>
        {msg && (
          <p className="mt-2 text-xs" style={{ color: "var(--ink-muted)" }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
