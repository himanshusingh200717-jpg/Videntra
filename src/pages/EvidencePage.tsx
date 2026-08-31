import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Search, Filter, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { useEvidence } from '@/hooks/useData';
import { formatHash } from '@/lib/utils';

export function EvidencePage() {
  const { data: evidence } = useEvidence();
  const [search, setSearch] = useState('');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [integrityFilter, setIntegrityFilter] = useState('all');

  const filtered = evidence.filter((e) => {
    const matchesSearch = e.fileName.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchesVendor = vendorFilter === 'all' || e.vendor === vendorFilter;
    const matchesIntegrity = integrityFilter === 'all' || e.integrity === integrityFilter;
    return matchesSearch && matchesVendor && matchesIntegrity;
  });

  return (
    <div>
      <PageHeader
        title="Evidence Explorer"
        subtitle="Browse and search all forensic evidence items across investigations."
        icon={<FileSearch className="w-5 h-5" />}
      />

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by evidence ID or file name..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Vendors</option>
            <option value="Hikvision">Hikvision</option>
            <option value="Dahua">Dahua</option>
            <option value="CP Plus">CP Plus</option>
            <option value="Uniview">Uniview</option>
            <option value="Axis">Axis</option>
            <option value="Generic">Generic</option>
          </select>
          <select
            value={integrityFilter}
            onChange={(e) => setIntegrityFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Integrity</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-ink-700/60">
                <th className="text-left font-medium py-2.5 px-3">Evidence ID</th>
                <th className="text-left font-medium py-2.5 px-3">File</th>
                <th className="text-left font-medium py-2.5 px-3">Source Device</th>
                <th className="text-left font-medium py-2.5 px-3">Camera</th>
                <th className="text-left font-medium py-2.5 px-3">Timestamp</th>
                <th className="text-left font-medium py-2.5 px-3">Size</th>
                <th className="text-left font-medium py-2.5 px-3">SHA-256</th>
                <th className="text-left font-medium py-2.5 px-3">Integrity</th>
                <th className="text-left font-medium py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-ink-700/30 hover:bg-ink-800/30 transition-colors group">
                  <td className="py-3 px-3">
                    <Link to={`/evidence/${e.id}`} className="font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 group-hover:gap-2 transition-all">
                      {e.id} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-mono text-xs">{e.fileName}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{e.sourceDevice}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs">{e.camera}</td>
                  <td className="py-3 px-3 text-slate-400 text-xs font-mono">{e.timestamp}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-xs">{e.size}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-xs">{formatHash(e.sha256)}</td>
                  <td className="py-3 px-3"><StatusBadge status={e.integrity} /></td>
                  <td className="py-3 px-3"><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-slate-500">No evidence items match your filters.</p>
        )}
      </Card>
    </div>
  );
}
