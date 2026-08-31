import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderSearch, Search, ArrowRight, Filter } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { useCases } from '@/hooks/useData';

export function InvestigationsPage() {
  const { data: cases } = useCases();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = cases.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Investigations"
        subtitle="All forensic cases under investigation."
        icon={<FolderSearch className="w-5 h-5" />}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case ID or name..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Link key={c.id} to={`/investigations/${c.id}`}>
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-xs text-cyan-300">{c.id}</p>
                  <h3 className="font-semibold text-white mt-1">{c.name}</h3>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{c.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500">Evidence</p>
                  <p className="text-slate-200 font-mono mt-0.5">{c.evidenceCount} items</p>
                </div>
                <div>
                  <p className="text-slate-500">Devices</p>
                  <p className="text-slate-200 font-mono mt-0.5">{c.deviceCount} units</p>
                </div>
                <div>
                  <p className="text-slate-500">Integrity</p>
                  <p className={`font-mono mt-0.5 ${c.integrity === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {c.integrity}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Investigator</p>
                  <p className="text-slate-200 mt-0.5">{c.investigator.replace('Det. ', '')}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-700/40">
                <span className="text-xs text-slate-500">{c.lastActivity}</span>
                <span className="text-xs text-cyan-400 flex items-center gap-1">
                  Open <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">No investigations match your search.</p>
        </div>
      )}
    </div>
  );
}
