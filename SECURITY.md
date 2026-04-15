# BÚ-BĀNG 官網 — 資安防護說明

## 防護層次總覽

```
瀏覽器 (Client)
  ├─ CSP Header            防 XSS / 惡意腳本注入
  ├─ textContent only      防 DOM XSS
  ├─ Input validation      防格式錯誤資料
  ├─ Client rate limit     防使用者連按
  └─ Anchor href allowlist 防 javascript: URI

Vercel Edge (CDN / Transport)
  ├─ HSTS                  強制 HTTPS
  ├─ X-Frame-Options: DENY 防 Clickjacking
  ├─ X-Content-Type        防 MIME sniffing
  └─ Referrer-Policy       限制 referrer 洩漏

API Route (Server)
  ├─ Origin check          防 CSRF（非同源請求拒絕）
  ├─ Content-Type guard    防非 JSON payload 注入
  ├─ Server rate limit     防暴力灌名單（5次/分/IP）
  ├─ Payload size check    防大型 payload DoS
  ├─ Input allowlist       防 role/kit_type 枚舉外的值
  ├─ HTML strip            防 Stored XSS via 資料庫
  └─ Retry-After header    符合 RFC 6585

Supabase (Database)
  ├─ RLS anon=INSERT only  anon key 無法讀取、修改、刪除任何資料
  ├─ CHECK constraints     資料庫層二次驗證（name/email/role/message 長度與格式）
  ├─ UNIQUE index          lower(email) 大小寫不敏感去重
  └─ IP hashing (FNV-1a)   不儲存原始 IP，符合 GDPR Article 4(1)
```

## 各威脅對應措施

| 威脅 | 措施 |
|------|------|
| XSS（反射型）| CSP `script-src 'self'`，禁止 inline script |
| XSS（儲存型）| `stripHtml()` 清除所有 HTML 標籤，`textContent` 渲染回應 |
| CSRF | API Origin header 驗證，非正確來源 → 403 |
| SQL Injection | Supabase parameterised REST API，不拼接 SQL |
| 暴力灌名單 | 服務端 5次/分/IP + 客戶端 3次/session |
| Clickjacking | `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` |
| 敏感資料洩漏 | 錯誤訊息不暴露 stack trace；IP 做 hash 後才存 |
| MIME confusion | `X-Content-Type-Options: nosniff` |
| 中間人攻擊 | HSTS `max-age=63072000; includeSubDomains; preload` |
| Open redirect | anchor href 只接受 `#[a-zA-Z][\w-]*` 格式 |
| DoS (payload) | 8KB payload 上限檢查 + 10s request timeout |

## 尚未實作（建議 v1.0 前補上）

| 項目 | 說明 | 工具 |
|------|------|------|
| 持久化 Rate Limit | 目前限流重啟後重置 | Upstash Redis / Vercel KV |
| CAPTCHA | 對抗自動化機器人 | Cloudflare Turnstile（免費） |
| Email 確認流程 | 防假 email 爆量 | 加 confirmed=true 驗證連結 |
| 依賴掃描 | 定期審查 npm 套件 | `npm audit` / Dependabot |
| Security.txt | 揭露回報管道 | `/.well-known/security.txt` |

## 環境變數安全提醒

- `SUPABASE_SERVICE_KEY` 只能存在 Vercel 環境變數，**絕不能暴露給前端**
- `SUPABASE_ANON_KEY` 目前未使用（所有 API call 走 service_role）
- 本地開發用 `.env.local`，**加入 .gitignore**，永遠不 commit
