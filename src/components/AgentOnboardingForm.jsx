"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // 👈 Import Clerk hook

const AgentOnboardingForm = () => {
  const router = useRouter();
  const { user } = useUser(); // 👈 Get Clerk user

  const [form, setForm] = useState({
    fullName: "",
    agencyName: "",
    email: user?.emailAddresses?.[0]?.emailAddress || "", // auto-filled if available
    mobile: user?.phoneNumbers?.[0]?.phoneNumber || "",
    address: "",
    gstin: "",
    bankAccountNo: "",
    ifsc: "",
  });

  const [files, setFiles] = useState({
    idProof: null,
    businessCert: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (files.idProof) formData.append("idProof", files.idProof);
    if (files.businessCert) formData.append("businessCert", files.businessCert);

    // 👇 Add Clerk user ID to the payload
    if (user?.id) {
      formData.append("clerkUserId", user.id);
    }

    try {
      const res = await fetch("http://localhost:5000/api/agent/onboarding", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl max-w-3xl w-full p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Become a PayLater Partner
        </h2>
        <p className="text-center text-gray-500">
          Join our network of elite travel professionals and offer your customers the freedom to travel now and pay later.
        </p>

        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2">
            <span>📄</span> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input-style" />
            <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="Agency Name" className="input-style" />
            <input name="email" value={form.email} onChange={handleChange} placeholder={user?.emailAddresses?.[0]?.emailAddress} className="input-style" readOnly/>
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder={user?.phoneNumbers?.[0]?.phoneNumber} className="input-style" readOnly/>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Agency Address" className="input-style md:col-span-2" />
          </div>
        </div>

        {/* Business Info */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2 mt-6">
            <span>🏦</span> Business & Payouts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input name="gstin" value={form.gstin} onChange={handleChange} placeholder="GSTIN" className="input-style" />
            <input name="bankAccountNo" value={form.bankAccountNo} onChange={handleChange} placeholder="Bank Account Number" className="input-style" />
            <input name="ifsc" value={form.ifsc} onChange={handleChange} placeholder="IFSC Code" className="input-style md:col-span-2" />
          </div>
        </div>

        {/* Document Upload */}
        {/* <div>
          <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2 mt-6">
            <span>📁</span> Document Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="upload-box">Upload ID Proof (PAN/Aadhaar)</div>
            <div className="upload-box">Upload Business Registration</div>
          </div>
        </div> */}

        {/* Document Upload */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2 border-b pb-2 mt-6">
            <span>📁</span> Document Verification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="file"
              name="idProof"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
              className="file-input"
            />
            <input
              type="file"
              name="businessCert"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
              className="file-input"
            />
          </div>
        </div>


        {/* Terms and Submit */}
        <div className="mt-4 flex flex-col items-start gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" required className="accent-blue-600" />
            I agree to the <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition mt-2 w-full md:w-auto"
          >
            Create Account & Submit for Review →
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentOnboardingForm;
