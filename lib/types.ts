export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type User = {
  id: string;
  username: string;
};

export type AuthMe = {
  enabled: boolean;
  logged_in: boolean;
  is_admin: boolean;
  login_url: string;
  logout_url: string;
  user: User | null;
};

export type ProductSpec = {
  cpu?: number;
  memory?: number;
  disk?: number;
  bandwidth?: string;
  traffic?: string;
  nodes?: string;
  ddos?: string;
  [key: string]: string | number | undefined;
};

export type CatalogItem = {
  store_sku: string;
  name: string;
  description: string;
  price_ldc: number;
  renew_price_ldc: number;
  currency: string;
  term_months: number;
  capabilities: string[];
  status: "active" | "sold_out" | "disabled";
  group_name: string;
  stock: number;
  spec: ProductSpec;
};

export type WalletAccount = {
  user_id: string;
  username: string;
  balance: string;
  balance_cents: number;
  locked: string;
  locked_cents: number;
  total_recharged: string;
  total_spent: string;
};

export type WalletTransaction = {
  id: number;
  type: string;
  amount: string;
  balance_after: string;
  description: string;
  created_at: string;
};

export type WalletData = {
  account: WalletAccount;
  debts: unknown[];
  transactions: WalletTransaction[];
  rules: {
    down_payment_percent: number;
    repayment_days: number;
  };
};

export type ServiceItem = {
  service_key: string;
  container_name: string;
  display_name: string;
  plan_key: string;
  plan_name: string;
  renew_price: number;
  panel_url: string;
  access_code: string;
  source_order_id: string;
  expires_at: string;
  service_start_at: string;
  last_renewed_at: string | null;
  service_status: "active" | "expired" | "suspended" | "pending";
  actions: string[];
  capabilities: string[];
  spec: ProductSpec;
};

export type ServicesData = {
  items: ServiceItem[];
  wallet: WalletAccount;
  debts: unknown[];
};

export type OrderData = {
  order_no: string;
  amount: string;
  amount_ldc: string;
  total_amount: string;
  paid_amount: string;
  wallet_amount: string;
  remaining_amount: string;
  down_payment_required: string;
  minimum_to_activate: string;
  payment_status: "unpaid" | "paid" | "pending" | "failed";
  debt_status: string;
  plan_key: string;
  plan_name: string;
  order_type: "purchase" | "renew" | "recharge";
  target_container: string | null;
  pay_url: string | null;
  pay_params: Record<string, string> | null;
  redirect_url: string;
};

export type CreateOrderRequest = {
  order_type: "purchase" | "renew";
  plan_key: string;
  target_container?: string;
  payment_amount?: number;
};

export type CreateRechargeRequest = {
  amount: number;
};
