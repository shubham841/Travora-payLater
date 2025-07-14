"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud, CheckCircle } from "lucide-react";

const AgentOnboardingForm = () => {
  const router = useRouter();
  const { user } = useUser();

  const [form, setForm] = useState({
    fullName: "",
    agencyName: "",
    email: "",
    mobile: "",
    address: "",
    gstin: "",
    bankAccountNo: "",
    ifsc: "",
  });

  const [files, setFiles] = useState({
    idProof: null,
    businessCert: null,
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.emailAddresses?.[0]?.emailAddress || "",
        mobile: user.phoneNumbers?.[0]?.phoneNumber || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.idProof || !files.businessCert) {
      toast.error("Please upload both ID Proof and Business Certificate.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("idProof", files.idProof);
    formData.append("businessCert", files.businessCert);
    if (user?.id) formData.append("clerkUserId", user.id);

    try {
      const res = await fetch("http://localhost:5000/api/agent/onboarding", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Form submitted successfully!");
        setTimeout(() => router.push("/agent/dashboard"), 2000);
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error during submission.");
    }
  };

  const isFormValid =
    Object.values(form).every((value) => value.trim() !== "") &&
    files.idProof &&
    files.businessCert;

  const DragDropFileInput = ({ label, name, onChange }) => (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-black transition">
      <div className="flex flex-col items-center gap-2">
        {name === "idProof" ? <UploadCloud size={32} /> : <CheckCircle size={32} />}
        <p className="text-blue-600 font-medium">Upload a file</p>
        <p className="text-gray-500 text-sm">or drag and drop</p>
        <p className="text-gray-400 text-xs">PNG, JPG, PDF up to 5MB</p>
      </div>
      <input
        type="file"
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
        className="hidden"
      />
      {files[name] && (
        <p className="text-sm text-green-600 mt-2">Uploaded: {files[name].name}</p>
      )}
    </label>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 flex flex-col items-center justify-start pt-10 px-4">
      <Toaster position="top-center" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-black">Become a PayLater Partner</h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Join our network of elite travel professionals and offer your customers the freedom to travel now and pay later.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full overflow-auto p-6 md:p-10"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl max-w-5xl mx-auto p-10 space-y-10 border border-black"
        >

          <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-black border-b pb-2">📄 Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Full Name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input-style" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Agency Name</label>
                <input name="agencyName" value={form.agencyName} onChange={handleChange} placeholder="Agency Name" className="input-style" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input-style" readOnly />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Mobile Number</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="input-style" readOnly />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-700 mb-1">Agency Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Agency Address" className="input-style" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-black border-b pb-2">🏦 Business & Payouts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="gstin" value={form.gstin} onChange={handleChange} placeholder="GSTIN" className="input-style" />
              <input name="bankAccountNo" value={form.bankAccountNo} onChange={handleChange} placeholder="Bank Account Number" className="input-style" />
              <input name="ifsc" value={form.ifsc} onChange={handleChange} placeholder="IFSC Code" className="input-style md:col-span-2" />
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-black border-b pb-2">📁 Document Verification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">ID Proof (PAN / Aadhaar)</label>
                <DragDropFileInput name="idProof" onChange={handleFileChange} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business Registration Certificate</label>
                <DragDropFileInput name="businessCert" onChange={handleFileChange} />
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <label className="text-sm text-gray-700 flex items-center gap-2">
              <input type="checkbox" required className="accent-black" />
              I agree to the <span className="text-black underline cursor-pointer">Terms</span> and <span className="text-black underline cursor-pointer">Privacy Policy</span>.
            </label>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={!isFormValid}
              className={`bg-black text-white py-3 px-6 rounded-lg transition w-full md:w-fit self-start ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
            >
              Create Account & Submit for Review →
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AgentOnboardingForm;
