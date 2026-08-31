import { useState, useEffect } from 'react';
import type { Case, Evidence, Device, TimelineEvent, AuditEntry } from '@/types';
import { api } from '@/lib/api';

export function useCases() {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getCases()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}

export function useCase(id: string | undefined) {
  const [data, setData] = useState<Case | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let mounted = true;
    api.getCaseById(id)
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, [id]);

  return { data, loading, error };
}

export function useEvidence() {
  const [data, setData] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getEvidence()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}

export function useEvidenceById(id: string | undefined) {
  const [data, setData] = useState<Evidence | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let mounted = true;
    api.getEvidenceById(id)
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, [id]);

  return { data, loading, error };
}

export function useEvidenceByCase(caseId: string | undefined) {
  const [data, setData] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) { setLoading(false); return; }
    let mounted = true;
    api.getEvidenceByCaseId(caseId)
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, [caseId]);

  return { data, loading, error };
}

export function useDevices() {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getDevices()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}

export function useTimeline() {
  const [data, setData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getTimeline()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}

export function useTimelineByCase(caseId: string | undefined) {
  const [data, setData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) { setLoading(false); return; }
    let mounted = true;
    api.getTimelineByCaseId(caseId)
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, [caseId]);

  return { data, loading, error };
}

export function useAuditEntries() {
  const [data, setData] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getAuditEntries()
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
}

export function useAuditByCase(caseId: string | undefined) {
  const [data, setData] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) { setLoading(false); return; }
    let mounted = true;
    api.getAuditByCaseId(caseId)
      .then((result) => { if (mounted) { setData(result); setLoading(false); } })
      .catch((err) => { if (mounted) { setError(err.message); setLoading(false); } });
    return () => { mounted = false; };
  }, [caseId]);

  return { data, loading, error };
}
