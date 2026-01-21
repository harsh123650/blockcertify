"use client";
import { useAuth } from "@/context/AuthProvider";
import { IconEdit, IconCamera } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleSubmit = async () => {
    (document.getElementById("editProfile") as HTMLDialogElement).close();
    const updatedUser = {
      ...user,
      name: formData.name,
      phone: formData.phone,
    };
    const res = axios.patch("/api/user/edit-profile", { user: updatedUser });
    toast.promise(res, {
      loading: "Updating profile...",
      success: (res) => {
        setUser(res.data.user);
        return "Profile updated successfully!";
      },
      error: "Failed to update profile!",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 bg-base-200 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-primary uppercase">
          Your Profile
        </h1>

        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-primary shadow-lg">
          <img
            src={user?.profileImage || "/avatar.png"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <button
            title="Change profile picture"
            className="absolute bottom-1 right-1 p-2 rounded-full bg-secondary text-white hover:bg-secondary-focus"
          >
            <IconCamera size={18} />
          </button>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-primary">{user?.name}</h2>
          <p className="text-base-content/80">{user?.email}</p>
          <p className="text-base-content/80">{user?.phone}</p>
        </div>

        <button
          onClick={() =>
            (
              document.getElementById("editProfile") as HTMLDialogElement
            ).showModal()
          }
          className="btn btn-outline btn-primary mt-4"
        >
          <IconEdit size={20} className="mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      <dialog id="editProfile" className="modal">
        <div className="modal-box p-6">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl text-primary mb-4 text-center">
            Edit Profile
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered input-primary w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              className="input input-bordered w-full"
              value={user?.email}
              readOnly
              disabled
            />
            <input
              type="text"
              placeholder="Contact No"
              className="input input-bordered input-primary w-full"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <button
              className="btn btn-primary w-full mt-2"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Profile;
