import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddProject = () => {
  const { name } = useParams(); // gets `Lumbini Province` from URL
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    allocatedById: name || '', // set by route param
    startDate: '',
    endDate: '',
    allocatedAmount: '',
    completionRate: '',
    lastUpdated: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Update allocatedById when param changes
    setFormData((prev) => ({ ...prev, allocatedById: name }));
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create project');

      const data = await res.json();
      setMessage({ type: 'success', text: 'Project created successfully!' });

      setFormData({
        title: '',
        description: '',
        allocatedById: name || '',
        startDate: '',
        endDate: '',
        allocatedAmount: '',
        completionRate: '',
        lastUpdated: '',
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

      {message.text && (
        <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="allocatedAmount" type="number" placeholder="Allocated Amount" value={formData.allocatedAmount} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="completionRate" type="number" placeholder="Completion Rate (%)" value={formData.completionRate} onChange={handleChange} required min="0" max="100" className="w-full border p-2 rounded" />
        <input name="lastUpdated" type="date" value={formData.lastUpdated} onChange={handleChange} className="w-full border p-2 rounded" />

        {/* Hidden input for allocatedById */}
        <input type="hidden" name="allocatedById" value={formData.allocatedById} />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;
