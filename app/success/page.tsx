"use client";

import { queryOrder } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import type { OrderData } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function SuccessInner() {
  const search = useSearchParams();
  const orderNo = search.get("order_no") || "";
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!orderNo) {
      setError("缺少订单号");
      setPolling(false);
      return;
    }
    try {
      const res = await queryOrder(orderNo);
      if (res.code >= 400) {
        setError(res.message || "查询失败");
        setPolling(false);
        return;
      }
      setOrder(res.data);
      if (res.data.payment_status === "paid") {
        setPolling(false);
      }
    } catch {
      setError("网络错误");
      setPolling(false);
    }
  }, [orderNo]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (!polling || !orderNo) return;
    const id = setInterval(fetchOrder, 2000);
    return () => clearInterval(id);
  }, [polling, orderNo, fetchOrder]);

  const paid = order?.payment_status === "paid";

  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-12">
      <div className="surface w-full max-w-lg p-6 md:p-8 animate-fade-up">
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: paid
                ? "var(--success-soft)"
                : error
                  ? "var(--danger-soft)"
                  : "var(--accent-soft)",
              color: paid
                ? "var(--success)"
                : error
                  ? "var(--danger)"
                  : "var(--accent-text)",
            }}
          >
            {paid ? (
              <CheckIcon />
            ) : error ? (
              <XIcon />
            ) : (
              <span className="animate-spin-slow inline-block">
                <LoaderIcon />
              </span>
            )}
          </div>
          <h1
            className="text-xl font-semibold tracking-tight md:text-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {error
              ? "查询失败"
              : paid
                ? "支付成功"
                : "正在确认订单…"}
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
            {error
              ? error
              : paid
                ? "订单已完成，服务即将开通或已开通"
                : "轮询支付状态，请稍候"}
          </p>
        </div>

        {order && (
          <dl
            className="mb-6 space-y-3 rounded-lg p-4 text-sm"
            style={{
              background: "var(--bg-muted)",
              border: "1px solid var(--border)",
            }}
          >
            <Row label="订单号" value={order.order_no} mono />
            <Row label="类型" value={typeLabel(order.order_type)} />
            <Row label="方案" value={order.plan_name} />
            <Row label="金额" value={`${formatMoney(order.total_amount)} LDC`} />
            <Row label="钱包抵扣" value={`${formatMoney(order.wallet_amount)} LDC`} />
            <Row
              label="状态"
              value={
                order.payment_status === "paid"
                  ? "已支付"
                  : order.payment_status === "unpaid"
                    ? "待支付"
                    : order.payment_status
              }
            />
          </dl>
        )}

        {!order && !error && (
          <div className="mb-6 space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/services" className="btn btn-primary flex-1">
            我的服务
          </Link>
          <Link href="/products" className="btn btn-secondary flex-1">
            继续逛商店
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt style={{ color: "var(--ink-faint)" }}>{label}</dt>
      <dd
        className={mono ? "font-mono text-[13px] text-right break-all" : "text-right"}
        style={{ color: "var(--ink)" }}
      >
        {value}
      </dd>
    </div>
  );
}

function typeLabel(t: string) {
  if (t === "purchase") return "新购";
  if (t === "renew") return "续费";
  if (t === "recharge") return "充值";
  return t;
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M5 12l5 5L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 3a9 9 0 1 1-6.36 2.64" />
    </svg>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page flex min-h-[60vh] items-center justify-center">
          <div className="skeleton h-48 w-full max-w-lg" />
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
