export default function DoneScreen({ campaign, neighborCount }) {
  const shareUrl = window.location.href

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Join me — email management about this',
        text: `I just emailed ${campaign.buildingName} management about "${campaign.subject}". Takes 30 seconds — join me:`,
        url: shareUrl,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Link copied to clipboard!')
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 text-center bg-white">
      <div className="w-full max-w-sm">

        {/* Wordmark */}
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-10">
          SendTogether
        </p>

        {/* Success icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email sent.</h1>
        <p className="text-gray-500 text-sm mb-1">
          Your email is on its way to {campaign.buildingName || 'management'}.
        </p>
        {neighborCount > 1 && (
          <p className="text-sm font-semibold text-gray-800 mb-8">
            {neighborCount} neighbors have now sent this.
          </p>
        )}
        {neighborCount <= 1 && <div className="mb-8" />}

        {/* Share */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            Now share it — volume is the point
          </p>
          <p className="text-xs text-blue-700 mb-4">
            Drop this link in the group chat. The more neighbors who send, the harder it is to ignore.
          </p>
          <button
            onClick={handleShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            Share with neighbors
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Check your Gmail sent folder to confirm delivery.
        </p>
      </div>
    </div>
  )
}
