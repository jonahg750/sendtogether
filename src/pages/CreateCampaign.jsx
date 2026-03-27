import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    buildingName: '',
    subject: '',
    draft: '',
  })
  const [emails, setEmails] = useState([''])
  const [recipientStrategy, setRecipientStrategy] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleEmailChange(index, value) {
    setEmails(prev => prev.map((e, i) => i === index ? value : e))
  }

  function addEmail() {
    setEmails(prev => [...prev, ''])
  }

  function removeEmail(index) {
    setEmails(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validEmails = emails.map(e => e.trim()).filter(Boolean)
    if (validEmails.length === 0) {
      setError('At least one management email is required.')
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          managementEmails: validEmails,
          recipientStrategy,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create campaign')
      navigate(`/c/${data.id}?from=create`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-widest uppercase mb-6">SendTogether</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Start a campaign</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Fill in the details and you'll get a link to share with neighbors.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Building name</label>
            <input
              name="buildingName"
              value={form.buildingName}
              onChange={handleChange}
              placeholder="e.g. The Nexus"
              className={inputClass}
            />
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Management email(s) <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {emails.map((email, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => handleEmailChange(i, e.target.value)}
                    required={i === 0}
                    placeholder="management@yourbuilding.com"
                    className="flex-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(i)}
                      className="text-gray-400 hover:text-red-500 px-2 text-lg leading-none"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEmail}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                + Add another recipient
              </button>
            </div>
          </div>

          {/* Recipient strategy */}
          {emails.filter(Boolean).length > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recipient strategy</label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="recipientStrategy"
                    value="all"
                    checked={recipientStrategy === 'all'}
                    onChange={() => setRecipientStrategy('all')}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Email everyone</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Each neighbor's email goes to all recipients</p>
                  </div>
                </label>
                <label className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="recipientStrategy"
                    value="random"
                    checked={recipientStrategy === 'random'}
                    onChange={() => setRecipientStrategy('random')}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Random pick</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Each neighbor's email goes to one randomly chosen recipient — spreads the volume</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject line <span className="text-red-400">*</span></label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Request: Fix the billiards table"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Draft email <span className="text-red-400">*</span></label>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Each neighbor will get a uniquely reworded version of this.</p>
            <textarea
              name="draft"
              value={form.draft}
              onChange={handleChange}
              required
              rows={8}
              placeholder={`Hi,\n\nI'm a resident at [building] and I'm writing to request...\n\nThank you for your time.`}
              className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-900 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create campaign'}
          </button>
        </form>
      </div>
    </div>
  )
}
