"use client"
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Property } from '@/types/property';
import Head from '../../components/ui/head';

const AddProperty: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<Property>({
    id: 0,
    images: [{ img: '' }],
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    status: 'For Sale',
    type: 'House',
  });

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'bedrooms' || id === 'bathrooms' ? parseInt(value) || 1 : value,
    }));
  };

  // Handle image input changes
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = { img: value };
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Add new image input
  const addImageInput = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { img: '' }],
    }));
  };

  // Remove image input
  const removeImageInput = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.title || !formData.location || !formData.price || !formData.area) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log('Property submitted:', formData);
    // Reset form (optional)
    setFormData({
      id: 0,
      images: [{ img: '' }],
      title: '',
      description: '',
      location: '',
      price: '',
      bedrooms: 1,
      bathrooms: 1,
      area: '',
      status: 'For Sale',
      type: 'House',
    });
  };

  return (
    <>
      <Head head="Add Property" />
      
      <div className="container m-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col justify-center">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-grey1 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Property Title"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-grey1 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Property Description"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={4} />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-grey1 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Property Location"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-grey1 mb-2">
                Price *
              </label>
              <input
                type="text"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., $500,000 or $2,000/month"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-grey1 mb-2">
                Bedrooms *
              </label>
              <input
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-grey1 mb-2">
                Bathrooms *
              </label>
              <input
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-grey1 mb-2">
                Area (sq ft) *
              </label>
              <input
                type="text"
                id="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., 1500 sq ft"
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-grey1 mb-2">
                Status *
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-grey1 mb-2">
                Property Type *
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              >
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block text-grey1 mb-2">Images</label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={image.img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="w-full border border-grey1 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageInput(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageInput}
                className="flex items-center space-x-1 text-secondary hover:text-tertiary"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Image</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-tertiary transition"
            >
              Add Property
            </button>
          </form>
        </div>
      </div></>
  );
};

export default AddProperty;