import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const PropertyLoadingSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="bg-primary-dark pt-24 pb-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-4 w-40 mb-4 bg-white/10" />
        <Skeleton className="h-12 w-full max-w-xl mb-4 bg-white/10" />
        <Skeleton className="h-4 w-56 bg-white/10" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <Skeleton className="h-72 sm:h-96 w-full mb-8 rounded-none" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <Skeleton className="h-48 w-full rounded-none" />
          <Skeleton className="h-64 w-full rounded-none" />
        </div>
        <Skeleton className="h-[450px] w-full rounded-none" />
      </div>
    </div>
  </div>
);

interface PropertyErrorStateProps {
  error?: string | null;
}

export const PropertyErrorState: React.FC<PropertyErrorStateProps> = ({ error }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-gray-900 text-lg sm:text-xl font-serif font-light mb-4">
          {error || "Property Not Found"}
        </p>
        <button
          onClick={() => router.push("/search")}
          className="text-primary hover:underline text-sm sm:text-base"
        >
          Back to Properties
        </button>
      </div>
    </div>
  );
};