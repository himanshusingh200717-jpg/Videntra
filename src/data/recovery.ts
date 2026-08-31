import type { RecoveryMethod, ProcessingJob, ActivityEvent } from '@/types';

export const recoveryMethods: RecoveryMethod[] = [
  {
    id: 'RM-001',
    name: 'Deleted Video Recovery',
    description: 'Recover deleted recordings from unallocated storage sectors by reconstructing file tables and carving video containers.',
    icon: 'file-search',
    status: 'complete',
    found: 2,
  },
  {
    id: 'RM-002',
    name: 'Fragment Recovery',
    description: 'Reconstruct fragmented video streams by analyzing and reassembling non-contiguous storage blocks.',
    icon: 'puzzle',
    status: 'complete',
    found: 1,
  },
  {
    id: 'RM-003',
    name: 'Corrupted Index Recovery',
    description: 'Recover footage when DVR indexing structures are damaged or overwritten by rebuilding index tables from raw data.',
    icon: 'database',
    status: 'scanning',
    found: 0,
  },
  {
    id: 'RM-004',
    name: 'Raw Stream Reconstruction',
    description: 'Recover raw video streams directly from storage sectors when file system metadata is unavailable or destroyed.',
    icon: 'layers',
    status: 'idle',
    found: 0,
  },
  {
    id: 'RM-005',
    name: 'Metadata Recovery',
    description: 'Recover timestamps, camera identifiers, and recording metadata from residual index fragments.',
    icon: 'clock',
    status: 'idle',
    found: 0,
  },
  {
    id: 'RM-006',
    name: 'File Carving',
    description: 'Search raw storage sectors for video file signatures and reconstruct files based on header/footer analysis.',
    icon: 'scan',
    status: 'idle',
    found: 0,
  },
];

export const storageStats = {
  total: '4 TB',
  used: '3.1 TB',
  unallocated: '682 GB',
  corrupted: '47 GB',
  recoverable: '1.2 GB',
  sectors: 31205760,
  validPercent: 72,
  deletedPercent: 14,
  corruptedPercent: 5,
  recoverablePercent: 3,
  unknownPercent: 6,
};

export const processingJobs: ProcessingJob[] = [
  {
    id: 'JOB-001',
    name: 'Acquiring CAM01_2026-08-21_1842.mp4',
    type: 'acquisition',
    progress: 100,
    status: 'complete',
    evidenceId: 'EVD-00231',
    eta: 'Complete',
  },
  {
    id: 'JOB-002',
    name: 'SHA-256 Hashing — EVD-00233',
    type: 'hashing',
    progress: 100,
    status: 'complete',
    evidenceId: 'EVD-00233',
    eta: 'Complete',
  },
  {
    id: 'JOB-003',
    name: 'Recovery Scan — DVR-01 Unallocated',
    type: 'recovery',
    progress: 67,
    status: 'processing',
    evidenceId: 'EVD-00234',
    eta: '4 min remaining',
  },
  {
    id: 'JOB-004',
    name: 'Metadata Extraction — EVD-00231',
    type: 'metadata',
    progress: 100,
    status: 'complete',
    evidenceId: 'EVD-00231',
    eta: 'Complete',
  },
  {
    id: 'JOB-005',
    name: 'Video Analysis — EVD-00231',
    type: 'analysis',
    progress: 34,
    status: 'processing',
    evidenceId: 'EVD-00231',
    eta: '12 min remaining',
  },
  {
    id: 'JOB-006',
    name: 'Video Analysis — EVD-00232',
    type: 'analysis',
    progress: 0,
    status: 'queued',
    evidenceId: 'EVD-00232',
    eta: 'Queued',
  },
];

export const activityEvents: ActivityEvent[] = [
  { id: 'ACT-001', type: 'acquisition', label: 'Evidence acquired from DVR-01, Camera 01', timestamp: '2 min ago', caseId: 'CASE-2026-041' },
  { id: 'ACT-002', type: 'recovery', label: 'Deleted segment recovered (847 MB)', timestamp: '14 min ago', caseId: 'CASE-2026-041' },
  { id: 'ACT-003', type: 'verification', label: 'SHA-256 verified for EVD-00233', timestamp: '28 min ago', caseId: 'CASE-2026-041' },
  { id: 'ACT-004', type: 'investigation', label: 'New investigation created: CASE-2026-041', timestamp: '1 hour ago', caseId: 'CASE-2026-041' },
  { id: 'ACT-005', type: 'report', label: 'Interim report generated for CASE-2026-037', timestamp: '2 hours ago', caseId: 'CASE-2026-037' },
  { id: 'ACT-006', type: 'acquisition', label: 'Evidence acquired from DVR-02, Camera 04', timestamp: '3 hours ago', caseId: 'CASE-2026-037' },
  { id: 'ACT-007', type: 'verification', label: 'Integrity check passed — 62 items verified', timestamp: '4 hours ago', caseId: 'CASE-2026-037' },
  { id: 'ACT-008', type: 'recovery', label: 'Index recovery completed for CP Plus DVR', timestamp: '5 hours ago', caseId: 'CASE-2026-029' },
];

export const storageSectors = Array.from({ length: 480 }, (_, i) => {
  const r = (i * 7919) % 100;
  if (r < 72) return 'valid';
  if (r < 86) return 'deleted';
  if (r < 91) return 'corrupted';
  if (r < 94) return 'recoverable';
  return 'unknown';
});
