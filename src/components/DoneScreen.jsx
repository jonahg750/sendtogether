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
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 text-center">
      <div className="w-full max-w-md">
        {/* Success */}
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email sent.</h1>
        <p className="text-gray-500 mb-8">
          Your email has been sent to {campaign.buildingName} management.{' '}
          {neighborCount > 1 && `${neighborCount} neighbors have now sent this.`}
        </p>

        {/* Share nudge */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
          <p className="text-sm font-medium text-blue-900 mb-1">
            Make it count — share the link
          </p>
          <p className="text-xs text-blue-700 mb-4">
            Management responds to volume. Drop this in the group chat so more neighbors can join.
          </p>
          <button
            onClick={handleShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            Share link with neighbors
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Check your Gmail sent folder to confirm delivery.
        </p>
      </div>
    </div>
  )
}
