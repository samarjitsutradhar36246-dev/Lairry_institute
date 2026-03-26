import { Box } from "@mui/material";
import HeroBanners from "../../components/Dashboard Component/HeroBanners";
import ManagementCards from "../../components/Dashboard Component/ManagementCards";
import StatsCards from "../../components/Dashboard Component/StatsCards";
import StudentManagement from "../../components/StudentManagement/StudentManagement";
import LoadingDialog from "../../components/Loading Screen/LoadingDialog";
import { useState } from "react";
export default function DashboardFinal() {
    const [loading, setLoading] = useState(false);
  return (
    <>
    <LoadingDialog open={loading} /> 
<Box
  sx={{
    bgcolor: "background.default",
    minHeight: "100vh",
    color: "text.primary",
  }}
>

      <div className="ml-0 lg:ml-[1px]">
        <HeroBanners />
      </div>

      <main className="px-6 md:px-10 py-12 ">
        <ManagementCards />
        <StatsCards setLoading={setLoading}/>
        <div className="pt-10 ">
          <StudentManagement setLoading={setLoading} />
        </div>
      </main>
      
    </Box>
    </>
  );
}
