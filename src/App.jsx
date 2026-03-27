import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateCampaign from './pages/CreateCampaign.jsx'
import CampaignPage from './pages/CampaignPage.jsx'
import ManagePage from './pages/ManagePage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateCampaign />} />
      <Route path="/c/:id" element={<CampaignPage />} />
      <Route path="/manage/:id" element={<ManagePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
