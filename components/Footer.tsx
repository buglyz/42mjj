import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="logo-mark flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-semibold">
                42
              </span>
              <span className="text-sm font-semibold tracking-tight">42mjj</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              全球节点云产品销售门户。VPS、裸金属、住宅 IP、CDN——用 LDC 积分预存支付。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
                产品
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--ink-secondary)" }}>
                <li>
                  <Link href="/products" className="hover:opacity-80">
                    全部商店
                  </Link>
                </li>
                <li>
                  <Link href="/products?group=香港" className="hover:opacity-80">
                    香港节点
                  </Link>
                </li>
                <li>
                  <Link href="/products?group=CDN" className="hover:opacity-80">
                    CDN
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
                账户
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--ink-secondary)" }}>
                <li>
                  <Link href="/services" className="hover:opacity-80">
                    我的服务
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:opacity-80">
                    钱包充值
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
                社区
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "var(--ink-secondary)" }}>
                <li>
                  <a
                    href="https://linux.do"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-80"
                  >
                    LinuxDo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--border)", color: "var(--ink-faint)" }}
        >
          <span>© {new Date().getFullYear()} 42mjj · 预存模式 · LDC 结算</span>
          <span className="font-mono">design rebuild contest</span>
        </div>
      </div>
    </footer>
  );
}
