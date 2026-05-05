/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import JourneyBuilder from './pages/campaigns/JourneyBuilder';
import CampaignCopilot from './pages/campaigns/CampaignCopilot';
import Analytics from './pages/analytics/Analytics';
import Segments from './pages/segments/Segments';
import SegmentDeliveries from './pages/segments/SegmentDeliveries';
import Overview from './pages/dashboard/Overview';
import PlaceholderSettings from './pages/dashboard/PlaceholderSettings';
import PlaceholderHelp from './pages/dashboard/PlaceholderHelp';
import { DEFAULT_ROUTE, type AppRouteId } from './navigation/routes';

export default function App() {
  const [activePage, setActivePage] = useState<AppRouteId>(DEFAULT_ROUTE);

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview onNavigate={setActivePage} />;
      case 'campaign-builder':
        return <JourneyBuilder />;
      case 'campaign-copilot':
        return <CampaignCopilot />;
      case 'analytics':
        return <Analytics />;
      case 'segments':
        return <Segments />;
      case 'segment-deliveries':
        return <SegmentDeliveries />;
      case 'settings':
        return <PlaceholderSettings />;
      case 'help':
        return <PlaceholderHelp />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <h2 className="text-4xl font-black text-on-surface mb-4">Хөгжүүлж байна...</h2>
            <p className="text-on-surface-variant font-bold">Энэ хуудас тун удахгүй бэлэн болно.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 ml-64 flex flex-col">
        <TopNav activeRouteId={activePage} />

        <main className="mt-24 lg:mt-20 p-8 flex-1 overflow-hidden">{renderPage()}</main>
      </div>
    </div>
  );
}
