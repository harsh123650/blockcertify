"use client";
import { useAuth } from "@/context/AuthProvider";
import { Organisation } from "@/types/Organisation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageOrganisationPage = () => {
  const { user } = useAuth();
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [newOrganisation, setNewOrganisation] = useState<Organisation>({
    name: "",
    organisationType: "",
    contact: {
      email: "",
      phone: "",
      address: "",
    },
    establishedOn: new Date(),
    website: "",
  });

  const fetchOrganisations = async () => {
    if (!user?._id) return;
    const res = await axios.get(`/api/organisation?id=${user._id}`);
    setOrganisations(res.data.organisations);
  };

  useEffect(() => {
    fetchOrganisations();
  }, [user]);

  const handleAddOrganisation = async () => {
    try {
      const res = axios.post("/api/organisation/addNewOrganisation", {
        newOrganisation,
        owner: user?._id,
      });
      toast.promise(res, {
        loading: "Adding Organisation...",
        success: "Organisation Added Successfully",
        error: "Error adding Organisation",
      });
      (await res).data && fetchOrganisations(); // Refresh table
    } catch (error) {
      toast.error("Error adding Organisation");
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold text-center uppercase mb-6">
        Manage Organisation
      </h1>

      {/* Table Section */}
      <div className="overflow-x-auto bg-base-200 rounded-lg shadow-lg">
        <table className="table table-zebra">
          <thead className="bg-base-300 text-base font-semibold text-base-content">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Established</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {organisations.length ? (
              organisations.map((org, idx) => (
                <tr key={org._id}>
                  <td>{idx + 1}</td>
                  <td>{org.name}</td>
                  <td>{org.organisationType}</td>
                  <td>{org.contact.email}</td>
                  <td>{org.contact.phone}</td>
                  <td>{org.contact.address}</td>
                  <td>
                    {org.establishedOn
                      ? new Date(org.establishedOn).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{org.website || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-error">
                  No Organisations Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body space-y-3">
            <h2 className="card-title text-center uppercase justify-center">
              Add New Organisation
            </h2>

            {/* Name */}
            <label className="form-control w-full">
              <span className="label-text">Organisation Name</span>
              <input
                type="text"
                placeholder="Organisation Name"
                className="input input-bordered w-full"
                value={newOrganisation.name}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    name: e.target.value,
                  })
                }
              />
            </label>

            {/* Type */}
            <label className="form-control w-full">
              <span className="label-text">Organisation Type</span>
              <select
                className="select select-bordered w-full"
                value={newOrganisation.organisationType}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    organisationType: e.target.value,
                  })
                }
              >
                <option value="">Select Type</option>
                {[
                  "NGO",
                  "Company",
                  "Government",
                  "Educational",
                  "Non-Profit",
                  "Private",
                  "Public",
                  "Trust",
                  "Society",
                  "Foundation",
                  "Bank",
                  "Institute",
                  "Hospital",
                  "Others",
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            {/* Contact Email */}
            <label className="form-control w-full">
              <span className="label-text">Email</span>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={newOrganisation.contact.email}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    contact: {
                      ...newOrganisation.contact,
                      email: e.target.value,
                    },
                  })
                }
              />
            </label>

            {/* Phone */}
            <label className="form-control w-full">
              <span className="label-text">Phone</span>
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full"
                value={newOrganisation.contact.phone}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    contact: {
                      ...newOrganisation.contact,
                      phone: e.target.value,
                    },
                  })
                }
              />
            </label>

            {/* Address */}
            <label className="form-control w-full">
              <span className="label-text">Address</span>
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
                value={newOrganisation.contact.address}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    contact: {
                      ...newOrganisation.contact,
                      address: e.target.value,
                    },
                  })
                }
              />
            </label>

            {/* Date */}
            <label className="form-control w-full">
              <span className="label-text">Established On</span>
              <input
                type="date"
                className="input input-bordered w-full"
                value={newOrganisation.establishedOn?.toString().split("T")[0]}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    establishedOn: new Date(e.target.value),
                  })
                }
              />
            </label>

            {/* Website */}
            <label className="form-control w-full">
              <span className="label-text">Website</span>
              <input
                type="text"
                placeholder="https://example.com"
                className="input input-bordered w-full"
                value={newOrganisation.website}
                onChange={(e) =>
                  setNewOrganisation({
                    ...newOrganisation,
                    website: e.target.value,
                  })
                }
              />
            </label>

            {/* Submit Button */}
            <button
              onClick={handleAddOrganisation}
              className="btn btn-primary w-full"
            >
              Add Organisation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrganisationPage;
