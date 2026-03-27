export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-12 bg-white dark:bg-gray-900">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">What SendTogether does</h2>
            <p>SendTogether helps apartment residents send coordinated emails to building management. An organizer creates a campaign with a draft email, shares a link, and neighbors can each send their own uniquely reworded version with one tap.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Google account access</h2>
            <p>When you sign in with Google, we request permission to <strong>send email on your behalf</strong> using the Gmail API (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">gmail.send</code> scope). This is the only permission we request.</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>We <strong>never read</strong> your inbox, drafts, or any existing email.</li>
              <li>We <strong>never store</strong> your access token — it exists only in your browser session.</li>
              <li>We <strong>only send</strong> the email you explicitly review and approve before sending.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">What we store</h2>
            <p>We store campaign data — the draft email, subject line, management email address, building name, and a send count. We do not store your name, email address, or any personal information beyond what you explicitly enter when creating a campaign.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies and tracking</h2>
            <p>We do not use cookies, analytics, or any third-party tracking.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Data retention</h2>
            <p>Campaign data is stored indefinitely unless you contact us to request deletion.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h2>
            <p>For questions or deletion requests, contact us at <a href="mailto:hello@sendtogether.app" className="text-blue-600 dark:text-blue-400 underline">hello@sendtogether.app</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
