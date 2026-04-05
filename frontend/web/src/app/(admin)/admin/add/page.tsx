'use client';
import React, { useState } from 'react';
import { PlusCircle, Trash2, ArrowRight, Save } from 'lucide-react';
import { Property } from '@/types/property';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = ['Basic Info', 'Details', 'Images', 'Review'];

const AddProperty: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Property>({
    id: 0, images: [{ img: '' }], title: '', description: '',
    location: '', price: '', bedrooms: 1, bathrooms: 1, area: '', status: 'For Sale', type: 'House',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'bedrooms' || id === 'bathrooms' ? parseInt(value) || 1 : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const imgs = [...formData.images];
    imgs[index] = { img: value };
    setFormData((prev) => ({ ...prev, images: imgs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const fieldClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-[DM_Sans]";
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
              <div className="space-y-2.5 mb-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="url"
                      value={img.img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      placeholder="Paste image URL here..."
                      className={fieldClass}
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                        className="w-8 h-9 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, images: [...p.images, { img: '' }] }))}
                className="flex items-center gap-1.5 text-[12px] text-primary font-medium hover:underline"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add another image
              </button>
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