"use client";
import { useAuth } from "@/context/AuthProvider";
import { getContract, initBlockchain } from "@/middlewares/blockchain.config";
import { Organisation } from "@/types/Organisation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const IssueCertificate = () => {
  const { user } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [generatedCertificateZip, setGeneratedCertificateZip] = useState("");
  const [certificateTemplate, setCertificateTemplate] = useState<File | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [organisation, setOrganisation] = useState<Organisation[]>();
  const [certificateDetails, setCertificateDetails] = useState({
    title: "",
    description: "",
    issuingOrganisation: "",
    issuedOn: new Date(),
    category: "",
  });
  const fetchOrganisations = async () => {
    try {
      const response = await axios.get("/api/organisation?id=" + user?._id);
      setOrganisation(response.data.organisations);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    initBlockchain();
    fetchOrganisations();
  }, []);

  const generateCertificate = async () => {
    if (
      !excelFile ||
      !certificateTemplate ||
      !certificateDetails.issuingOrganisation ||
      !certificateDetails.title ||
      !certificateDetails.description ||
      !certificateDetails.category ||
      !certificateDetails.issuedOn
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!window.ethereum) {
      toast.error("MetaMask is not installed!");
      return;
    }
    const contract = await getContract();
    if (!contract) {
      toast.error("Failed to fetch contract");
      return;
    }
    try {
      toast.loading("Generating Certificates...");
      const response = await axios.postForm("/api/certificate", {
        excelFile,
        certificateTemplate,
        title: certificateDetails.title,
        description: certificateDetails.description,
        issuingOrganisation: certificateDetails.issuingOrganisation,
        issuedOn: certificateDetails.issuedOn,
        category: certificateDetails.category,
      });

      if (response.status !== 200) {
        toast.dismiss();
        toast.error(response.data.message);
        return;
      }
      console.log(response);
      toast.loading("Adding Certificates to Blockchain");
      try {
        console.log(...response.data.certificateData);
        const transaction = await contract.addCertificatesInBulk(
          response.data.certificateData
        );
        await transaction.wait();
        toast.success("Certificates added to blockchain successfully");
      } catch (error) {
        console.log(error);
        toast.error(
          "An error occurred while adding certificates to blockchain"
        );
      } finally {
        toast.dismiss();
      }

      setGeneratedCertificateZip(response.data.path);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating certificates");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Issue Certificate
      </h1>
      <div className="w-full px-6 py-4 shadow-md rounded-md border border-primary">
        <div className="flex flex-col space-y-4">
          <label className="form-control w-full">
            <div className="label">Select Organisation</div>
            <select
              className="select select-bordered select-primary"
              value={organisation?._id!}
              onChange={(e) =>
                setCertificateDetails({
                  ...certificateDetails,
                  issuingOrganisation: e.target.value,
                })
              }
            >
              <option value="">Select Organisation</option>
              {organisation?.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">Upload Excel File</div>
            <input
              type="file"
              id="excelFile"
              className="file-input file-input-bordered file-input-primary"
              accept=".xlsx"
              onChange={(e) => setExcelFile(e.target.files![0])}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">Upload Certificate Template</div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary"
              accept=".docx"
              onChange={(e) => setCertificateTemplate(e.target.files![0])}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">Title</div>
            <input
              type="text"
              className="input input-bordered input-primary"
              placeholder="Enter Certificate Title"
              value={certificateDetails.title}
              onChange={(e) =>
                setCertificateDetails({
                  ...certificateDetails,
                  title: e.target.value,
                })
              }
            />
          </label>
          <label className="form-control w-full">
            <div className="label">Description</div>
            <textarea
              className="textarea textarea-bordered textarea-primary"
              placeholder="Enter Certificate Description"
              value={certificateDetails.description}
              onChange={(e) =>
                setCertificateDetails({
                  ...certificateDetails,
                  description: e.target.value,
                })
              }
            />
          </label>
          <label className="form-control w-full">
            <div className="label">Category</div>
            <select
              className="select select-bordered select-primary"
              value={certificateDetails.category}
              onChange={(e) =>
                setCertificateDetails({
                  ...certificateDetails,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option value="Academic">Academic</option>
              <option value="Employment">Employment</option>
              <option value="Legal">Legal</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">Issued On</div>
            <input
              type="date"
              className="input input-bordered input-primary"
              value={certificateDetails.issuedOn.toISOString().split("T")[0]}
              onChange={(e) =>
                setCertificateDetails({
                  ...certificateDetails,
                  issuedOn: new Date(e.target.value),
                })
              }
            />
          </label>
          <span className="divider" />
          <div className="flex flex-row items-center justify-center space-x-4">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <span>
              I have Checked All the data and I am ready to generate the
              Certificates{" "}
            </span>
          </div>

          <button
            className="btn btn-primary mt-6"
            disabled={!isChecked}
            onClick={generateCertificate}
          >
            Issue Certificate
          </button>
          {generatedCertificateZip && (
            <a
              href="/generated.zip"
              download={true}
              className="btn btn-accent btn-outline mt-6 mx-auto"
            >
              Download Certificates
            </a>
          )}
        </div>
      </div>
    </>
  );
};
export default IssueCertificate;
