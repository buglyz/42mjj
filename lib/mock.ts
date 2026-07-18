import type {
  ApiResponse,
  AuthMe,
  CatalogItem,
  CreateOrderRequest,
  OrderData,
  ServicesData,
  WalletData,
} from "./types";

export const mockMe: ApiResponse<AuthMe> = {
  code: 200,
  message: "ok",
  data: {
    enabled: true,
    logged_in: true,
    is_admin: false,
    login_url: "/auth/linuxdo/start.php?return=%2F",
    logout_url: "/auth/logout.php",
    user: { id: "30", username: "bdigu" },
  },
};

export const mockCatalogItems: CatalogItem[] = [
  {
    store_sku: "hk_15_cn2_mini",
    name: "香港15区CN2流量云 | Mini",
    description:
      "处理器: 1核 AMD EPYC | 内存: 512M DDR4 ECC | 硬盘: 10G NVMe | 带宽: 30Mbps | 流量: 500G/月 | CN2 GIA",
    price_ldc: 1600,
    renew_price_ldc: 1600,
    currency: "LDC",
    term_months: 1,
    capabilities: ["1 核", "512M", "10G NVMe", "30Mbps", "CN2 GIA"],
    status: "active",
    group_name: "香港15区CN2流量云",
    stock: 40,
    spec: { cpu: 1, memory: 512, disk: 10, bandwidth: "30Mbps", traffic: "500G" },
  },
  {
    store_sku: "us_10_premium_b",
    name: "美国10区精品 | B型",
    description:
      "处理器: 2核 AMD EPYC | 内存: 2G DDR4 ECC | 硬盘: 30G NVMe | 带宽: 100Mbps | 流量: 1T/月 | 三网9929",
    price_ldc: 3000,
    renew_price_ldc: 3000,
    currency: "LDC",
    term_months: 1,
    capabilities: ["2 核", "2G", "30G NVMe", "100Mbps", "9929 优化"],
    status: "active",
    group_name: "美国10区精品",
    stock: 20,
    spec: { cpu: 2, memory: 2048, disk: 30, bandwidth: "100Mbps", traffic: "1T" },
  },
  {
    store_sku: "de_ecom_2_a",
    name: "电商德国2区 | 双ISP住宅 A型",
    description:
      "核心: 4核 | 内存: 4G | 硬盘: 40G NVMe | 带宽: 500Mbps | 流量: 1000G | 双ISP住宅IP | 解锁TikTok/亚马逊",
    price_ldc: 6000,
    renew_price_ldc: 6000,
    currency: "LDC",
    term_months: 1,
    capabilities: ["4 核", "4G", "40G NVMe", "500Mbps", "双ISP 住宅", "解锁 TikTok"],
    status: "active",
    group_name: "电商德国 2区",
    stock: 10,
    spec: { cpu: 4, memory: 4096, disk: 40, bandwidth: "500Mbps", traffic: "1000G" },
  },
  {
    store_sku: "hk_baremetal_e5",
    name: "香港裸金属服务器 | E5-2696v4",
    description:
      "核心: 16核 100%性能 | 内存: 32G DDR4 ECC | 硬盘: 240G NVMe | 带宽: 100Mbps 独享 | 不限流量 | 独立 IP",
    price_ldc: 45000,
    renew_price_ldc: 45000,
    currency: "LDC",
    term_months: 1,
    capabilities: ["16 核", "32G", "240G NVMe", "100Mbps 独享", "不限流量", "裸金属"],
    status: "active",
    group_name: "香港裸金属服务器",
    stock: 3,
    spec: {
      cpu: 16,
      memory: 32768,
      disk: 240,
      bandwidth: "100Mbps独享",
      traffic: "不限",
    },
  },
  {
    store_sku: "qyycn_asia",
    name: "QYYCDN 亚太体验版",
    description:
      "节点: 35+ | 可绑域名: 1 个 | 月流量: 50 GiB | 带宽峰值: 15 Mbps | DDoS 防护: 800 Gbps",
    price_ldc: 100,
    renew_price_ldc: 100,
    currency: "LDC",
    term_months: 1,
    capabilities: ["35+ 节点", "50G 流量", "15Mbps", "800G DDoS 防护"],
    status: "active",
    group_name: "QYYCDN",
    stock: 100,
    spec: { nodes: "35+", traffic: "50G", bandwidth: "15Mbps", ddos: "800G" },
  },
  {
    store_sku: "jp_softbank_a",
    name: "日本软银优化 | A型",
    description:
      "处理器: 2核 | 内存: 2G | 硬盘: 40G NVMe | 带宽: 200Mbps | 流量: 2T/月 | SoftBank 线路",
    price_ldc: 4200,
    renew_price_ldc: 4200,
    currency: "LDC",
    term_months: 1,
    capabilities: ["2 核", "2G", "40G NVMe", "200Mbps", "SoftBank"],
    status: "active",
    group_name: "日本软银优化",
    stock: 15,
    spec: { cpu: 2, memory: 2048, disk: 40, bandwidth: "200Mbps", traffic: "2T" },
  },
  {
    store_sku: "sg_bwh_c",
    name: "新加坡精品云 | C型",
    description:
      "处理器: 4核 | 内存: 8G | 硬盘: 80G NVMe | 带宽: 1Gbps | 流量: 3T/月 | 国际优质线路",
    price_ldc: 8800,
    renew_price_ldc: 8800,
    currency: "LDC",
    term_months: 1,
    capabilities: ["4 核", "8G", "80G NVMe", "1Gbps", "3T 流量"],
    status: "active",
    group_name: "新加坡精品云",
    stock: 8,
    spec: { cpu: 4, memory: 8192, disk: 80, bandwidth: "1Gbps", traffic: "3T" },
  },
  {
    store_sku: "res_us_static",
    name: "美国静态住宅 IP | 月付",
    description: "纯净住宅 IP · 原生 ISP · 支持主流电商与社媒 · 按月计费",
    price_ldc: 2500,
    renew_price_ldc: 2500,
    currency: "LDC",
    term_months: 1,
    capabilities: ["静态住宅", "原生 ISP", "电商友好", "月付"],
    status: "active",
    group_name: "住宅 IP",
    stock: 50,
    spec: { bandwidth: "100Mbps", traffic: "不限" },
  },
];

