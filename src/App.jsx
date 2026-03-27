import { Routes, Route, Navigate } from 'react-router-dom'
import CreateCampaign from './pages/CreateCampaign.jsx'
import CampaignPage from './pages/CampaignPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateCampaign />} />
      <Route path="/c/:id" element={<CampaignPage />} />
      <Route path="*" element={<Navigate to="/create" replace />} />
    </Routes>
  )
}
