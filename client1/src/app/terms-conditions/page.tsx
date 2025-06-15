import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions - proPAL AI",
  description: "Terms of service and conditions for using proPAL AI platform",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using proPAL AI services, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily use proPAL AI for personal, non-commercial 
                transitory viewing only.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>This license shall automatically terminate if you violate any restrictions</li>
                <li>Upon termination, you must destroy any downloaded materials</li>
                <li>The license does not include the right to distribute or modify content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                You are responsible for maintaining the confidentiality of your account and password.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain security of your password</li>
                <li>Notify us immediately of unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure sending of any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate other users or entities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall proPAL AI or its suppliers be liable for any damages arising out of 
                the use or inability to use the materials on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@propal-ai.com<br/>
                  <strong>Phone:</strong> +1 (555) 123-4567<br/>
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
