import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Case, Evidence, Device, TimelineEvent, AuditEntry } from '@/types';
import { cases as mockCases, getCaseById as getMockCaseById } from '@/data/cases';
import { evidence as mockEvidence, getEvidenceById as getMockEvidenceById, getEvidenceByCaseId as getMockEvidenceByCaseId } from '@/data/evidence';
import { devices as mockDevices } from '@/data/devices';
import { timelineEvents as mockTimeline, getTimelineByCaseId as getMockTimelineByCaseId } from '@/data/timeline';
import { auditEntries as mockAudit } from '@/data/audit';

// Database row types (snake_case from Postgres)
interface CaseRow {
  id: string;
  name: string;
  status: string;
  investigator: string;
  device: string;
  vendor: string;
  evidence_count: number;
  device_count: number;
  integrity: number;
  created_at: string;
  last_activity: string;
  priority: string;
  description: string;
  pipeline_acquisition: string;
  pipeline_verification: string;
  pipeline_recovery: string;
  pipeline_analysis: string;
  pipeline_reporting: string;
}

interface EvidenceRow {
  id: string;
  file_name: string;
  source_device: string;
  vendor: string;
  camera: string;
  timestamp: string;
  size: string;
  sha256: string;
  integrity: string;
  status: string;
  type: string;
  case_id: string;
  duration: string;
  recovered: boolean;
}

interface DeviceRow {
  id: string;
  vendor: string;
  model: string;
  status: string;
  storage: string;
  storage_used: string;
  cameras: number;
  last_connected: string;
  compatibility: string;
  protocols: string[];
  ip_address: string;
}

interface TimelineRow {
  id: string;
  case_id: string;
  timestamp: string;
  type: string;
  label: string;
  camera: string;
  evidence_id: string | null;
  description: string;
}

interface AuditRow {
  id: string;
  timestamp: string;
  date: string;
  action: string;
  actor: string;
  evidence_id: string;
  hash: string;
  status: string;
  case_id: string;
}

function mapCase(row: CaseRow): Case {
  return {
    id: row.id,
    name: row.name,
    status: row.status as Case['status'],
    investigator: row.investigator,
    device: row.device,
    vendor: row.vendor as Case['vendor'],
    evidenceCount: row.evidence_count,
    deviceCount: row.device_count,
    integrity: row.integrity,
    createdAt: row.created_at,
    lastActivity: row.last_activity,
    priority: row.priority as Case['priority'],
    description: row.description,
    pipeline: {
      acquisition: row.pipeline_acquisition as Case['pipeline']['acquisition'],
      verification: row.pipeline_verification as Case['pipeline']['verification'],
      recovery: row.pipeline_recovery as Case['pipeline']['recovery'],
      analysis: row.pipeline_analysis as Case['pipeline']['analysis'],
      reporting: row.pipeline_reporting as Case['pipeline']['reporting'],
    },
  };
}

function mapEvidence(row: EvidenceRow): Evidence {
  return {
    id: row.id,
    fileName: row.file_name,
    sourceDevice: row.source_device,
    vendor: row.vendor as Evidence['vendor'],
    camera: row.camera,
    timestamp: row.timestamp,
    size: row.size,
    sizeBytes: 0,
    sha256: row.sha256,
    integrity: row.integrity as Evidence['integrity'],
    status: row.status as Evidence['status'],
    type: row.type as Evidence['type'],
    caseId: row.case_id,
    duration: row.duration,
    recovered: row.recovered,
  };
}

function mapDevice(row: DeviceRow): Device {
  return {
    id: row.id,
    vendor: row.vendor as Device['vendor'],
    model: row.model,
    status: row.status as Device['status'],
    storage: row.storage,
    storageUsed: row.storage_used,
    cameras: row.cameras,
    lastConnected: row.last_connected,
    compatibility: row.compatibility as Device['compatibility'],
    protocols: row.protocols,
    ipAddress: row.ip_address,
  };
}

function mapTimeline(row: TimelineRow): TimelineEvent {
  return {
    id: row.id,
    caseId: row.case_id,
    timestamp: row.timestamp,
    type: row.type as TimelineEvent['type'],
    label: row.label,
    camera: row.camera,
    evidenceId: row.evidence_id || undefined,
    description: row.description,
  };
}

