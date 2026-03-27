export default function TermsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-12">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-semibold text-gray-900 mb-2">What SendTogether is</h2>
            <p>SendTogether is a free tool that helps apartment residents coordinate emails to building management. An organizer drafts a message, generates a shareable link, and neighbors can each send their own reworded version from their personal Gmail account.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Acceptable use</h2>
            <p>You may use SendTogether only for lawful purposes. You agree not to use this service to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Send spam, harassing, or threatening messages</li>
              <li>Impersonate any person or organization</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt the service</li>
            </ul>
            <p className="mt-2">You are solely responsible for the content of emails sent through your account.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Gmail access</h2>
            <p>By signing in with Google, you grant SendTogether temporary permission to send one email on your behalf using the Gmail API. We request only the <code className="bg-gray-100 px-1 rounded">gmail.send</code> scope. We never read your inbox or store your credentials. Your access token exists only in your browser session and is discarded after use.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">No warranties</h2>
            <p>SendTogether is provided "as is" without any warranties of any kind. We do not guarantee that emails will be delivered, that the service will be available at all times, or that any particular outcome will result from using the service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Limitation of liability</h2>
            <p>To the maximum extent permitted by law, SendTogether and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Changes to these terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Contact</h2>
            <p>Questions? Contact us at <a href="mailto:hello@sendtogether.app" className="text-blue-600 underline">hello@sendtogether.app</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
