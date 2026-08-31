/*
# VIDENTRA — Core Database Schema

## Overview
Creates the core tables for the VIDENTRA forensic analysis platform: cases, evidence, devices, timeline events, and audit entries. This is a single-tenant demo application with no authentication, so all policies allow both anon and authenticated roles.

## New Tables

1. **cases** — Forensic investigation cases
2. **evidence** — Forensic evidence items
3. **devices** — DVR/NVR devices
4. **timeline_events** — Investigation timeline events
5. **audit_entries** — Chain of custody audit trail

## Security
- RLS enabled on all tables.
- All tables allow anon + authenticated CRUD (single-tenant demo app, data is intentionally shared).
*/

-- Cases table
CREATE TABLE IF NOT EXISTS cases (
  id text PRIMARY KEY,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  investigator text NOT NULL,
  device text NOT NULL,
  vendor text NOT NULL,
  evidence_count integer NOT NULL DEFAULT 0,
  device_count integer NOT NULL DEFAULT 0,
  integrity integer NOT NULL DEFAULT 100,
  created_at text NOT NULL,
  last_activity text NOT NULL,
  priority text NOT NULL DEFAULT 'medium',
  description text NOT NULL DEFAULT '',
  pipeline_acquisition text NOT NULL DEFAULT 'pending',
  pipeline_verification text NOT NULL DEFAULT 'pending',
  pipeline_recovery text NOT NULL DEFAULT 'pending',
  pipeline_analysis text NOT NULL DEFAULT 'pending',
  pipeline_reporting text NOT NULL DEFAULT 'pending'
);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cases" ON cases;
CREATE POLICY "anon_select_cases" ON cases FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cases" ON cases;
CREATE POLICY "anon_insert_cases" ON cases FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cases" ON cases;
CREATE POLICY "anon_update_cases" ON cases FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cases" ON cases;
CREATE POLICY "anon_delete_cases" ON cases FOR DELETE
  TO anon, authenticated USING (true);

-- Evidence table
CREATE TABLE IF NOT EXISTS evidence (
  id text PRIMARY KEY,
  file_name text NOT NULL,
  source_device text NOT NULL,
  vendor text NOT NULL,
  camera text NOT NULL,
  timestamp text NOT NULL,
  size text NOT NULL,
  sha256 text NOT NULL,
  integrity text NOT NULL DEFAULT 'pending',
  status text NOT NULL DEFAULT 'acquired',
  type text NOT NULL DEFAULT 'video',
  case_id text NOT NULL,
  duration text NOT NULL DEFAULT '',
  recovered boolean NOT NULL DEFAULT false,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_evidence" ON evidence;
CREATE POLICY "anon_select_evidence" ON evidence FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_evidence" ON evidence;
CREATE POLICY "anon_insert_evidence" ON evidence FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_evidence" ON evidence;
CREATE POLICY "anon_update_evidence" ON evidence FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_evidence" ON evidence;
CREATE POLICY "anon_delete_evidence" ON evidence FOR DELETE
  TO anon, authenticated USING (true);

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
  id text PRIMARY KEY,
  vendor text NOT NULL,
  model text NOT NULL,
  status text NOT NULL DEFAULT 'offline',
  storage text NOT NULL,
  storage_used text NOT NULL,
  cameras integer NOT NULL DEFAULT 0,
  last_connected text NOT NULL,
  compatibility text NOT NULL DEFAULT 'medium',
  protocols text[] NOT NULL DEFAULT '{}',
  ip_address text NOT NULL DEFAULT 'N/A'
);

ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_devices" ON devices;
CREATE POLICY "anon_select_devices" ON devices FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_devices" ON devices;
CREATE POLICY "anon_insert_devices" ON devices FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_devices" ON devices;
CREATE POLICY "anon_update_devices" ON devices FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_devices" ON devices;
CREATE POLICY "anon_delete_devices" ON devices FOR DELETE
  TO anon, authenticated USING (true);

-- Timeline events table
CREATE TABLE IF NOT EXISTS timeline_events (
  id text PRIMARY KEY,
  case_id text NOT NULL,
  timestamp text NOT NULL,
  type text NOT NULL,
  label text NOT NULL,
  camera text NOT NULL,
  evidence_id text,
  description text NOT NULL DEFAULT '',
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_timeline" ON timeline_events;
CREATE POLICY "anon_select_timeline" ON timeline_events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_timeline" ON timeline_events;
CREATE POLICY "anon_insert_timeline" ON timeline_events FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_timeline" ON timeline_events;
CREATE POLICY "anon_update_timeline" ON timeline_events FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_timeline" ON timeline_events;
CREATE POLICY "anon_delete_timeline" ON timeline_events FOR DELETE
  TO anon, authenticated USING (true);

-- Audit entries table
CREATE TABLE IF NOT EXISTS audit_entries (
  id text PRIMARY KEY,
  timestamp text NOT NULL,
  date text NOT NULL,
  action text NOT NULL,
  actor text NOT NULL,
  evidence_id text NOT NULL DEFAULT 'N/A',
  hash text NOT NULL DEFAULT 'N/A',
  status text NOT NULL DEFAULT 'verified',
  case_id text NOT NULL
);

ALTER TABLE audit_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_audit" ON audit_entries;
CREATE POLICY "anon_select_audit" ON audit_entries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_audit" ON audit_entries;
CREATE POLICY "anon_insert_audit" ON audit_entries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_audit" ON audit_entries;
CREATE POLICY "anon_update_audit" ON audit_entries FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_audit" ON audit_entries;
CREATE POLICY "anon_delete_audit" ON audit_entries FOR DELETE
  TO anon, authenticated USING (true);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_evidence_case_id ON evidence(case_id);
CREATE INDEX IF NOT EXISTS idx_timeline_case_id ON timeline_events(case_id);
CREATE INDEX IF NOT EXISTS idx_audit_case_id ON audit_entries(case_id);
