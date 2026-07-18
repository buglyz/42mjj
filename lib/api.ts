import {
  mockCatalog,
  mockCreateOrder,
  mockCreateRecharge,
  mockMe,
  mockQueryOrder,
  mockServices,
  mockWallet,
} from "./mock";
import type {
  ApiResponse,
  AuthMe,
  CatalogItem,
  CreateOrderRequest,
  OrderData,
  ServicesData,
  WalletData,
} from "./types";

/** 开发环境全程走 Mock；设 NEXT_PUBLIC_USE_REAL_API=1 可切真实接口 */
const USE_MOCK = process.env.NEXT_PUBLIC_USE_REAL_API !== "1";

const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms));

async function realFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(path, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  return res.json() as Promise<ApiResponse<T>>;
}

export async function getMe(): Promise<ApiResponse<AuthMe>> {
  if (USE_MOCK) {
    await delay(180);
    return structuredClone(mockMe);
  }
  return realFetch<AuthMe>("/auth/me.php");
}

export async function getCatalog(): Promise<
  ApiResponse<{ items: CatalogItem[] }>
> {
  if (USE_MOCK) {
    await delay(320);
    return structuredClone(mockCatalog);
  }
  return realFetch<{ items: CatalogItem[] }>("/api/catalog.php");
}

export async function getWallet(): Promise<ApiResponse<WalletData>> {
  if (USE_MOCK) {
    await delay(220);
    return structuredClone(mockWallet);
  }
  return realFetch<WalletData>("/api/wallet.php");
}

export async function getServices(): Promise<ApiResponse<ServicesData>> {
  if (USE_MOCK) {
    await delay(260);
    return structuredClone(mockServices);
  }
  return realFetch<ServicesData>("/api/my_containers.php");
}

export async function createOrder(
  body: CreateOrderRequest
): Promise<ApiResponse<OrderData>> {
  if (USE_MOCK) {
    await delay(400);
    return mockCreateOrder(body);
  }
  return realFetch<OrderData>("/api/create_order.php", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function createRecharge(
  amount: number
): Promise<ApiResponse<OrderData>> {
  if (USE_MOCK) {
    await delay(350);
    return mockCreateRecharge(amount);
  }
  return realFetch<OrderData>("/api/create_recharge.php", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
}

export async function queryOrder(
  orderNo: string
): Promise<ApiResponse<OrderData>> {
  if (USE_MOCK) {
    await delay(300);
    return mockQueryOrder(orderNo);
  }
  return realFetch<OrderData>(
    `/api/query_order.php?order_no=${encodeURIComponent(orderNo)}`
  );
}

/** 余额足够时跳 success；不足则尝试 epay 表单提交（mock 下模拟 alert） */
export function handlePaymentRedirect(order: OrderData): void {
  if (order.payment_status === "paid" || order.remaining_amount === "0.00") {
    window.location.href = order.redirect_url || `/success?order_no=${order.order_no}`;
    return;
  }
  if (order.pay_url && order.pay_params) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = order.pay_url;
    form.style.display = "none";
    for (const [k, v] of Object.entries(order.pay_params)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    // Mock 环境 epay 不存在：直接带参数去成功页演示
    if (USE_MOCK) {
      window.location.href = `/success?order_no=${order.order_no}`;
      return;
    }
    form.submit();
    return;
  }
  window.location.href = `/success?order_no=${order.order_no}`;
}
