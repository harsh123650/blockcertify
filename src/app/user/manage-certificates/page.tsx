"use client";
import { Certificate } from "@/types/Certificate";
import { useEffect, useState } from "react";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    async function fetchCertificates() {
      const res = await fetch("/api/user/certificates");
      const data = await res.json();
      setCertificates(data);
    }
    fetchCertificates();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center uppercase">
        🎓 All Issued Certificates
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra w-full bg-base-200">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>📄 Title</th>
              <th>🆔 Certificate ID</th>
              <th>🏛️ Organisation</th>
              <th>👤 Issued To</th>
              <th>📅 Issued On</th>
              <th>📚 Category</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert._id}>
                <td className="font-semibold">
                  {cert.certificateDetails.title}
                </td>
                <td>{cert.certificateId}</td>
                <td>{cert.issuingOrganisation?.name}</td>
                <td>{cert.issuedTo?.name}</td>
                <td>{new Date(cert.issuedOn).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-outline badge-primary">
                    {cert.certificateDetails.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
