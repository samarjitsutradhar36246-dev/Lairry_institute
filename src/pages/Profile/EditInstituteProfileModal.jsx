import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import { CloudUpload, Close, Business, Person, Phone, Email, LocationOn } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 720 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#0f1520",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 3,
  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
  p: 0,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255,255,255,0.02)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "4px",
    "&:hover": {
      background: "rgba(255,255,255,0.15)",
    },
  },
};

const emptyForm = {
  institute_name: "",
  institute_display_name: "",
  institute_type: "",
  institute_description: "",
  contact_person_name: "",
  contact_person_designation: "",
  contact_phone: "",
  contact_phone_alt: "",
  support_email: "",
  location_city: "",
  location_state: "",
  location_country: "",
  location_pin: "",
  latitude: "",
  longitude: "",
  avatar_url: "",
};

export default function EditInstituteProfileModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [originalForm, setOriginalForm] = useState(emptyForm);

useEffect(() => {
  if (!open || !user) return;

  const newForm = { ...emptyForm, ...user };
  setForm(newForm);
  setOriginalForm(newForm);
}, [open, user]);


  // Detect if form has changes
  const hasChanges = () => {
    return JSON.stringify(form) !== JSON.stringify(originalForm);
  };

  // Handle text input changes
  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Handle avatar upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Save form data
  const handleSave = () => {
    onSave(form); // Send full updated form
    onClose();
  };

  // Common props for all TextFields
  const commonTextFieldProps = {
    fullWidth: true,
    variant: "filled",
    sx: {
      bgcolor: "rgba(255,255,255,0.04)",
      borderRadius: 2,
      transition: "all 0.2s ease",
      "& .MuiFilledInput-root": {
        bgcolor: "rgba(255,255,255,0.04)",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        "&.Mui-focused": {
          bgcolor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(147,197,253,0.5)",
          boxShadow: "0 0 0 3px rgba(147,197,253,0.1)",
        },
        "&:before, &:after": {
          display: "none",
        },
      },
    },
    slotProps: {
      inputLabel: {
        sx: { 
          color: "#94a3b8",
          fontSize: "0.9rem",
          fontWeight: 500,
        },
      },
      htmlInput: {
        style: { 
          color: "#e5e7eb",
          fontSize: "0.95rem",
        },
      },
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            pb: 3,
            background: "linear-gradient(135deg, rgba(19,127,236,0.08), rgba(168,85,247,0.08))",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography 
                variant="h5" 
                color="white" 
                fontWeight={700}
                sx={{ 
                  mb: 0.5,
                  background: "linear-gradient(135deg, #fff, #93c5fd)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Edit Institute Profile
              </Typography>
              <Typography fontSize={13} color="#94a3b8" fontWeight={500}>
                Update your institution's information
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: "#94a3b8",
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "white",
                },
              }}
            >
              <Close />
            </IconButton>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          {/* Avatar Section */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 3,
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={form.avatar_url}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "3px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                />
                {hasChanges() && form.avatar_url !== originalForm.avatar_url && (
                  <Chip
                    label="New"
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      right: -8,
                      bgcolor: "#10b981",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      height: 20,
                    }}
                  />
                )}
              </Box>
              <Stack spacing={1} flex={1}>
                <Typography variant="subtitle2" color="white" fontWeight={600}>
                  Institute Logo
                </Typography>
                <Typography fontSize={12} color="#94a3b8" sx={{ mb: 1 }}>
                  Upload a professional logo (JPG, PNG - Max 2MB)
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.15)",
                    bgcolor: "rgba(255,255,255,0.03)",
                    maxWidth: 180,
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.3)",
                      bgcolor: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  Upload Photo
                  <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={4}>
            {/* Institute Information */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
                <Business sx={{ color: "#60a5fa", fontSize: 20 }} />
                <Typography variant="subtitle1" color="white" fontWeight={600}>
                  Institute Information
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                <TextField
                  label="Institute Name"
                  value={form.institute_name}
                  onChange={handleChange("institute_name")}
                  {...commonTextFieldProps}
                />
                <TextField
                  label="Display Name"
                  value={form.institute_display_name}
                  onChange={handleChange("institute_display_name")}
                  {...commonTextFieldProps}
                />
                <TextField
                  label="Institute Type"
                  value={form.institute_type}
                  onChange={handleChange("institute_type")}
                  {...commonTextFieldProps}
                />
                <TextField
                  label="Institute Description"
                  value={form.institute_description}
                  onChange={handleChange("institute_description")}
                  multiline
                  rows={4}
                  placeholder="Write a short description about your institute..."
                  {...commonTextFieldProps}
                />
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Contact Person */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
                <Person sx={{ color: "#a78bfa", fontSize: 20 }} />
                <Typography variant="subtitle1" color="white" fontWeight={600}>
                  Administrative Contact
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                <TextField
                  label="Admin Name"
                  value={form.contact_person_name}
                  onChange={handleChange("contact_person_name")}
                  {...commonTextFieldProps}
                />
                <TextField
                  label="Designation"
                  value={form.contact_person_designation}
                  onChange={handleChange("contact_person_designation")}
                  {...commonTextFieldProps}
                />
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Contact Details */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
                <Phone sx={{ color: "#34d399", fontSize: 20 }} />
                <Typography variant="subtitle1" color="white" fontWeight={600}>
                  Contact Details
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Contact Phone"
                    value={form.contact_phone}
                    onChange={handleChange("contact_phone")}
                    {...commonTextFieldProps}
                  />
                  <TextField
                    label="Alternate Phone"
                    value={form.contact_phone_alt}
                    onChange={handleChange("contact_phone_alt")}
                    {...commonTextFieldProps}
                  />
                </Stack>

                <TextField
                  label="Support Email"
                  value={form.support_email}
                  onChange={handleChange("support_email")}
                  {...commonTextFieldProps}
                />
<TextField
  label="Institute Email (Non editable)"
  value={user?.institute_email || ""}
  disabled
  fullWidth
  variant="filled"
  sx={{
    bgcolor: "rgba(255,255,255,0.02)",
    borderRadius: 2,
    "& .MuiFilledInput-root": {
      bgcolor: "rgba(255,255,255,0.02)",
      borderRadius: 2,
      border: "1px solid rgba(255,255,255,0.04)",
      "&:before, &:after": { display: "none" },
    },
    "& .MuiFilledInput-input.Mui-disabled": {
      color: "#94a3b8",          // value text color
      WebkitTextFillColor: "#94a3b8", // ensures Chrome/Safari works
    },
    "& .MuiInputLabel-root": {
      color: "#94a3b8", // label color
      fontSize: "0.9rem",
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "#94a3b8", // label color when disabled
    },
  }}
/>



              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Location */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2.5}>
                <LocationOn sx={{ color: "#f472b6", fontSize: 20 }} />
                <Typography variant="subtitle1" color="white" fontWeight={600}>
                  Location Details
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="City"
                    value={form.location_city}
                    onChange={handleChange("location_city")}
                    {...commonTextFieldProps}
                  />
                  <TextField
                    label="State"
                    value={form.location_state}
                    onChange={handleChange("location_state")}
                    {...commonTextFieldProps}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Country"
                    value={form.location_country}
                    onChange={handleChange("location_country")}
                    {...commonTextFieldProps}
                  />
                  <TextField
                    label="Pin Code"
                    value={form.location_pin}
                    onChange={handleChange("location_pin")}
                    {...commonTextFieldProps}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Latitude"
                    value={form.latitude}
                    onChange={handleChange("latitude")}
                    {...commonTextFieldProps}
                  />
                  <TextField
                    label="Longitude"
                    value={form.longitude}
                    onChange={handleChange("longitude")}
                    {...commonTextFieldProps}
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Footer Actions */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "rgba(255,255,255,0.02)",
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontSize={12} color="#94a3b8">
              {hasChanges() ? (
                <span style={{ color: "#fbbf24" }}>● Unsaved changes</span>
              ) : (
                "No changes made"
              )}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={onClose}
                sx={{
                  color: "#94a3b8",
                  borderColor: "rgba(255,255,255,0.12)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.2)",
                    bgcolor: "rgba(255,255,255,0.04)",
                  },
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!hasChanges()}
                sx={{
                  background: hasChanges()
                    ? "linear-gradient(135deg, #137fec, #a855f7)"
                    : "rgba(255,255,255,0.1)",
                  color: hasChanges() ? "white" : "#64748b",
                  fontWeight: 600,
                  px: 4,
                  boxShadow: hasChanges()
                    ? "0 4px 14px rgba(19,127,236,0.4)"
                    : "none",
                  "&:hover": {
                    background: hasChanges()
                      ? "linear-gradient(135deg, #0e6fd9, #9333ea)"
                      : "rgba(255,255,255,0.1)",
                    boxShadow: hasChanges()
                      ? "0 6px 20px rgba(19,127,236,0.5)"
                      : "none",
                  },
                  "&.Mui-disabled": {
                    background: "rgba(255,255,255,0.05)",
                    color: "#4b5563",
                  },
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}