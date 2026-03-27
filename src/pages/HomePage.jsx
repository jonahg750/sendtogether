import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-900 tracking-tight">SendTogether</p>
        <button
          onClick={() => navigate('/create')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Start a campaign
        </button>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 py-16 max-w-lg mx-auto">
        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          For apartment residents
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          One resident emailing is easy to ignore.
          <span className="text-blue-600"> Ten is not.</span>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          SendTogether lets neighbors send coordinated emails to building management — each in their own words, from their own account — with a single tap.
        </p>
        <button
          onClick={() => navigate('/create')}
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm mb-3"
        >
          Start a campaign
        </button>
        <p className="text-xs text-gray-400">Free to use. No account needed.</p>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 border-t border-gray-100 px-6 py-12">
        <div className="max-w-lg mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-8">
            How it works
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">An organizer creates a campaign</p>
                <p className="text-sm text-gray-500">Write a draft email, add management's address, and get a shareable link in under a minute.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Share the link in the group chat</p>
                <p className="text-sm text-gray-500">Drop it in WhatsApp, Signal, or wherever your building communicates.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">Neighbors send in one tap</p>
                <p className="text-sm text-gray-500">Each person signs in with Google and sends their own uniquely reworded version — from their real email account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust */}
      <div className="px-6 py-10 max-w-lg mx-auto w-full text-center">
        <p className="text-sm font-semibold text-gray-700 mb-4">Built with privacy in mind</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-8">
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-800 mb-0.5">No inbox access</p>
            <p className="text-xs text-gray-400">We only request send permission</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-800 mb-0.5">No stored emails</p>
            <p className="text-xs text-gray-400">We don't store your address</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-800 mb-0.5">Your account</p>
            <p className="text-xs text-gray-400">Sent from your real Gmail</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm mb-3"
        >
          Start a campaign
        </button>
        <p className="text-xs text-gray-400">
          <a href="/privacy" className="underline hover:text-gray-600">Privacy policy</a>
        </p>
      </div>

    </div>
  )
}
