import { useNavigate } from "react-router-dom";

export default function Footer({ profileImage, instituteName }) {
  const navigate = useNavigate();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--surface-1)",
      }}>
      <div className="max-w-7xl mx-auto p-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
            className="w-9 h-9 rounded-lg flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full border border-primary/40 overflow-hidden bg-slate-800"
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <span
            style={{ color: "var(--text-primary)" }}
            className="font-bold tracking-wide">
            {instituteName}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-x-8 text-sm">
          {[
            { label: "Privacy Policy", path: "/privacy-policy" },
            { label: "Contact Us", path: "/contact-us" },
            { label: "Terms & Conditions", path: "/terms-and-conditions" },
            { label: "Disclaimer", path: "/disclaimer" },
          ].map(({ label, path }) => (
            <span
              key={label}
              onClick={() => navigate(path)}
              className="cursor-pointer transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }>
              {label}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-center md:text-right text-xs">
          © {new Date().getFullYear()} L.AI.RRY - online institute panel
        </p>
      </div>
    </footer>
  );
}
