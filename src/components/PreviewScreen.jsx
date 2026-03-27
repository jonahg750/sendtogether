export default function PreviewScreen({ campaign, user, rewrittenEmail, senderName, onSenderNameChange, isLoading, onSend, onSignOut }) {
  const recipients = campaign.managementEmails || [campaign.managementEmail]

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">

        {/* Wordmark */}
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase text-center">
          SendTogether
        </p>

        {/* User info */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
          <div className="text-sm text-gray-600">
            Sending as <span className="font-semibold text-gray-900">{user.email}</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-xs text-gray-400 hover:text-gray-600 underline ml-3 shrink-0"
          >
            Switch
          </button>
        </div>

        {/* Email preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Headers */}
          <div className="border-b border-gray-100 px-5 py-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">To</span>
            <p className="text-sm text-gray-700 mt-0.5">
              {campaign.recipientStrategy === 'random'
                ? <span className="italic text-gray-500">One recipient, randomly assigned at send</span>
                : recipients.join(', ')
              }
            </p>
          </div>
          <div className="border-b border-gray-100 px-5 py-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Subject</span>
            <p className="text-sm text-gray-800 font-medium mt-0.5">{campaign.subject}</p>
          </div>

          {/* Body */}
          <div className="px-5 py-4 min-h-[140px]">
            {isLoading ? (
              <div className="space-y-2.5 animate-pulse pt-1">
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
              {senderName && (
                <p className="text-sm text-gray-800 mt-3">{senderName}</p>
              )}
            )}
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-xs text-gray-400 -mt-2">
            Writing your unique version...
          </p>
        )}

        {/* Name field */}
        {!isLoading && (
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Your name (appears as sign-off)
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => onSenderNameChange(e.target.value)}
              placeholder="First name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Send button */}
        <button
          onClick={onSend}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm"
        >
          {isLoading ? 'Preparing...' : 'Send this email'}
        </button>

        <p className="text-center text-xs text-gray-400 -mt-2">
          Sent from your Gmail account. Check your sent folder after.
        </p>
      </div>
    </div>
  )
}
