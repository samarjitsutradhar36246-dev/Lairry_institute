import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 600 },
  bgcolor: "rgba(15,21,32,0.85)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function EditInstituteProfileModal({
  open,
  onClose,
  user,
  onSave,
}) {
  const [form, setForm] = useState({
    institute_name: "",
    institute_display_name: "",
    institute_type: "",
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
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, avatar_url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} color="white">
          Edit Institute Profile
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar src={form.avatar_url} sx={{ width: 70, height: 70 }} />
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            sx={{ textTransform: "none" }}
          >
            Upload Photo
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Institute Name"
            value={form.institute_name || ""}
            onChange={handleChange("institute_name")}
            fullWidth
          />
          <TextField
            label="Display Name"
            value={form.institute_display_name || ""}
            onChange={handleChange("institute_display_name")}
            fullWidth
          />
          <TextField
            label="Institute Type"
            value={form.institute_type || ""}
            onChange={handleChange("institute_type")}
            fullWidth
          />
          <TextField
            label="Admin Name"
            value={form.contact_person_name || ""}
            onChange={handleChange("contact_person_name")}
            fullWidth
          />
          <TextField
            label="Designation"
            value={form.contact_person_designation || ""}
            onChange={handleChange("contact_person_designation")}
            fullWidth
          />
          <TextField
            label="Contact Phone"
            value={form.contact_phone || ""}
            onChange={handleChange("contact_phone")}
            fullWidth
          />
          <TextField
            label="Alternate Phone"
            value={form.contact_phone_alt || ""}
            onChange={handleChange("contact_phone_alt")}
            fullWidth
          />
          <TextField
            label="Support Email"
            value={form.support_email || ""}
            onChange={handleChange("support_email")}
            fullWidth
          />

          {/* NON-EDITABLE EMAIL */}
          <TextField
            label="Institute Email (Non editable)"
            value={user?.institute_email || ""}
            disabled
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="City"
              value={form.location_city || ""}
              onChange={handleChange("location_city")}
              fullWidth
            />
            <TextField
              label="State"
              value={form.location_state || ""}
              onChange={handleChange("location_state")}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Country"
              value={form.location_country || ""}
              onChange={handleChange("location_country")}
              fullWidth
            />
            <TextField
              label="Pin"
              value={form.location_pin || ""}
              onChange={handleChange("location_pin")}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Latitude"
              value={form.latitude || ""}
              onChange={handleChange("latitude")}
              fullWidth
            />
            <TextField
              label="Longitude"
              value={form.longitude || ""}
              onChange={handleChange("longitude")}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
