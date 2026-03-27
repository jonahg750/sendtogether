import { GoogleLogin } from '@react-oauth/google'

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
            {neighborCount} {neighborCount === 1 ? 'neighbor has' : 'neighbors have'} already sent an email about:
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
          <GoogleLogin
            onSuccess={onSignIn}
            onError={() => alert('Sign-in failed. Please try again.')}
            useOneTap
            scope="https://www.googleapis.com/auth/gmail.send"
            text="signin_with"
            shape="rectangular"
            size="large"
            width="300"
          />
          <p className="text-xs text-gray-400 max-w-xs">
            We only request permission to send email on your behalf. We never read your inbox.
          </p>
        </div>
      </div>
    </div>
  )
}
