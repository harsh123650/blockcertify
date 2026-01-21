export default function AboutPage() {
  return (
    <section className="bg-base-300 min-h-[calc(100vh-5.6rem)] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-base-content mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-base-content leading-relaxed">
          Welcome to our decentralized certification platform. We specialize in
          issuing tamper-proof, verifiable digital certificates using blockchain
          technology. Whether it's academic, legal, or professional
          verification, we ensure maximum transparency and trust for both
          issuers and recipients.
        </p>
        <p className="mt-4 text-base-content text-lg leading-relaxed">
          Our goal is to eliminate fraudulent credentials by providing a
          platform where certificates are permanently recorded and easily
          validated from anywhere. Backed by modern tech and a user-friendly
          interface, we serve individuals, institutions, and organizations
          alike.
        </p>
      </div>
    </section>
  );
}
