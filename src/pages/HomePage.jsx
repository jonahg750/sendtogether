import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-12 text-center">
      <div className="w-full max-w-md">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">SendTogether</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Apartment management responds to volume. One resident emailing is easy to ignore.
            Ten residents emailing — independently, in their own words — is not.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8 text-left">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">How it works</p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5 shrink-0">1</span>
              <span>An organizer writes a draft email and creates a campaign link</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5 shrink-0">2</span>
              <span>They share the link in the building group chat</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-0.5 shrink-0">3</span>
              <span>Each neighbor signs in with Google and sends their own uniquely reworded version — one tap</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/create')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-2xl transition-colors shadow-sm mb-3"
        >
          Start a campaign
        </button>
        <p className="text-xs text-gray-400">
          Free to use. No account required.{' '}
          <a href="/privacy" className="underline hover:text-gray-600">Privacy policy</a>
        </p>
      </div>
    </div>
  )
}
