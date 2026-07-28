import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Loader2 } from "lucide-react";

/* tiny local helpers  */

const CornerMarks: React.FC<{ className?: string }> = ({ className = "" }) => (
  <>
    <span className={`pointer-events-none absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${className}`} />
    <span className={`pointer-events-none absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${className}`} />
  </>
);

/* props */

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface PropertySidebarProps {
  formData: FormData;
  formError: string;
  messageLoading: boolean;
  agentName?: string;
  onUpdateField: (field: keyof FormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

/* component */

export const PropertySidebar: React.FC<PropertySidebarProps> = ({
  formData,
  formError,
  messageLoading,
  agentName,
  onUpdateField,
  onSubmit,
}) => (
  <div className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit space-y-5 sm:space-y-6">
    {/* CONTACT FORM */}
    <div className="relative bg-white rounded-none p-5 sm:p-6 lg:p-8 shadow-sm">
      <CornerMarks className="border-secondary" />

      <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
        <span className="block w-6 h-px bg-secondary" />
        <span className="text-secondary text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase">
          Schedule a viewing
        </span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">
        Request more details
      </h3>

      {formError && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-none text-red-700 text-xs sm:text-sm">
          {formError}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        {(
          [
            { key: "name" as const, type: "text", placeholder: "Your name *", required: true },
            { key: "email" as const, type: "email", placeholder: "Your email *", required: true },
            { key: "phone" as const, type: "tel", placeholder: "Phone number", required: false },
          ] as const
        ).map((field) => (
          <input
            key={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.key]}
            onChange={(e) => onUpdateField(field.key, e.target.value)}
            className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary transition-colors bg-transparent placeholder:text-gray-300 text-sm"
            required={field.required}
          />
        ))}

        <textarea
          rows={4}
          placeholder="I'd like to schedule a private tour... *"
          value={formData.message}
          onChange={(e) => onUpdateField("message", e.target.value)}
          className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-primary resize-none transition-colors bg-transparent placeholder:text-gray-300 text-sm"
          required
        />

        <button
          type="submit"
          disabled={messageLoading}
          className="w-full bg-primary-dark hover:bg-primary text-white py-3.5 sm:py-4 rounded-none font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {messageLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {messageLoading ? "Sending…" : "Send inquiry"}
        </button>
      </form>

      <div className="border-t border-gray-100 pt-4 sm:pt-5 mt-4 sm:mt-5 grid grid-cols-2 gap-3">
        <button className="w-full border border-primary text-primary py-2.5 sm:py-3 rounded-none font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors text-xs sm:text-sm">
          <FaPhoneAlt className="text-xs sm:text-sm" />
          Call
        </button>
        <a
          href="https://wa.me/233240000000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-secondary/90 hover:bg-secondary text-primary-dark py-2.5 sm:py-3 rounded-none font-medium flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
        >
          <FaWhatsapp className="text-sm" />
          WhatsApp
        </a>
      </div>
    </div>

    {/* AGENT CARD */}
    <div className="relative bg-primary-dark rounded-none p-5 sm:p-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative flex items-center gap-4">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center text-white/60 text-lg font-serif">
          {agentName ? agentName.charAt(0) : "A"}
        </div>
        <div>
          <p className="text-white text-sm sm:text-base font-medium">
            {agentName || "Listing Agent"}
          </p>
          <p className="text-white/50 text-xs sm:text-sm">Responds within 24 hours</p>
        </div>
      </div>
    </div>
  </div>
);