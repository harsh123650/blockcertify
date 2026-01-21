export default function ContactPage() {
  return (
    <section className="bg-base-300 min-h-[calc(100vh-5.6rem)] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-base-content mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-lg text-base-content leading-relaxed text-center mb-8">
          Have questions or need support? Reach out to us and we’ll get back to
          you as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-base-content">
              <strong>Email:</strong> support@yourdomain.com
            </p>
            <p className="text-base-content">
              <strong>Phone:</strong> +91-9876543210
            </p>
            <p className="text-base-content">
              <strong>Address:</strong> 123 Blockchain Lane, Tech City, India
            </p>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Your Message"
            />
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
