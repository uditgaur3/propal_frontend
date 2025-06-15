import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cookie Policy - proPAL AI",
  description: "Cookie usage policy for proPAL AI platform",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit our website. They help us provide you with a better experience by remembering your 
                preferences and understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">We use cookies for several purposes:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Provide insights about website usage and performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Session Cookies</h3>
                  <p className="text-gray-700">
                    These are temporary cookies that are deleted when you close your browser. 
                    They help us maintain your session and keep you logged in.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Persistent Cookies</h3>
                  <p className="text-gray-700">
                    These cookies remain on your device for a set period or until you delete them. 
                    They help us remember your preferences across visits.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Cookies</h3>
                  <p className="text-gray-700">
                    Some cookies are set by third-party services that appear on our pages, 
                    such as analytics providers or social media platforms.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                <li>Delete existing cookies through your browser settings</li>
                <li>Set your browser to notify you when cookies are being set</li>
                <li>Use private/incognito browsing mode</li>
              </ul>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Disabling cookies may affect the functionality of our website 
                  and limit your access to certain features.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this 
                page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@propal-ai.com<br/>
                  <strong>Address:</strong> 123 Business Ave, Suite 100, Business City, BC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
