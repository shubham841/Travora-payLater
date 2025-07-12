'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, EyeOff, Eye } from 'lucide-react';
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

export default function PackageManagement() {
  const [packages, setPackages] = useState(initialPackages);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    category: '',
    duration: '',
    itinerary: '',
    inclusions: '',
    exclusions: '',
    price: '',
  });

  const handleSubmit = () => {
    if (editing) {
      setPackages((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...editing, ...formData } : p))
      );
    } else {
      setPackages((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          status: 'Active',
        },
      ]);
    }
    setModalOpen(false);
    setEditing(null);
    setFormData({
      name: '',
      destination: '',
      category: '',
      duration: '',
      itinerary: '',
      inclusions: '',
      exclusions: '',
      price: '',
    });
  };

  const handleEdit = (pkg) => {
    setFormData(pkg);
    setEditing(pkg);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = (id) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-blue-100 py-4 px-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Package Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Table */}
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
                <td className="px-4 py-2">{pkg.name}</td>
                <td className="px-4 py-2">{pkg.destination}</td>
                <td className="px-4 py-2">{pkg.duration}</td>
                <td className="px-4 py-2">₹{pkg.price}</td>
                <td className={`px-4 py-2 font-semibold ${pkg.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {pkg.status}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(pkg)} title="Edit">
                    <Pencil className="w-4 h-4 text-blue-500" />
                  </button>
                  <button onClick={() => handleDelete(pkg.id)} title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <button onClick={() => toggleStatus(pkg.id)} title="Toggle Status">
                    {pkg.status === 'Active' ? (
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
        {packages.length === 0 && (
          <div className="text-center text-gray-500 p-4">No packages found.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-2">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4">{editing ? 'Edit' : 'Add'} Package</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Destination"
                className="p-2 border rounded"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category (e.g. Honeymoon)"
                className="p-2 border rounded"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration (e.g. 3N/4D)"
                className="p-2 border rounded"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
              <input
                type="text"
                placeholder="Price"
                className="p-2 border rounded"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cover Photos (URLs)"
                className="p-2 border rounded"
                // Optional enhancement
              />
            </div>

            <textarea
              rows="3"
              placeholder="Detailed Itinerary"
              className="mt-4 p-2 w-full border rounded"
              value={formData.itinerary}
              onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
            />

            <textarea
              rows="2"
              placeholder="Inclusions"
              className="mt-2 p-2 w-full border rounded"
              value={formData.inclusions}
              onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
            />

            <textarea
              rows="2"
              placeholder="Exclusions"
              className="mt-2 p-2 w-full border rounded"
              value={formData.exclusions}
              onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => {
                  setModalOpen(false);
                  setEditing(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSubmit}
              >
                {editing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
