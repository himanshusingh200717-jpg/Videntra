import { useState } from 'react';
import {
  FileText,
  Eye,
  Download,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';

const reportSections = [
  { id: 'summary', label: 'Case Summary', included: true },
  { id: 'inventory', label: 'Evidence Inventory', included: true },
  { id: 'acquisition', label: 'Acquisition Details', included: true },
  { id: 'hash', label: 'Hash Verification', included: true },
  { id: 'recovery', label: 'Recovery Results', included: true },
  { id: 'timeline', label: 'Timeline', included: true },
  { id: 'findings', label: 'Findings', included: true },
  { id: 'custody', label: 'Chain of Custody', included: true },
  { id: 'notes', label: 'Investigator Notes', included: false },
];

export function ReportsPage() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <PageHeader
        title="Forensic Reports"
        subtitle="Generate court-ready forensic investigation reports."
        icon={<FileText className="w-5 h-5" />}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 text-sm font-medium text-slate-200 bg-ink-800 hover:bg-ink-700 border border-ink-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> {showPreview ? 'Hide Preview' : 'Preview'}
            </button>
            <button className="px-4 py-2 text-sm font-medium text-ink-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Generate Report
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Report Configuration */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Report Configuration</h3>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Case</label>
                <select className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50">
                  <option>CASE-2026-041 — Warehouse Incident</option>
                  <option>CASE-2026-037 — Parking Facility Investigation</option>
                  <option>CASE-2026-029 — Retail Security Incident</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Report Type</label>
                <select className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50">
                  <option>Full Forensic Report</option>
                  <option>Interim Report</option>
                  <option>Evidence Summary</option>
                  <option>Chain of Custody Report</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Format</label>
                <select className="w-full px-3 py-2 text-sm bg-ink-800 border border-ink-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500/50">
                  <option>PDF</option>
                  <option>HTML</option>
                  <option>XML</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Report Sections</h3>
            <div className="space-y-2">
              {reportSections.map((section) => (
                <label key={section.id} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                    section.included ? 'bg-cyan-500/20 border-cyan-500/40' : 'border-ink-600 group-hover:border-ink-500'
                  )}>
                    {section.included && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <span className={cn('text-sm', section.included ? 'text-slate-200' : 'text-slate-500')}>
                    {section.label}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </Card>
        </div>

        {/* Report Preview */}
        <Card className={cn(!showPreview && 'flex items-center justify-center min-h-[500px]')}>
          {showPreview ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink-700/60">
                <div>
                  <h2 className="text-xl font-bold text-white">Forensic Investigation Report</h2>
                  <p className="text-sm text-slate-400 mt-1 font-mono">CASE-2026-041 — Warehouse Incident</p>
                </div>
                <StatusBadge status="verified" label="Verified" />
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Case Summary</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Break-in reported at Northgate Logistics Warehouse, Bay 3. Suspected theft of inventory between 02:00 and 04:30 on 18 Aug 2026. Three DVR units seized for forensic acquisition. Evidence acquired, verified, and partially recovered.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Evidence Inventory</h3>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-slate-500 border-b border-ink-700/40">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">File</th>
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'EVD-00231', file: 'CAM01_2026-08-21_1842.mp4', size: '2.4 GB', status: 'Verified' },
                        { id: 'EVD-00232', file: 'CAM02_2026-08-21_1842.mp4', size: '2.1 GB', status: 'Verified' },
                        { id: 'EVD-00234', file: 'REC_DELETED_0x4A2F1B.dav', size: '847 MB', status: 'Recovered' },
                        { id: 'EVD-00235', file: 'REC_DELETED_0x4A3C0E.dav', size: '612 MB', status: 'Recovered' },
                      ].map((e, i) => (
                        <tr key={i} className="border-b border-ink-700/20">
                          <td className="py-2 font-mono text-cyan-300">{e.id}</td>
                          <td className="py-2 text-slate-300 font-mono">{e.file}</td>
                          <td className="py-2 text-slate-400">{e.size}</td>
                          <td className="py-2"><StatusBadge status={e.status.toLowerCase()} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Hash Verification</h3>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-300 font-medium">All evidence verified — SHA-256</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 font-mono">7a91f3c4d2e8b6a5901c4e7d2f3a8b6c5d4e2f1a0b9c8d7e6f5a4b3c2d1e0f9a</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Recovery Results</h3>
                  <p className="text-slate-300">2 deleted segments recovered (1.4 GB total) via file carving and fragment reconstruction. Recovered footage shows vehicle departure and additional person activity.</p>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Chain of Custody</h3>
                  <p className="text-slate-300">All evidence actions logged with timestamp, user, and hash verification. No integrity violations detected. Chain of custody maintained from acquisition through analysis.</p>
                </div>

                <div className="pt-4 border-t border-ink-700/40 flex items-center justify-between text-xs text-slate-500">
                  <span>Generated: 22 Aug 2026 14:45:19</span>
                  <span>Investigator: Det. Sarah Chen</span>
                  <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Click "Preview" to view the report</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
