import { useRef, useState,useEffect } from "react";
import { useSupabase } from "../../contextProvider/SupabaseProvider";
import { Box, Typography, Button, Avatar, TextField, useTheme, Snackbar,Alert } from "@mui/material";

import LoadingDialog from "../Loading Screen/LoadingDialog";

const ProfileInformation = ({profileData,setProfileImage}) => {
   const theme = useTheme();

  const fileRef = useRef(null);
  const { uploadProfileImage,updateUserProfile } = useSupabase();
  const [preview, setPreview] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // ✅ NEW
    const [loading,setLoading]=useState(false)
const [formData, setFormData] = useState({
    institute_name: "",
    phone_number: "",
    institute_description:"",
  });
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // "success" | "error"
});
   // Load data once profileData arrives
  useEffect(() => {
    if (!profileData) return;

    setPreview(profileData.profile_image || "");
    setFormData({
      institute_name: profileData.institute_name || "",
      phone_number: profileData.phone_number || "",
      institute_description:profileData.institute_description || "",
    });
  }, [profileData]);
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange =  (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // instant preview
    setSelectedFile(file); // ✅ store real file
    setPreview(URL.createObjectURL(file)); // ✅ UI preview
     
  };
const handleSaveChanges = async()=>{
  
try {
  setLoading(true)
   // 1️⃣ Update text fields
      await updateUserProfile(profileData?.institute_id, formData);
// 2️⃣ Upload image if selected
      if (selectedFile) {
        const newUrl = await uploadProfileImage(
          selectedFile,
          profileData?.institute_id
        );
        setPreview(newUrl);
       
        setSelectedFile(null);
         // ✅ update lifted state in AppLayout
        if (setProfileImage) setProfileImage(newUrl);
      }
      setSnackbar({
    open: true,
    message: "Profile updated successfully ✅",
    severity: "success",
  });           
      
    } catch (err) {
      setSnackbar({
    open: true,
    message: err.message || "Failed to update profile ❌",
    severity: "error",
  });
      
    }finally{
      setLoading(false)
    }
}
   return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <LoadingDialog open={loading}/>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    onClose={() => setSnackbar({ ...snackbar, open: false })}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          pb: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        Profile Information
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={preview}
            sx={{
              width: 130,
              height: 130,
              border: `3px solid ${theme.palette.primary.main}`,
              cursor: "pointer",
            }}
            onClick={() => fileRef.current.click()}
          />

          <Button
            onClick={() => fileRef.current.click()}
            variant="contained"
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              minWidth: 0,
              borderRadius: "50%",
              width: 40,
              height: 40,
              p: 0,
            }}
          >
            ✎
          </Button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Box>

        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Typography fontWeight={600}>
            Institute Avatar
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Upload a high-resolution photo for your profile.
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => fileRef.current.click()}
          >
            Change Photo
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <TextField
          label="Institute Name"
          name="institute_name"
          value={formData.institute_name}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Email"
          value={profileData.email}
          disabled
          fullWidth
        />

        <TextField
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Describe your institute"
          name="institute_description"
          value={formData.institute_description}
          onChange={handleInputChange}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          pt: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSaveChanges}
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