export const mockCatalog: ApiResponse<{ items: CatalogItem[] }> = {
  code: 200,
  message: "ok",
  data: { items: mockCatalogItems },
};

export const mockWallet: ApiResponse<WalletData> = {
  code: 200,
  message: "查询成功",
  data: {
    account: {
      user_id: "30",
      username: "bdigu",
      balance: "5950.00",
      balance_cents: 595000,
      locked: "0.00",
      locked_cents: 0,
      total_recharged: "8150.00",
      total_spent: "2200.00",
    },
    debts: [],
    transactions: [
      {
        id: 20,
        type: "recharge",
        amount: "126.00",
        balance_after: "0.00",
        description: "充值",
        created_at: "2026-07-14 12:12:00",
      },
      {
        id: 21,
        type: "purchase",
        amount: "-1600.00",
        balance_after: "4350.00",
        description: "购买 香港15区CN2流量云",
        created_at: "2026-07-14 12:15:00",
      },
      {
        id: 22,
        type: "recharge",
        amount: "1600.00",
        balance_after: "5950.00",
        description: "充值",
        created_at: "2026-07-15 09:00:00",
      },
    ],
    rules: { down_payment_percent: 100, repayment_days: 7 },
  },
};

export const mockServices: ApiResponse<ServicesData> = {
  code: 200,
  message: "ok",
  data: {
    items: [
      {
        service_key: "svc_899904",
        container_name: "香港15区CN2流量云",
        display_name: "香港15区CN2流量云",
        plan_key: "hk_15_cn2_mini",
        plan_name: "香港15区CN2流量云 | Mini",
        renew_price: 1600,
        panel_url: "https://panel.42w.shop/dashboard/899904",
        access_code: "528caab242fb0255",
        source_order_id: "RW202607142011227154",
        expires_at: "2026-08-14 12:11:00",
        service_start_at: "2026-07-14 12:11:00",
        last_renewed_at: null,
        service_status: "active",
        actions: ["renew", "console"],
        capabilities: ["1 核", "512M", "10G NVMe", "30Mbps", "CN2 GIA"],
        spec: {
          cpu: 1,
          memory: 512,
          disk: 10,
          bandwidth: "30Mbps",
          traffic: "500G",
        },
      },
      {
        service_key: "svc_900112",
        container_name: "QYYCDN 亚太体验版",
        display_name: "QYYCDN 亚太体验版",
        plan_key: "qyycn_asia",
        plan_name: "QYYCDN 亚太体验版",
        renew_price: 100,
        panel_url: "https://panel.42w.shop/dashboard/900112",
        access_code: "a91f0c3e7b2d8841",
        source_order_id: "RW202607101122334455",
        expires_at: "2026-08-10 18:00:00",
        service_start_at: "2026-07-10 18:00:00",
        last_renewed_at: null,
        service_status: "active",
        actions: ["renew", "console"],
        capabilities: ["35+ 节点", "50G 流量", "15Mbps", "800G DDoS 防护"],
        spec: {
          nodes: "35+",
          traffic: "50G",
          bandwidth: "15Mbps",
          ddos: "800G",
        },
      },
    ],
    wallet: mockWallet.data.account,
    debts: [],
  },
};

