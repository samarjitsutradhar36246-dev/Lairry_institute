import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Footer({ sidebarOpen }) {
  const { user, fetchInstituteData } = useSupabase()
  const [instData, setInstData] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInstituteData(user.auth_user_id);
      setInstData(data);
    }
    if (user.auth_user_id) loadData();
  }, [user.auth_user_id]);
  return (
    <footer
      className="border-t"
style={{
  borderColor: "var(--border-color)",
  backgroundColor: "var(--surface-1)",
}}

    >
      <div className="max-w-7xl mx-auto p-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">

        {/* Brand */}
        {instData.map((data, index) => (
          <div key={index} className="flex items-center justify-center md:justify-start gap-3">
            <div 
            style={{
  background: "var(--card-bg)",
  border: "1px solid var(--border-color)",
}}
            className="w-9 h-9 rounded-lg flex items-center justify-center">

              <div
                className="w-10 h-10 rounded-full border border-primary/40 overflow-hidden bg-slate-800"
                style={{
                  backgroundImage: `url(${data.profile_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />



            </div>
            <span 
            style={{ color: "var(--text-primary)" }}
            className=" font-bold tracking-wide">
              {data.institute_name}
            </span>
          </div>
        ))}


        {/* Links */}
        

        <div 
        className=" text-sm transition-colors flex gap-x-8"
        style={{
  color: "var(--text-secondary)",
}}
onMouseEnter={(e) => e.target.style.color = "var(--primary)"}
onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
        >
  {[ "Privacy Policy", "Contact Us", "Terms & Conditions","Disclaimer"].map((item) => (
    <span
      key={item}
      onClick={() => {
        if (item === "Privacy Policy") navigate("/privacy-policy");
        if (item === "Contact Us") navigate("/contact-us");
        if (item === "Terms & Conditions") navigate("/terms-and-conditions");
        if (item === "Disclaimer") navigate("/disclaimer");
      }}
      className="cursor-pointer  "
    >
      {item}
    </span>
  ))}
</div>




        {/* Copyright */}
        <p 
        style={{ color: "var(--text-secondary)" }}

        className="text-center md:text-right  text-xs">
          © {new Date().getFullYear()} L.AI.RRY - online institute panel
        </p>
      </div>
    </footer>
  );
}



