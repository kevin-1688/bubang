-- ═══════════════════════════════════════════════════
-- BÚ-BĀNG 官網 — Supabase Schema  ·  Security v2
-- 執行：Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════

-- ── 1. Waitlist ────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name)  BETWEEN 1 AND 100),
  email       TEXT        NOT NULL UNIQUE
                          CHECK (char_length(email) BETWEEN 5 AND 254
                                 AND email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  role        TEXT        NOT NULL DEFAULT 'other'
                          CHECK (role IN ('player','press','publisher','investor','partner','other')),
  message     TEXT        CHECK (char_length(message) <= 1000),
  locale      TEXT        DEFAULT 'zh-TW' CHECK (char_length(locale) <= 10),
  source      TEXT        DEFAULT 'website' CHECK (char_length(source) <= 50),
  confirmed   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. Press kit downloads ─────────────────────────
CREATE TABLE IF NOT EXISTS press_downloads (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  kit_type    TEXT        NOT NULL
                          CHECK (kit_type IN ('fact_sheet','logo_pack','screenshots','press_release')),
  ip_hash     TEXT        CHECK (char_length(ip_hash) <= 32),   -- FNV-1a hex
  referrer    TEXT        CHECK (char_length(referrer) <= 500),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. Page events ─────────────────────────────────
CREATE TABLE IF NOT EXISTS page_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  event       TEXT        NOT NULL CHECK (char_length(event) <= 50),
  section     TEXT        CHECK (char_length(section) <= 50),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RLS ────────────────────────────────────────────
ALTER TABLE waitlist        ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_events     ENABLE ROW LEVEL SECURITY;

-- anon can INSERT only (no SELECT, no UPDATE, no DELETE)
CREATE POLICY "anon_insert_waitlist"
  ON waitlist FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_press_downloads"
  ON press_downloads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_page_events"
  ON page_events FOR INSERT TO anon WITH CHECK (true);

-- service_role can do anything (used only by your API routes)
CREATE POLICY "service_select_waitlist"
  ON waitlist FOR SELECT TO service_role USING (true);
CREATE POLICY "service_update_waitlist"
  ON waitlist FOR UPDATE TO service_role USING (true);
CREATE POLICY "service_delete_waitlist"
  ON waitlist FOR DELETE TO service_role USING (true);

CREATE POLICY "service_select_downloads"
  ON press_downloads FOR SELECT TO service_role USING (true);

-- ── Trigger: auto-update updated_at ────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_waitlist_updated_at ON waitlist;
CREATE TRIGGER trg_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Indexes ────────────────────────────────────────
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email
  ON waitlist (lower(email));                      -- case-insensitive unique

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at
  ON waitlist (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_waitlist_role
  ON waitlist (role);

CREATE INDEX IF NOT EXISTS idx_press_dl_created_at
  ON press_downloads (created_at DESC);

-- ── Useful admin queries ───────────────────────────
-- Run these in Supabase SQL Editor (service_role context)

-- 全部報名者
-- SELECT id, name, email, role, created_at FROM waitlist ORDER BY created_at DESC;

-- 依身份統計
-- SELECT role, count(*) FROM waitlist GROUP BY role ORDER BY count DESC;

-- 今日新增
-- SELECT count(*) FROM waitlist WHERE created_at >= current_date;

-- Press Kit 下載統計
-- SELECT kit_type, count(*) FROM press_downloads GROUP BY kit_type ORDER BY count DESC;
