import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ManagePage() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [copied, setCopied] = useState(false)

  const shareUrl = `${window.location.origin}/c/${id}`

  function fetchCampaign() {
    fetch(`/api/campaign?id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setLoadError(data.error)
        else setCampaign(data)
      })
      .catch(() => setLoadError('Failed to load campaign'))
  }

  useEffect(() => {
    fetchCampaign()
    const interval = setInterval(fetchCampaign, 15000)
    return () => clearInterval(interval)
  }, [id])

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Join the campaign',
        text: `Help me email management about "${campaign.subject}". Takes 30 seconds:`,
        url: shareUrl,
      }).catch(() => {})
    } else {
      handleCopy()
    }
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
        <p className="text-gray-500">Campaign not found.</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10">
      <div className="w-full max-w-md space-y-5">

        {/* Status banner */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-green-900 mb-0.5">Your email was sent</p>
            <p className="text-xs text-green-700">Now share the link below so your neighbors can join in.</p>
          </div>
        </div>

        {/* Header */}
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Your campaign</p>
          <h1 className="text-xl font-bold text-gray-900">{campaign.subject}</h1>
          {campaign.buildingName && (
            <p className="text-sm text-gray-500 mt-0.5">{campaign.buildingName}</p>
          )}
        </div>

        {/* Send count */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <p className="text-5xl font-bold text-blue-600 mb-1">{campaign.sendCount || 0}</p>
          <p className="text-gray-500 text-sm">
            {campaign.sendCount === 1 ? 'neighbor has sent this' : 'neighbors have sent this'}
          </p>
          <button
            onClick={fetchCampaign}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Refresh
          </button>
        </div>

        {/* Share link */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <p className="text-sm font-medium text-gray-700">Shareable link</p>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-500 truncate flex-1">{shareUrl}</p>
            <button
              onClick={handleCopy}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 shrink-0"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={handleShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            Share with neighbors
          </button>
        </div>

        {/* Campaign details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-3 bg-gray-50">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sending to</p>
            <p className="text-sm text-gray-700 mt-0.5">
              {(campaign.managementEmails || [campaign.managementEmail]).join(', ')}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Draft email</p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{campaign.draft}</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Bookmark this page to track your campaign. Count updates every 15 seconds.
        </p>
      </div>
    </div>
  )
}
