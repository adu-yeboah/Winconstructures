'use client';

import { notFound, useParams } from 'next/navigation';
import { properties } from '@/constants/properties';
import { Property } from '@/types/property';
import React, { useState } from 'react';
import Head from '@/app/(admin)/components/ui/head';


export default function ProductDetails() {
  const params = useParams();
  const id = params?.id;
  const property = properties.find((item) => item.id.toString() === params.id);

  console.log(property);

  if (!property) return notFound();

  const [formData, setFormData] = useState<Property>({ ...property });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'bedrooms' || name === 'bathrooms' ? parseInt(value) : value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updated Property:', formData);
    // TODO: Call backend API to update
    alert('Property updated (check console)');
  };

  const handleDelete = () => {
    console.log('Delete Property ID:', property.id);
    // TODO: Call backend API to delete
    alert('Property deleted (check console)');
  };

  return (
    <>
      <Head head='Edit Property' />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {formData.images.map((imgObj, idx) => (
            <img
              key={idx}
              src={imgObj.img}
              alt={`Property Image ${idx + 1}`}
              className="w-full h-40 object-cover rounded shadow-sm" />
          ))}
        </div>

        {/* Editable Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-secondary text-white px-6 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-tertiary hover:bg-red-700 text-white px-6 py-2 rounded"
            >
              Delete Property
            </button>
          </div>
        </form>
      </div></>
  );
}
