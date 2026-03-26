import { Box, Typography, useTheme } from "@mui/material";
import ProfileInformation from '../../components/Settings/ProfileInformation'
import LoadingDialog from '../../components/Loading Screen/LoadingDialog'
 import { useSupabase } from "../../contextProvider/SupabaseProvider";
 import {useState,useEffect} from 'react'
 import { Outlet, useOutletContext } from "react-router-dom";
const SettingsPage = () => {
  const theme = useTheme();
  const { setProfileImage } = useOutletContext();
  const { user, fetchUserProfile } = useSupabase();
const [loading,setLoading]=useState(false)
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    const data = async () => {
      try{
        setLoading(true)
const profile_data = await fetchUserProfile(user.auth_user_id);
      setProfileData(profile_data);
    }
      catch(error){
        console.error("Exams Data Fetching Error!", error);

      }finally{
setLoading(false)
      }
    }
    data();
  }, [user?.auth_user_id]);

  return (
    <>
    <LoadingDialog open={loading}/>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          px: 4,
          py: 8,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Heading */}
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ mb: 1 }}
          >
            Settings
          </Typography>

          <Typography color="text.secondary">
            Manage your account, exam preferences, and AI test experience.
          </Typography>
        </Box>

        {profileData && (<ProfileInformation profileData={profileData} 
        // ✅ get setter from Outlet context
    setProfileImage={setProfileImage}
        />)}
{/* <ExamPreferences />
//         <Notifications />
//         <AIExperience />
//         <AccountControls /> */}
        {/* Footer */}
        <Box sx={{ textAlign: "center", pt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} L.ai.rry AI Mock Test Platform.
            All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
    </>
  );
};
export default SettingsPage;