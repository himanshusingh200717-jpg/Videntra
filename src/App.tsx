import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { InvestigationsPage } from '@/pages/InvestigationsPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { EvidencePage } from '@/pages/EvidencePage';
import { EvidenceViewerPage } from '@/pages/EvidenceViewerPage';
import { AcquisitionPage } from '@/pages/AcquisitionPage';
import { RecoveryPage } from '@/pages/RecoveryPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { TimelinePage } from '@/pages/TimelinePage';
import { DevicesPage } from '@/pages/DevicesPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { AuditPage } from '@/pages/AuditPage';
import { SettingsPage } from '@/pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/investigations" element={<InvestigationsPage />} />
          <Route path="/investigations/:id" element={<CaseDetailPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/evidence/:id" element={<EvidenceViewerPage />} />
          <Route path="/acquisition" element={<AcquisitionPage />} />
          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