function mapAudit(row: AuditRow): AuditEntry {
  return {
    id: row.id,
    timestamp: row.timestamp,
    date: row.date,
    action: row.action,
    user: row.actor,
    evidenceId: row.evidence_id,
    hash: row.hash,
    status: row.status as AuditEntry['status'],
    caseId: row.case_id,
  };
}

// API functions with fallback to mock data
export const api = {
  async getCases(): Promise<Case[]> {
    if (!isSupabaseConfigured) return mockCases;
    const { data, error } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
    if (error || !data) return mockCases;
    return (data as CaseRow[]).map(mapCase);
  },

  async getCaseById(id: string): Promise<Case | undefined> {
    if (!isSupabaseConfigured) return getMockCaseById(id);
    const { data, error } = await supabase.from('cases').select('*').eq('id', id).maybeSingle();
    if (error || !data) return getMockCaseById(id);
    return mapCase(data as CaseRow);
  },

  async getEvidence(): Promise<Evidence[]> {
    if (!isSupabaseConfigured) return mockEvidence;
    const { data, error } = await supabase.from('evidence').select('*').order('timestamp', { ascending: false });
    if (error || !data) return mockEvidence;
    return (data as EvidenceRow[]).map(mapEvidence);
  },

  async getEvidenceById(id: string): Promise<Evidence | undefined> {
    if (!isSupabaseConfigured) return getMockEvidenceById(id);
    const { data, error } = await supabase.from('evidence').select('*').eq('id', id).maybeSingle();
    if (error || !data) return getMockEvidenceById(id);
    return mapEvidence(data as EvidenceRow);
  },

  async getEvidenceByCaseId(caseId: string): Promise<Evidence[]> {
    if (!isSupabaseConfigured) return getMockEvidenceByCaseId(caseId);
    const { data, error } = await supabase.from('evidence').select('*').eq('case_id', caseId).order('timestamp', { ascending: false });
    if (error || !data) return getMockEvidenceByCaseId(caseId);
    return (data as EvidenceRow[]).map(mapEvidence);
  },

  async getDevices(): Promise<Device[]> {
    if (!isSupabaseConfigured) return mockDevices;
    const { data, error } = await supabase.from('devices').select('*').order('vendor', { ascending: true });
    if (error || !data) return mockDevices;
    return (data as DeviceRow[]).map(mapDevice);
  },

  async getTimeline(): Promise<TimelineEvent[]> {
    if (!isSupabaseConfigured) return mockTimeline;
    const { data, error } = await supabase.from('timeline_events').select('*').order('timestamp', { ascending: true });
    if (error || !data) return mockTimeline;
    return (data as TimelineRow[]).map(mapTimeline);
  },

  async getTimelineByCaseId(caseId: string): Promise<TimelineEvent[]> {
    if (!isSupabaseConfigured) return getMockTimelineByCaseId(caseId);
    const { data, error } = await supabase.from('timeline_events').select('*').eq('case_id', caseId).order('timestamp', { ascending: true });
    if (error || !data) return getMockTimelineByCaseId(caseId);
    return (data as TimelineRow[]).map(mapTimeline);
  },

  async getAuditEntries(): Promise<AuditEntry[]> {
    if (!isSupabaseConfigured) return mockAudit;
    const { data, error } = await supabase.from('audit_entries').select('*').order('date', { ascending: false }).order('timestamp', { ascending: false });
    if (error || !data) return mockAudit;
    return (data as AuditRow[]).map(mapAudit);
  },

  async getAuditByCaseId(caseId: string): Promise<AuditEntry[]> {
    if (!isSupabaseConfigured) return mockAudit.filter((a) => a.caseId === caseId);
    const { data, error } = await supabase.from('audit_entries').select('*').eq('case_id', caseId).order('date', { ascending: false }).order('timestamp', { ascending: false });
    if (error || !data) return mockAudit.filter((a) => a.caseId === caseId);
    return (data as AuditRow[]).map(mapAudit);
  },
};
