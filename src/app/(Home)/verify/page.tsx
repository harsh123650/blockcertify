"use client";
import { getContract } from "@/middlewares/blockchain.config";
import { Certificate } from "@/types/Certificate";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyPage = () => {
  const [certificateId, setCertificateId] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyCertificate = async (certificateId: string) => {
    if (certificateId.split("-").join("").length !== 16) {
      toast.error("Invalid Certificate ID");
      return;
    }
    setLoading(true);
    try {
      const contract = await getContract();
      if (!contract) {
        toast.error("Failed to fetch contract");
        setLoading(false);
        return;
      }
      const transaction = await contract.getCertificate(certificateId);
      const res = await axios.get(
        `/api/certificate/get?id=${transaction.mongoId}`
      );
      setCertificate(res.data.certificate);
      toast.success("Certificate Verified");
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      verifyCertificate(id);
    }
  }, [id]);

  return (
    <section className="bg-base-300 max-h-[calc(100vh-5.6rem)] flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Verify Existing Certificate
          </h1>
          <div className="flex flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder="Enter Valid 16 Digits Id (XXXX-XXXX-XXXX-XXXX)..."
              className="input input-primary w-full"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => verifyCertificate(certificateId)}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </div>
          {certificate && (
            <div className="mt-8 p-6 border border-base-content/20 rounded-lg bg-base-100 shadow-lg">
              <h2 className="text-2xl font-bold">Certificate Details</h2>
              <p className="text-lg font-light">
                Certificate ID: {certificate.certificateId}
              </p>
              <p className="text-lg font-light">
                Title: {certificate.certificateDetails.title}
              </p>
              <p className="text-lg font-light">
                Description:{" "}
                {certificate.certificateDetails.description || "N/A"}
              </p>
              <p className="text-lg font-light">
                Category: {certificate.certificateDetails.category}
              </p>
              <p className="text-lg font-light">
                Issuer: {certificate.issuer.name}
              </p>
              <p className="text-lg font-light">
                Issuing Organisation: {certificate.issuingOrganisation.name}
              </p>
              <p className="text-lg font-light">
                Issued To: {certificate.issuedTo.name}
              </p>
              {certificate.issuedTo.email && (
                <p className="text-lg font-light">
                  Recipient Email: {certificate.issuedTo.email}
                </p>
              )}
              {certificate.issuedTo.contact && (
                <p className="text-lg font-light">
                  Recipient Contact: {certificate.issuedTo.contact}
                </p>
              )}
              <p className="text-lg font-light">
                Date of Issue:{" "}
                {new Date(certificate.issuedOn).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="Certificate Image" />
        </div>
      </div>
    </section>
  );
};

export default VerifyPage;
