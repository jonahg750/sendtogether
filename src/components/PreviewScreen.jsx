export default function PreviewScreen({ campaign, user, rewrittenEmail, isLoading, onSend, onSignOut }) {
  return (
    <div className="flex flex-col min-h-screen px-5 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6">
        {/* User info */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Sending as <span className="font-medium text-gray-800">{user.email}</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Sign out
          </button>
        </div>

        {/* Email preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-3 bg-gray-50">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">To</p>
            <p className="text-sm text-gray-700">{campaign.managementEmail}</p>
          </div>
          <div className="border-b border-gray-100 px-5 py-3 bg-gray-50">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Subject</p>
            <p className="text-sm text-gray-700">{campaign.subject}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Your version</p>
            {isLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/6" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-3/6" />
              </div>
            ) : (
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {rewrittenEmail}
              </p>
            )}
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-xs text-gray-400">
            Generating your unique version...
          </p>
        )}

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm"
        >
          {isLoading ? 'Preparing...' : 'Send this email'}
        </button>

        <p className="text-center text-xs text-gray-400">
          This will be sent from your Gmail account to {campaign.managementEmail}
        </p>
      </div>
    </div>
  )
}
