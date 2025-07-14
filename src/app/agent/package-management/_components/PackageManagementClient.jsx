'use client';

import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, EyeOff, Eye, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialPackages = [
  {
    id: 1,
    name: 'Goa Getaway',
    destination: 'Goa',
    category: 'Beach',
    duration: '3N/4D',
    itinerary: 'Day 1 Arrival, Day 2 Sightseeing, Day 3 Beach, Day 4 Departure',
    inclusions: 'Hotel, Breakfast, Local Tours',
    exclusions: 'Flights, Personal Expenses',
    price: 12000,
    status: 'Active',
  },
];

export default function PackageManagementClient({ clerkUserId }) {
  const [packages, setPackages] = useState(initialPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deletingPackage, setDeletingPackage] = useState(null);
  const [step, setStep] = useState(1);
  const [togglingPackage, setTogglingPackage] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState({ cover: '', itinerary: [] });

  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    category: '',
    duration: '',
    itinerary: '',
    inclusions: '',
    exclusions: '',
    price: '',
    description: '',
    coverImage: null,
    itineraryImages: null,
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/agent/getPackages?clerk_user_id=${clerkUserId}`);
        if (!res.ok) throw new Error('Failed to fetch packages');
        const result = await res.json();
        setPackages(result.data);
      } catch (error) {
        console.error("❌ Error fetching packages:", error);
      }
    };

    if (clerkUserId) {
      fetchPackages();
    }
  }, [clerkUserId]);


  useEffect(() => {
    if (formData.coverImage) {
      setImagePreviews((prev) => ({ ...prev, cover: URL.createObjectURL(formData.coverImage) }));
    }
    if (formData.itineraryImages) {
      const filesArray = Array.from(formData.itineraryImages).map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => ({ ...prev, itinerary: filesArray }));
    }
  }, [formData.coverImage, formData.itineraryImages]);

  const isStep1Valid = formData.name && formData.destination && formData.category && formData.duration && formData.price && formData.description;
  const isStep2Valid = formData.itinerary && formData.inclusions && formData.exclusions && formData.email && formData.contact;
  const isStep3Valid =
    (formData.coverImage || imagePreviews.cover) &&
    ((formData.itineraryImages && formData.itineraryImages.length > 0) || imagePreviews.itinerary.length > 0);


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setFormData({
      name: '',
      destination: '',
      category: '',
      duration: '',
      itinerary: '',
      inclusions: '',
      exclusions: '',
      price: '',
      description: '',
      email: '',
      contact: '',
      coverImage: null,
      itineraryImages: null,
    });
    setImagePreviews({ cover: '', itinerary: [] });
    setEditing(null);
    setStep(1);
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("clerk_user_id", clerkUserId);
    payload.append("title", formData.name);
    payload.append("destination", formData.destination);
    payload.append("category", formData.category);
    payload.append("duration", formData.duration);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    payload.append("itinerary", formData.itinerary);
    payload.append("inclusions", formData.inclusions);
    payload.append("exclusions", formData.exclusions);
    payload.append("email", formData.email);
    payload.append("phone", formData.contact); // ← renamed to "phone" for backend column

    if (formData.coverImage) {
      payload.append("cover_image", formData.coverImage);
    }

    if (formData.itineraryImages && formData.itineraryImages.length > 0) {
      for (let i = 0; i < formData.itineraryImages.length; i++) {
        payload.append("itinerary_images", formData.itineraryImages[i]);
      }
    }

    try {
      const url = editing
        ? `http://localhost:5000/api/agent/updatePackage/${editing.id}`
        : "http://localhost:5000/api/agent/submitPackage";

      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: payload,
      });

      if (!res.ok) throw new Error("Failed to submit/update package");
      const result = await res.json();

      if (editing) {
        setSuccessMessage("✅ Package updated!");
        setPackages((prev) =>
          prev.map((pkg) => (pkg.id === editing.id ? result.data : pkg))
        );
      } else {
        setSuccessMessage("🎉 Package submitted successfully!");
        setPackages((prev) => [result.data, ...prev]);
      }

      setSuccessMessage(editing ? "✅ Package updated!" : "🎉 Package submitted successfully!");
      resetForm();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error submitting/updating package:", err);
    }
  };


  const handleChange = (e) => {
    const { name, value, files, multiple } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? (multiple ? Array.from(files) : files[0]) : value,
    }));
  };

  const handleEdit = (pkg) => {
    console.log(pkg);
    setFormData({
      name: pkg.title, // ✅ map "title" from DB to "name" used in form
      destination: pkg.destination,
      category: pkg.category,
      duration: pkg.duration,
      price: pkg.price,
      description: pkg.description,
      itinerary: pkg.itinerary,
      inclusions: pkg.inclusions,
      exclusions: pkg.exclusions,
      email: pkg.email,
      contact: pkg.phone, // if stored as "phone" in DB
      coverImage: null, // reset file input
      itineraryImages: null,
    });

    setImagePreviews({
      cover: pkg.cover_image ? `http://localhost:5000/${pkg.cover_image}` : '',
      itinerary: pkg.itinerary_images?.map((img) => `http://localhost:5000/${img}`) || [],
    });

    setEditing(pkg);
    setStep(1);
    setModalOpen(true);
  };


  const handleDelete = (pkg) => {
    setDeletingPackage(pkg); // Show confirmation modal
  };


  const confirmDelete = async () => {
    try {
      const tit = deletingPackage.title;
      const res = await fetch(`http://localhost:5000/api/agent/deletePackage/${deletingPackage.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete package");

      setPackages((prev) => prev.filter((p) => p.id !== deletingPackage.id));
      setSuccessMessage(`Package deleted successfully! "${tit}"`);
      setDeletingPackage(null); // Close modal
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error deleting package:", err);
    }
  };

  const toggleStatus = (id) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
      )
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Basic Package Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="e.g., Magical Bali Adventure" className="p-2 border rounded" value={formData.name} onChange={handleChange} />
              <input type="text" name="destination" placeholder="e.g., Bali, Indonesia" className="p-2 border rounded" value={formData.destination} onChange={handleChange} />
              <input type="text" name="category" placeholder="Select travel category" className="p-2 border rounded" value={formData.category} onChange={handleChange} />
              <input type="text" name="duration" placeholder="Select duration" className="p-2 border rounded" value={formData.duration} onChange={handleChange} />
              <input type="text" name="price" placeholder="e.g., ₹12,000" className="p-2 border rounded" value={formData.price} onChange={handleChange} />
            </div>
            <textarea name="description" placeholder="Write a captivating summary of your travel package that highlights the key attractions and experiences..." className="p-2 border rounded w-full" value={formData.description} onChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Detailed Information</h4>
            <textarea name="itinerary" rows="4" placeholder="Provide a day-by-day breakdown of activities and experiences" className="p-2 border rounded w-full" value={formData.itinerary} onChange={handleChange} />
            <textarea name="inclusions" rows="2" placeholder="List everything included in the package (one item per line)" className="p-2 border rounded w-full" value={formData.inclusions} onChange={handleChange} />
            <textarea name="exclusions" rows="2" placeholder="List what travelers need to arrange separately" className="p-2 border rounded w-full" value={formData.exclusions} onChange={handleChange} />

            <h4 className="text-lg font-semibold mt-6">Contact Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" name="email" placeholder="Enter your email address" className="p-2 border rounded" value={formData.email} onChange={handleChange} />
              <input type="tel" name="contact" placeholder="Enter contact number" className="p-2 border rounded" value={formData.contact} onChange={handleChange} />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Upload Images</h4>
            <div className="border border-dashed border-gray-400 p-4 rounded-md">
              <label className="text-base font-medium text-blue-800 flex items-center gap-1 mb-1">
                <ImageIcon className="w-4 h-4" /> Cover Image <span className="text-red-600">*</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">Upload a stunning main image that represents your travel package</p>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                <ImageIcon className="w-10 h-10 text-gray-500 mb-2" />
                <span className="font-medium text-gray-700">Upload Cover Image</span>
                <span className="text-xs text-gray-500">Drag and drop your image here, or click to select</span>
                <input type="file" name="coverImage" className="hidden" onChange={handleChange} />
              </label>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG, WebP up to 10MB</p>
              {imagePreviews.cover && <img src={imagePreviews.cover} alt="Cover Preview" className="mt-3 h-40 object-cover rounded" />}
            </div>
            <div className="border border-dashed border-gray-400 p-4 rounded-md">
              <label className="text-base font-medium text-blue-800 flex items-center gap-1 mb-1">
                <ImageIcon className="w-4 h-4" /> Itinerary Images <span className="text-sm text-gray-500 font-normal">(Optional)</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">Add multiple images showcasing activities, destinations, and experiences</p>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                <ImageIcon className="w-10 h-10 text-gray-500 mb-2" />
                <span className="font-medium text-gray-700">Upload Itinerary Images</span>
                <span className="text-xs text-gray-500">Multiple images to showcase your travel package</span>
                <input type="file" name="itineraryImages" className="hidden" multiple onChange={handleChange} />
              </label>
              <p className="text-xs text-gray-500 mt-2">Select multiple images (JPG, PNG, WebP up to 10MB each)</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {imagePreviews.itinerary.map((src, idx) => (
                  <img key={idx} src={src} alt={`Itinerary ${idx}`} className="h-20 w-20 object-cover rounded" />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-4 px-7">
      {successMessage && (
        <div className="mb-4 px-4 py-2 text-green-800 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Package Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Package Name</th>
              <th className="px-4 py-2">Destination</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{pkg.title}</td>
                <td className="px-4 py-2">{pkg.destination}</td>
                <td className="px-4 py-2">{pkg.duration}</td>
                <td className="px-4 py-2">₹{pkg.price}</td>
                <td className={`px-4 py-2 font-semibold ${pkg.is_active === true ? 'text-green-600' : 'text-red-600'}`}>{pkg.is_active ? 'Active' : 'Not Active'}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(pkg)} title="Edit"><Pencil className="w-4 h-4 text-blue-500" /></button>
                  <button onClick={() => handleDelete(pkg)} title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <button onClick={() => setTogglingPackage(pkg)} title="Toggle Status">
                    {pkg.is_active ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-green-500" />
                    )}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {packages.length === 0 && <div className="text-center text-gray-500 p-4">No packages found.</div>}
      </div>

      {deletingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-red-600">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the package <strong>{deletingPackage.title}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeletingPackage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel!
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}

      {togglingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-yellow-600">Confirm Status Change</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to set the package <strong>{togglingPackage.title}</strong> to{' '}
              <strong>{togglingPackage?.is_active ? 'Inactive' : 'Active'}</strong>
?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setTogglingPackage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const pkg = togglingPackage;

                  try {
                    const res = await fetch(`http://localhost:5000/api/agent/updateStatus/${pkg.id}`, {
                      method: "PUT",
                    });

                    if (!res.ok) throw new Error("Failed to toggle status");

                    const result = await res.json();

                    setPackages((prev) =>
                      prev.map((p) =>
                        p.id === pkg.id ? result.data : p
                      )
                    );

                    const newStatusLabel = result.data.is_active ? 'Active' : 'Inactive';
                    setSuccessMessage(`Package "${pkg.title}" is now ${newStatusLabel}`);
                    setTogglingPackage(null);
                    setTimeout(() => setSuccessMessage(""), 3000);
                  } catch (error) {
                    console.error("❌ Error updating package status:", error);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Yes, Set to {togglingPackage?.is_active ? 'Inactive' : 'Active'}
              </button>

            </div>
          </div>
        </div>
      )}


      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-2">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit' : 'Add'} Package</h3>
            {renderStepContent()}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-2">
                {step > 1 && <button className="px-4 py-2 bg-gray-200 rounded" onClick={prevStep}><ChevronLeft className="w-4 h-4 inline mr-1" /> Back</button>}
                {step < 3 ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={nextStep} disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}>
                    Next <ChevronRight className="w-4 h-4 inline ml-1" />
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleSubmit} disabled={!isStep3Valid}>Submit</button>
                )}
              </div>
              <button className="text-sm text-gray-500 underline" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}