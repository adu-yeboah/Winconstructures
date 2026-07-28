import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

/* tiny local helpers  */

const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

const SectionLabel: React.FC<{ children: React.ReactNode; line?: boolean }> = ({
  children,
  line = true,
}) => (
  <div className="flex items-center gap-3 mb-5 sm:mb-6">
    {line && <span className="block w-8 h-px bg-secondary" />}
    <span className="text-secondary text-xs tracking-[0.18em] uppercase">{children}</span>
  </div>
);

/* props */

interface PropertyContentProps {
  title: string;
  description?: string;
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: { img: string }[];
  amenities?: string[];
  onSlideChange?: (index: number) => void;
}

/* component */

export const PropertyContent: React.FC<PropertyContentProps> = ({
  title,
  description,
  type,
  location,
  bedrooms,
  bathrooms,
  area,
  images,
  amenities,
  onSlideChange,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      onSlideChange?.(idx);
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSlideChange]);

  return (
    <div className="w-full lg:w-2/3 space-y-0">
      {/* GALLERY */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-none p-4 sm:p-5 shadow-sm mb-6 sm:mb-8"
        >
          <CornerMarks className="border-secondary" />
          <div className="relative overflow-hidden rounded-none">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Image
                      src={image.img}
                      alt={`${title} image ${index + 1}`}
                      width={800}
                      height={500}
                      className="rounded-none w-full h-[230px] sm:h-[300px] md:h-[380px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-gray-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 right-3 bg-primary-dark/80 text-white text-xs px-2.5 py-1 rounded-none tracking-wide">
                  {selectedIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3 sm:mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === selectedIndex
                      ? "w-6 bg-secondary"
                      : "w-1.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* HIGHLIGHTS  */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-none p-5 sm:p-6 lg:p-8 shadow-sm mb-6 sm:mb-8"
      >
        <CornerMarks className="border-secondary/50" />
        <SectionLabel>At a glance</SectionLabel>
        <h2 className="sr-only">Property Highlights</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: <FaBed className="text-lg sm:text-xl" />, label: "Bedrooms", value: String(bedrooms) },
            { icon: <FaBath className="text-lg sm:text-xl" />, label: "Bathrooms", value: String(bathrooms) },
            { icon: <MdSquareFoot className="text-lg sm:text-xl" />, label: "Area", value: area },
            { icon: <FaMapMarkerAlt className="text-lg sm:text-xl" />, label: "Type", value: type },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-primary mb-2 sm:mb-3">{item.icon}</div>
              <p className="text-gray-500 text-xs sm:text-sm">{item.label}</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-none p-5 sm:p-6 lg:p-8 shadow-sm mb-6 sm:mb-8"
      >
        <SectionLabel>Description</SectionLabel>

        <p className="text-gray-500 text-sm sm:text-base leading-6 sm:leading-8 font-light">
          {description ||
            `An exceptional ${type.toLowerCase()} designed with refined finishes, spacious interiors, and premium architecture.`}
        </p>

        {Array.isArray(amenities) && amenities.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <FaCheckCircle className="text-secondary text-[10px]" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* LOCATION  */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-none p-5 sm:p-6 lg:p-8 shadow-sm mb-12 sm:mb-16"
      >
        <SectionLabel>Location</SectionLabel>

        <div className="h-[230px] sm:h-[300px] md:h-[350px] rounded-none overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};