export default function LandingScreen({ campaign, neighborCount, onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 text-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
            {campaign.buildingName}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
            Your neighbors are emailing management.
          </h1>
          <p className="text-gray-500 text-base">
            {neighborCount === 0
              ? 'Be the first to send an email about:'
              : `${neighborCount} ${neighborCount === 1 ? 'neighbor has' : 'neighbors have'} already sent an email about:`}
          </p>
          <p className="mt-2 font-medium text-gray-800 text-sm bg-gray-100 rounded-lg px-4 py-2 inline-block">
            {campaign.subject}
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 text-left">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How it works</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-0.5">1</span>
              <span>Sign in with Google — takes 5 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-0.5">2</span>
              <span>We generate a unique version of the email in your voice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-0.5">3</span>
              <span>Review it, then send with one tap — from your real email</span>
            </li>
          </ul>
        </div>

        {/* Sign in */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => onSignIn()}
            className="flex items-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium text-sm px-6 py-3 rounded-xl shadow-sm transition-colors w-full max-w-xs justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Sign in with Google
          </button>
          <p className="text-xs text-gray-400 max-w-xs">
            We only request permission to send email on your behalf. We never read your inbox.
          </p>
        </div>
      </div>
    </div>
  )
}
