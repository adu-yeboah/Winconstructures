"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProperties } from "@/hooks/useProperty";
import { useMessages } from "@/hooks/useMessage";

import { PropertySidebar } from "../../components/property/PropertySidebar";
import { PropertyErrorState, PropertyLoadingSkeleton } from "../../components/property/PropertyStates";
import { PropertyHero } from "../../components/property/PropertyHero";
import { PropertyContent } from "../../components/property/PropertyContent";
import { SimilarProperties } from "../../components/similarProperties";

/*  types  */

interface Property {
  id: string;
  title: string;
  location: string;
  status: string;
  type: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description?: string;
  amenities?: string[];
  images: { img: string }[];
  agentName?: string;
}

/*  main page  */

export default function PropertyDetail() {
  const params = useParams();
  const { fetchProperty, loading: propertyLoading } = useProperties();
  const { createMessage, loading: messageLoading } = useMessages();

  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /*  fetch ─ */
  useEffect(() => {
    setMounted(true);
    const load = async () => {
      if (!params.id) return;
      try {
        const data = await fetchProperty(params.id as string);
        setProperty(data);
      } catch (err) {
        setError("Failed to load property");
        console.error(err);
      }
    };
    load();
  }, [params.id]);

  /*  form helpers  */
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      await createMessage({
        title: formData.name,
        email: formData.email,
        subject: `Property Inquiry: ${property?.title}`,
        message: `${formData.message}\n\nPhone: ${formData.phone}\n\nProperty: ${property?.title} (ID: ${property?.id})`,
        relatedPropertyId: property?.id,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to send inquiry");
    }
  };

  /*  states  */
  if (!mounted || propertyLoading) return <PropertyLoadingSkeleton />;
  if (error || !property) return <PropertyErrorState error={error} />;

  /*  render  */
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <PropertyHero
        title={property.title}
        location={property.location}
        status={property.status}
        type={property.type}
        price={property.price}
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        area={property.area}
        images={property.images}
        selectedIndex={heroSlideIndex}
        saved={saved}
        onToggleSave={() => setSaved((s) => !s)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-14 flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-10">
        <PropertyContent
          title={property.title}
          description={property.description}
          type={property.type}
          location={property.location}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
          images={property.images}
          amenities={property.amenities}
          onSlideChange={setHeroSlideIndex}
        />

        <PropertySidebar
          formData={formData}
          formError={formError}
          messageLoading={messageLoading}
          agentName={property.agentName}
          onUpdateField={updateField}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Similar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
            <span className="block w-6 h-px bg-secondary" />
            <span className="text-secondary text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase">
              You might also like
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-gray-900">
            Similar properties
          </h2>
        </div>
        <SimilarProperties currentProperty={property} limit={3} />
      </div>
    </div>
  );
}