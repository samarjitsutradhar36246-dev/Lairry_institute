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
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 680 },
  maxHeight: "85vh",
  overflowY: "auto",
  bgcolor: "rgba(15,21,32,0.92)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 4,
  boxShadow: 24,
  p: { xs: 3, md: 4 },
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
    if (JSON.stringify(form) !== JSON.stringify(newForm)) {
setTimeout(() => {
  setForm(newForm);
  setOriginalForm(newForm);
}, 0);
    }
    
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
      bgcolor: "rgba(255,255,255,0.06)",
      borderRadius: 2,
    },
    slotProps: {
      inputLabel: {
        sx: { color: "#94a3b8" },
      },
      htmlInput: {
        style: { color: "#e5e7eb" },
      },
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h6" color="white" fontWeight={700}>
            Edit Institute Profile
          </Typography>
          <Typography fontSize={12} color="#94a3b8">
            Changes will be saved to your profile.
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", mb: 3 }} />

        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar
            src={form.avatar_url}
            sx={{
              width: 72,
              height: 72,
              border: "2px solid rgba(255,255,255,0.18)",
            }}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.18)" }}
          >
            Upload Photo
            <input hidden type="file" onChange={handleImageChange} />
          </Button>
        </Stack>

        <Stack spacing={2}>
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

          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

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

          <Stack direction="row" spacing={2}>
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
              bgcolor: "rgba(255,255,255,0.04)",
              borderRadius: 2,
            }}
            slotProps={{
              inputLabel: { sx: { color: "#94a3b8" } },
              htmlInput: { style: { color: "#a1a1a1" } },
            }}
          />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

          <Stack direction="row" spacing={2}>
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

          <Stack direction="row" spacing={2}>
            <TextField
              label="Country"
              value={form.location_country}
              onChange={handleChange("location_country")}
              {...commonTextFieldProps}
            />
            <TextField
              label="Pin"
              value={form.location_pin}
              onChange={handleChange("location_pin")}
              {...commonTextFieldProps}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
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

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!hasChanges()}
              sx={{
                background: "linear-gradient(135deg, #137fec, #a855f7)",
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
