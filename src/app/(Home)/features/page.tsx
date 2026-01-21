export default function FeaturesPage() {
  return (
    <section className="bg-base-300 min-h-[calc(100vh-5.6rem)] flex items-center justify-center px-4">
      <div className="max-w-5xl w-full mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-base-content mb-6 text-center">
          🚀 Features
        </h1>
        <p className="text-lg text-base-content text-center mb-8">
          Discover the powerful features that make our certification platform
          secure, transparent, and reliable.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">🔐 Blockchain Security</h2>
            <p className="text-base-content">
              All certificates are stored and verified using decentralized
              blockchain technology for maximum security.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">📄 Digital Certificates</h2>
            <p className="text-base-content">
              Instantly issue verifiable, tamper-proof digital certificates to
              individuals and organizations.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">📬 Email Delivery</h2>
            <p className="text-base-content">
              Recipients receive certificates via email with direct verification
              links.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">🔎 Easy Verification</h2>
            <p className="text-base-content">
              Anyone can verify a certificate by simply entering its ID — no
              technical knowledge needed.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">🏢 Multi-Org Support</h2>
            <p className="text-base-content">
              Issue and manage certificates across multiple organizations with
              role-based control.
            </p>
          </div>
          <div className="bg-base-100 rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">📊 Analytics</h2>
            <p className="text-base-content">
              Gain insights into certificate issuance, verifications, and
              organization performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
