'use client';
import React, { useState, useRef } from 'react';
import { PlusCircle, Trash2, ArrowRight, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Property } from '@/types/property';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = ['Basic Info', 'Details', 'Images', 'Review'];

const AddProperty: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Property>({
    id: 0, images: [{ img: '' }], title: '', description: '',
    location: '', price: '', bedrooms: 1, bathrooms: 1, area: '', status: 'FOR_SALE', type: 'HOUSE',
    featured: false, viewCount: 0, listedById: 0, listedBy: undefined, createdAt: new Date(), updatedAt: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'bedrooms' || id === 'bathrooms' ? parseInt(value) || 1 : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((p) => ({
              ...p,
              images: [...p.images, { img: reader.result as string }]
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((p) => ({
              ...p,
              images: [...p.images, { img: reader.result as string }]
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fieldClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all ";
  const labelClass = "block text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary mb-1.5";

  return (
    <div className="max-w-5xl mx-auto space-y-5">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="block w-4 h-px bg-secondary" />
          <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">New Listing</span>
        </div>
        <h1 className="font-serif text-[24px] font-semibold text-gray-900 leading-tight">Add Property</h1>
        <p className="text-[12px] text-tertiary mt-0.5">Fill in the details to create a new property listing</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                i < step ? 'bg-primary text-white' :
                i === step ? 'bg-primary text-white shadow-[0_0_0_4px_#e8f5ee]' :
                'bg-gray-100 text-tertiary border border-gray-200'
              }`}>{i + 1}</div>
              <span className={`text-[11px] font-medium ${i === step ? 'text-primary' : 'text-tertiary'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        <form onSubmit={handleSubmit} className="space-y-4">

          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Basic Information</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label htmlFor="title" className={labelClass}>Property Title *</label>
                <input id="title" type="text" value={formData.title} onChange={handleChange} placeholder="e.g. Oakwood Luxury Villa" className={fieldClass} required />
              </div>
              <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the property — highlights, features, amenities..." rows={4} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>Location *</label>
                <input id="location" type="text" value={formData.location} onChange={handleChange} placeholder="e.g. East Legon, Accra" className={fieldClass} required />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Pricing & Specifications</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className={labelClass}>Price *</label>
                  <input id="price" type="text" value={formData.price} onChange={handleChange} placeholder="e.g. $480,000" className={fieldClass} required />
                </div>
                <div>
                  <label htmlFor="area" className={labelClass}>Area (sq ft) *</label>
                  <input id="area" type="text" value={formData.area} onChange={handleChange} placeholder="e.g. 2,400" className={fieldClass} required />
                </div>
                <div>
                  <label htmlFor="bedrooms" className={labelClass}>Bedrooms</label>
                  <input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} min="1" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="bathrooms" className={labelClass}>Bathrooms</label>
                  <input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} min="1" className={fieldClass} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Property Images</p>
            </CardHeader>
            <CardContent className="p-5">
              {/* Drag and Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mb-4"
              >
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">
                        Drag & drop images here, or click to select
                      </p>
                      <p className="text-[11px] text-tertiary mt-1">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        {img.img ? (
                          <img
                            src={img.img}
                            alt={`Property image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* URL Input Option */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-[11px] font-medium text-tertiary uppercase tracking-wider mb-3">
                  Or add image URLs manually
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste image URL here..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        setFormData((p) => ({
                          ...p,
                          images: [...p.images, { img: e.currentTarget.value }]
                        }));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                      if (input?.value) {
                        setFormData((p) => ({
                          ...p,
                          images: [...p.images, { img: input.value }]
                        }));
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-[13px] font-medium hover:bg-primary-dark transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Add More Button */}
              {formData.images.length > 0 && (
                <button
                  type="button"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="mt-4 flex items-center gap-1.5 text-[12px] text-primary font-medium hover:underline"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add more images
                </button>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" className="h-9 text-[13px] border-gray-200 gap-2">
              <Save className="w-3.5 h-3.5" /> Save Draft
            </Button>
            <Button type="submit" className="h-9 bg-primary hover:bg-primary-dark text-white text-[13px] gap-2">
              Publish Listing <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Listing Settings</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label htmlFor="status" className={labelClass}>Status *</label>
                <select id="status" value={formData.status} onChange={handleChange} className={fieldClass}>
                  <option>For Sale</option><option>For Rent</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className={labelClass}>Property Type *</label>
                <select id="type" value={formData.type} onChange={handleChange} className={fieldClass}>
                  <option>House</option><option>Condo</option><option>Apartment</option>
                  <option>Townhouse</option><option>Land</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-0 bg-primary shadow-none">
            <CardContent className="p-5">
              <p className="text-[12px] text-white/70 leading-relaxed mb-4">
                All fields marked * are required. Save as draft to continue later.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 h-9 text-[13px] gap-2 shadow-none">
                <ArrowRight className="w-3.5 h-3.5" /> Publish Listing
              </Button>
              <Button variant="ghost" className="w-full mt-2 text-white/70 hover:text-white hover:bg-white/10 h-9 text-[13px]">
                Save as Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;