export type CaseStatus = 'active' | 'pending' | 'closed' | 'archived';
export type IntegrityStatus = 'verified' | 'pending' | 'failed';
export type EvidenceStatus = 'acquired' | 'processing' | 'verified' | 'recovered' | 'corrupted';
export type EvidenceType = 'video' | 'image' | 'metadata' | 'log' | 'recovery';
export type DeviceStatus = 'online' | 'offline' | 'syncing' | 'error';
export type Vendor = 'Hikvision' | 'Dahua' | 'CP Plus' | 'Uniview' | 'Axis' | 'Generic';

export interface Case {
  id: string;
  name: string;
  status: CaseStatus;
  investigator: string;
  device: string;
  vendor: Vendor;
  evidenceCount: number;
  deviceCount: number;
  integrity: number;
  createdAt: string;
  lastActivity: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  pipeline: {
    acquisition: 'complete' | 'in-progress' | 'pending';
    verification: 'complete' | 'in-progress' | 'pending';
    recovery: 'complete' | 'in-progress' | 'pending';
    analysis: 'complete' | 'in-progress' | 'pending';
    reporting: 'complete' | 'in-progress' | 'pending';
  };
}

export interface Evidence {
  id: string;
  fileName: string;
  sourceDevice: string;
  vendor: Vendor;
  camera: string;
  timestamp: string;
  size: string;
  sizeBytes: number;
  sha256: string;
  integrity: IntegrityStatus;
  status: EvidenceStatus;
  type: EvidenceType;
  caseId: string;
  duration: string;
  recovered: boolean;
}

export interface Device {
  id: string;
  vendor: Vendor;
  model: string;
  status: DeviceStatus;
  storage: string;
  storageUsed: string;
  cameras: number;
  lastConnected: string;
  compatibility: 'high' | 'medium' | 'low';
  protocols: string[];
  ipAddress: string;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  timestamp: string;
  type: 'person' | 'vehicle' | 'motion' | 'camera-offline' | 'recording-gap' | 'recovered' | 'bookmark' | 'evidence' | 'acquisition' | 'verification' | 'recovery' | 'report';
  label: string;
  camera: string;
  evidenceId?: string;
  description: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  date: string;
  action: string;
  user: string;
  evidenceId: string;
  hash: string;
  status: IntegrityStatus;
  caseId: string;
}

export interface RecoveryMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'idle' | 'scanning' | 'complete';
  found: number;
}

export interface ProcessingJob {
  id: string;
  name: string;
  type: 'acquisition' | 'hashing' | 'recovery' | 'metadata' | 'analysis';
  progress: number;
  status: 'queued' | 'processing' | 'complete';
  evidenceId: string;
  eta: string;
}

export interface ActivityEvent {
  id: string;
  type: 'acquisition' | 'recovery' | 'verification' | 'investigation' | 'report';
  label: string;
  timestamp: string;
  caseId: string;
}
