export default function PreviewScreen({ campaign, user, rewrittenEmail, senderName, onSenderNameChange, isLoading, onSend, onSignOut }) {
  const recipients = campaign.managementEmails || [campaign.managementEmail]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 px-5 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">

        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase text-center">
          SendTogether
        </p>

        {/* User info */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Sending as <span className="font-semibold text-gray-900 dark:text-white">{user.email}</span>
          </div>
          <button
            onClick={onSignOut}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline ml-3 shrink-0"
          >
            Switch
          </button>
        </div>

        {/* Email preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3">
            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">To</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
              {campaign.recipientStrategy === 'random'
                ? <span className="italic text-gray-500 dark:text-gray-400">One recipient, randomly assigned at send</span>
                : recipients.join(', ')
              }
            </p>
          </div>
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3">
            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">Subject</span>
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium mt-0.5">{campaign.subject}</p>
          </div>

          <div className="px-5 py-4 min-h-[140px]">
            {isLoading ? (
              <div className="space-y-2.5 animate-pulse pt-1">
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-5/6" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-4/6" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-3/6" />
              </div>
            ) : (
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {rewrittenEmail}
              </p>
            )}
            {!isLoading && senderName && (
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-3">{senderName}</p>
            )}
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 -mt-2">
            Writing your unique version...
          </p>
        )}

        {/* Name field */}
        {!isLoading && (
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Your name (appears as sign-off)
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => onSenderNameChange(e.target.value)}
              placeholder="First name"
              className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          onClick={onSend}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm"
        >
          {isLoading ? 'Preparing...' : 'Send this email'}
        </button>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 -mt-2">
          Sent from your Gmail account. Check your sent folder after.
        </p>
      </div>
    </div>
  )
}
