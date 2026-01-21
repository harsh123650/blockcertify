import { IconCircleChevronRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <section className="bg-base-300 h-[calc(100vh-5.6rem)] flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            BlockCertify: Blockchain-Powered Certificate Generator
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base-content/70 lg:mb-8 md:text-lg lg:text-xl">
            Generate, verify, and store certificates securely on the blockchain.
            Ensure authenticity with tamper-proof digital certificates and
            unique certificate IDs.
          </p>
          <a
            href="/login"
            className="btn btn-primary text-base font-medium text-center rounded-lg mr-4"
          >
            Generate Certificates
            <IconCircleChevronRight />
          </a>
          <a
            href="/verify"
            className="btn btn-outline text-base font-medium text-center rounded-lg mr-4"
          >
            Verify Certificate
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="Blockchain Voting" />
        </div>
      </div>
    </section>
  );
}
