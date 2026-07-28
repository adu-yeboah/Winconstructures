import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaShare, FaRegHeart } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";

interface PropertyHeroProps {
  title: string;
  location: string;
  status: string;
  type: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: { img: string }[];
  selectedIndex: number;
  saved: boolean;
  onToggleSave: () => void;
}

export const PropertyHero: React.FC<PropertyHeroProps> = ({
  title,
  location,
  status,
  type,
  price,
  bedrooms,
  bathrooms,
  area,
  images,
  selectedIndex,
  saved,
  onToggleSave,
}) => {
  const router = useRouter();

  return (
    <section className="relative h-[46vh] sm:h-[56vh] md:h-[64vh] min-h-[380px] md:min-h-[520px] overflow-hidden">
      <Image
        src={images[selectedIndex]?.img || images[0]?.img || "/placeholder.jpg"}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-black/20 to-transparent" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28">
        <button
          onClick={() => router.push("/search")}
          className="flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm tracking-wide transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to results
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSave}
            aria-label="Save property"
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-none border transition-colors ${
              saved
                ? "bg-secondary border-secondary text-primary-dark"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <FaRegHeart className="text-sm" />
          </button>
          <button
            aria-label="Share property"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-none border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <FaShare className="text-sm" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 lg:pb-16 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
              <span className="block w-6 h-px bg-secondary" />
              <span className="text-secondary text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase">
                {status === "FOR_SALE" ? "For Sale" : "For Rent"} • {type}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4 sm:mb-5">
              {title}
            </h1>

            <p className="flex items-center gap-2 text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              <FaMapMarkerAlt className="text-secondary text-xs sm:text-sm" />
              <span className="line-clamp-1">{location}</span>
            </p>

            <div className="flex flex-wrap gap-5 sm:gap-8 text-white/90">
              {[
                { label: "Price", value: price },
                { label: "Bedrooms", value: String(bedrooms) },
                { label: "Bathrooms", value: String(bathrooms) },
                { label: "Area", value: area },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};