const orderStore = new Map<string, OrderData>();

export function mockCreateOrder(
  body: CreateOrderRequest
): ApiResponse<OrderData> {
  const item = mockCatalogItems.find((p) => p.store_sku === body.plan_key);
  const price = item?.price_ldc ?? 1600;
  const planName = item?.name ?? body.plan_key;
  const balance = mockWallet.data.account.balance_cents / 100;
  const orderNo = "RW" + Date.now();
  const enough = balance >= price;

  const data: OrderData = {
    order_no: orderNo,
    amount: price.toFixed(2),
    amount_ldc: String(price),
    total_amount: price.toFixed(2),
    paid_amount: enough ? price.toFixed(2) : "0.00",
    wallet_amount: enough ? price.toFixed(2) : "0.00",
    remaining_amount: enough ? "0.00" : price.toFixed(2),
    down_payment_required: price.toFixed(2),
    minimum_to_activate: enough ? "0.00" : price.toFixed(2),
    payment_status: enough ? "paid" : "unpaid",
    debt_status: "none",
    plan_key: body.plan_key,
    plan_name: planName,
    order_type: body.order_type,
    target_container: body.target_container ?? null,
    pay_url: enough ? null : "https://epay.example.com/pay",
    pay_params: enough
      ? null
      : { order_no: orderNo, amount: price.toFixed(2) },
    redirect_url: `/success?order_no=${orderNo}`,
  };

  orderStore.set(orderNo, data);
  return { code: 200, message: "ok", data };
}

export function mockCreateRecharge(amount: number): ApiResponse<OrderData> {
  const orderNo = "RC" + Date.now();
  const data: OrderData = {
    order_no: orderNo,
    amount: amount.toFixed(2),
    amount_ldc: String(amount),
    total_amount: amount.toFixed(2),
    paid_amount: "0.00",
    wallet_amount: "0.00",
    remaining_amount: amount.toFixed(2),
    down_payment_required: amount.toFixed(2),
    minimum_to_activate: amount.toFixed(2),
    payment_status: "unpaid",
    debt_status: "none",
    plan_key: "recharge",
    plan_name: "钱包充值",
    order_type: "recharge",
    target_container: null,
    pay_url: "https://epay.example.com/pay",
    pay_params: { order_no: orderNo, amount: amount.toFixed(2) },
    redirect_url: `/success?order_no=${orderNo}`,
  };
  orderStore.set(orderNo, data);
  return { code: 200, message: "ok", data };
}

export function mockQueryOrder(orderNo: string): ApiResponse<OrderData> {
  const existing = orderStore.get(orderNo);
  if (existing) {
    // Simulate eventual paid for demo if unpaid recharge viewed on success page
    if (existing.payment_status === "unpaid" && orderNo.startsWith("RC")) {
      const paid: OrderData = {
        ...existing,
        payment_status: "paid",
        paid_amount: existing.total_amount,
        remaining_amount: "0.00",
        minimum_to_activate: "0.00",
        pay_url: null,
      };
      orderStore.set(orderNo, paid);
      return { code: 200, message: "ok", data: paid };
    }
    return { code: 200, message: "ok", data: existing };
  }

  // Fallback synthetic paid order for deep links
  const data: OrderData = {
    order_no: orderNo,
    amount: "1600.00",
    amount_ldc: "1600",
    total_amount: "1600.00",
    paid_amount: "1600.00",
    wallet_amount: "1600.00",
    remaining_amount: "0.00",
    down_payment_required: "1600.00",
    minimum_to_activate: "0.00",
    payment_status: "paid",
    debt_status: "none",
    plan_key: "hk_15_cn2_mini",
    plan_name: "香港15区CN2流量云 | Mini",
    order_type: "purchase",
    target_container: null,
    pay_url: null,
    pay_params: null,
    redirect_url: `/success?order_no=${orderNo}`,
  };
  return { code: 200, message: "ok", data };
}
