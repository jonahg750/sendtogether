import { Routes, Route, Navigate } from 'react-router-dom'
import CreateCampaign from './pages/CreateCampaign.jsx'
import CampaignPage from './pages/CampaignPage.jsx'
import ManagePage from './pages/ManagePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateCampaign />} />
      <Route path="/c/:id" element={<CampaignPage />} />
      <Route path="/manage/:id" element={<ManagePage />} />
      <Route path="*" element={<Navigate to="/create" replace />} />
    </Routes>
  )
}
