import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { campaign } from './config/campaign.js'
import { sendEmail } from './utils/gmail.js'
import LandingScreen from './components/LandingScreen.jsx'
import PreviewScreen from './components/PreviewScreen.jsx'
import DoneScreen from './components/DoneScreen.jsx'

// Hardcoded neighbor count — replace with Vercel KV later
const NEIGHBOR_COUNT = 3

export default function App() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'preview' | 'done' | 'error'
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [rewrittenEmail, setRewrittenEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const signIn = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token)

      // Fetch user info
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const info = await res.json()
        setUser({ name: info.name, email: info.email })
      } catch {
        setUser({ name: 'Neighbor', email: '' })
      }

      setScreen('preview')
      setIsLoading(true)

      // Rewrite via serverless function (skipped in test mode)
      try {
        if (import.meta.env.VITE_TEST_MODE === 'true') {
          setRewrittenEmail(campaign.draft)
        } else {
          const res = await fetch('/api/rewrite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ draft: campaign.draft }),
          })
          const data = await res.json()
          setRewrittenEmail(data.rewritten)
        }
      } catch (err) {
        setError('Failed to generate your email. Please try again.')
        setScreen('error')
      } finally {
        setIsLoading(false)
      }
    },
    onError: () => {
      setError('Sign-in failed. Please try again.')
    },
  })

  async function handleSend() {
    if (!rewrittenEmail) return
    setIsLoading(true)
    try {
      if (import.meta.env.VITE_TEST_MODE === 'true') {
        await new Promise(r => setTimeout(r, 800)) // simulate network delay
      } else {
        await sendEmail(accessToken, campaign.managementEmail, campaign.subject, rewrittenEmail)
      }
      setScreen('done')
    } catch (err) {
      setError(err.message || 'Failed to send email. Please try again.')
      setScreen('error')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSignOut() {
    setUser(null)
    setAccessToken(null)
    setRewrittenEmail('')
    setScreen('landing')
  }

  if (screen === 'landing') {
    return (
      <LandingScreen
        campaign={campaign}
        neighborCount={NEIGHBOR_COUNT}
        onSignIn={signIn}
      />
    )
  }

  if (screen === 'preview') {
    return (
      <PreviewScreen
        campaign={campaign}
        user={user}
        rewrittenEmail={rewrittenEmail}
        isLoading={isLoading}
        onSend={handleSend}
        onSignOut={handleSignOut}
      />
    )
  }

  if (screen === 'done') {
    return (
      <DoneScreen
        campaign={campaign}
        neighborCount={NEIGHBOR_COUNT + 1}
      />
    )
  }

  // Error screen
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <div className="text-4xl mb-4">!</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm mb-6">{error}</p>
      <button
        onClick={() => { setScreen('landing'); setError(null) }}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
      >
        Start over
      </button>
    </div>
  )
}
