import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    buildingName: '',
    managementEmail: '',
    subject: '',
    draft: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create campaign')
      navigate(`/manage/${data.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Start a campaign</h1>
          <p className="text-gray-500 text-sm">Fill in the details and you'll get a link to share with neighbors.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Building name</label>
            <input
              name="buildingName"
              value={form.buildingName}
              onChange={handleChange}
              placeholder="e.g. The Nexus"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Management email <span className="text-red-400">*</span></label>
            <input
              name="managementEmail"
              type="email"
              value={form.managementEmail}
              onChange={handleChange}
              required
              placeholder="management@yourbuilding.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject line <span className="text-red-400">*</span></label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Request: Fix the billiards table"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Draft email <span className="text-red-400">*</span></label>
            <p className="text-xs text-gray-400 mb-2">Each neighbor will get a uniquely reworded version of this.</p>
            <textarea
              name="draft"
              value={form.draft}
              onChange={handleChange}
              required
              rows={8}
              placeholder={`Hi,\n\nI'm a resident at [building] and I'm writing to request...\n\nThank you for your time.`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 rounded-2xl transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create campaign'}
          </button>
        </form>
      </div>
    </div>
  )
}
