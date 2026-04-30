'use client';

import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import React, { useState, useEffect } from 'react';
import { Save, Trash2, Plus, X, ArrowLeft, Loader2, Upload, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProperties } from '@/hooks/useProperty';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { fetchProperty, loading, updateProperty, deleteProperty } = useProperties();

  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Property | null>(null);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const loadProperty = async () => {
      if (params.id) {
        try {
          const data = await fetchProperty(params.id as string);
          setProperty(data);
          setFormData(data);
        } catch (err) {
          setError("Failed to load property");
          console.error("Error loading property:", err);
        }
      }
    };

    loadProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === 'bedrooms' || name === 'bathrooms' ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && formData) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => prev ? {
              ...prev,
              images: [...prev.images, { img: reader.result as string }]
            } : null);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && formData) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => prev ? {
              ...prev,
              images: [...prev.images, { img: reader.result as string }]
            } : null);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleUpdate = async () => {
    if (!formData) return;

    setSaving(true);
    setError(null);

    try {
      const updated = await updateProperty(params.id as string, formData);
      setProperty(updated);
      setFormData(updated);
      alert("Property updated successfully!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      toast.error(message);
      setError(err.message || "Failed to update property");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteProperty(params.id as string);
      router.push("/admin/properties");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      toast.error(message);
      setError(err.message || "Failed to delete property");
    }
  };

  const fieldClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-900  outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";
  const labelClass = "block text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary mb-1.5";

  // Loading state
  if (!mounted || loading || !formData) {
    return (
      <div className="max-w-5xl mx-auto space-y-5">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={() => router.push("/admin/properties")}
          className="text-primary hover:underline"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[12px] text-tertiary hover:text-gray-800 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties
          </button>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-4 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Edit Listing</span>
          </div>
          <h1 className="font-serif text-[24px] font-semibold text-gray-900 leading-tight">{formData.title}</h1>
          <p className="text-[12px] text-tertiary mt-0.5">ID: #{property?.id} · Last updated {new Date(property?.updatedAt || Date()).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            variant="outline"
            className="h-9 text-[13px] gap-2 text-red-500 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={saving}
            className="h-9 bg-primary hover:bg-primary-dark text-white text-[13px] gap-2"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* LEFT */}
        <div className="space-y-4">
          {/* Images */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 flex-row items-center justify-between space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Property Images</p>
            </CardHeader>
            <CardContent className="p-5">
              {/* Drag and Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer mb-4"
              >
                <input
                  type="file"
                  id="edit-image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="edit-image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-gray-900">
                        Drag & drop or click to add images
                      </p>
                      <p className="text-[11px] text-tertiary mt-1">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Image Preview Grid */}
              {formData?.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {formData.images.map((imgObj, idx) => (
                    <div key={idx} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        {imgObj.img ? (
                          <img
                            src={imgObj.img}
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
                        onClick={() => {
                          if (formData) {
                            setFormData({
                              ...formData,
                              images: formData.images.filter((_, i) => i !== idx)
                            });
                          }
                        }}
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
                      if (e.key === 'Enter' && e.currentTarget.value && formData) {
                        setFormData({
                          ...formData,
                          images: [...formData.images, { img: e.currentTarget.value }]
                        });
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('#edit-image-url') as HTMLInputElement;
                      if (input?.value && formData) {
                        setFormData({
                          ...formData,
                          images: [...formData.images, { img: input.value }]
                        });
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
              {formData?.images && formData.images.length > 0 && (
                <button
                  type="button"
                  onClick={() => document.getElementById('edit-image-upload')?.click()}
                  className="mt-4 flex items-center gap-1.5 text-[12px] text-primary font-medium hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add more images
                </button>
              )}
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Basic Information</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input name="title" type="text" value={formData.title} onChange={handleChange} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Location *</label>
                <input name="location" type="text" value={formData.location} onChange={handleChange} className={fieldClass} />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Pricing & Specifications</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Price *", name: "price", type: "text" },
                  { label: "Area (sq ft) *", name: "area", type: "text" },
                  { label: "Bedrooms", name: "bedrooms", type: "number" },
                  { label: "Bathrooms", name: "bathrooms", type: "number" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className={labelClass}>{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={(formData as Record<string, unknown>)[f.name] as string}
                      onChange={handleChange}
                      min={f.type === "number" ? 1 : undefined}
                      className={fieldClass}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Listing Settings</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="FOR_SALE">For Sale</option>
                  <option value="FOR_RENT">For Rent</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Property Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="HOUSE">House</option>
                  <option value="CONDO">Condo</option>
                  <option value="APARTMENT">Apartment</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Featured Property</label>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-gray-100 space-y-0">
              <p className="text-[13px] font-medium text-gray-900">Listing Stats</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Views", value: property?.viewCount?.toString() || "0" },
                  { label: "ID", value: `#${property?.id}` }
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.07em] text-tertiary mb-1">{s.label}</p>
                    <p className="font-serif text-[22px] font-semibold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-red-200 shadow-none">
            <CardHeader className="px-5 py-3.5 border-b border-red-100 bg-red-50 space-y-0 rounded-t-xl">
              <p className="text-[13px] font-medium text-red-600">Danger Zone</p>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-[12px] text-tertiary mb-3 leading-relaxed">
                This action is permanent. The listing and all associated data will be removed.
              </p>
              <Button
                onClick={handleDelete}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-none h-9 text-[13px] gap-2"
                variant="outline"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete this property
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}