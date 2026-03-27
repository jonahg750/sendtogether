import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { sendEmail } from '../utils/gmail.js'
import LandingScreen from '../components/LandingScreen.jsx'
import PreviewScreen from '../components/PreviewScreen.jsx'
import DoneScreen from '../components/DoneScreen.jsx'

export default function CampaignPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isOrganizer = searchParams.get('from') === 'create'
  const [campaign, setCampaign] = useState(null)
  const [loadError, setLoadError] = useState(null)

  const [screen, setScreen] = useState('landing')
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [rewrittenEmail, setRewrittenEmail] = useState('')
  const [rewrittenSubject, setRewrittenSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/campaign?id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setLoadError(data.error)
        else setCampaign(data)
      })
      .catch(() => setLoadError('Failed to load campaign'))
  }, [id])

  const signIn = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onSuccess: async (tokenResponse) => {
      setAccessToken(tokenResponse.access_token)
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

      try {
        if (import.meta.env.VITE_TEST_MODE === 'true') {
          setRewrittenEmail(campaign.draft)
          setRewrittenSubject(campaign.subject)
        } else {
          const res = await fetch('/api/rewrite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ draft: campaign.draft, subject: campaign.subject }),
          })
          const data = await res.json()
          setRewrittenEmail(data.rewritten)
          setRewrittenSubject(data.subject)
        }
      } catch {
        setError('Failed to generate your email. Please try again.')
        setScreen('error')
      } finally {
        setIsLoading(false)
      }
    },
    onError: () => setError('Sign-in failed. Please try again.'),
  })

  async function handleSend() {
    if (!rewrittenEmail) return
    setIsLoading(true)
    try {
      if (import.meta.env.VITE_TEST_MODE === 'true') {
        await new Promise(r => setTimeout(r, 800))
      } else {
        const emails = campaign.managementEmails || [campaign.managementEmail]
        const recipients = campaign.recipientStrategy === 'random'
          ? [emails[Math.floor(Math.random() * emails.length)]]
          : emails
        for (const to of recipients) {
          await sendEmail(accessToken, to, rewrittenSubject || campaign.subject, rewrittenEmail)
        }
        await fetch(`/api/campaign?id=${id}&action=increment`, { method: 'POST' })
      }
      if (isOrganizer) {
        navigate(`/manage/${id}`)
      } else {
        setScreen('done')
      }
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

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
        <p className="text-gray-500">Campaign not found.</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (screen === 'landing') {
    return <LandingScreen campaign={campaign} neighborCount={campaign.sendCount || 0} onSignIn={signIn} />
  }

  if (screen === 'preview') {
    return (
      <PreviewScreen
        campaign={{ ...campaign, subject: rewrittenSubject || campaign.subject }}
        user={user}
        rewrittenEmail={rewrittenEmail}
        isLoading={isLoading}
        onSend={handleSend}
        onSignOut={handleSignOut}
      />
    )
  }

  if (screen === 'done') {
    return <DoneScreen campaign={campaign} neighborCount={(campaign.sendCount || 0) + 1} />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center">
      <div className="text-4xl mb-4">!</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm mb-6">{error}</p>
      <button
        onClick={() => { setScreen('landing'); setError(null) }}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
      >
        Try again
      </button>
    </div>
  )
}
