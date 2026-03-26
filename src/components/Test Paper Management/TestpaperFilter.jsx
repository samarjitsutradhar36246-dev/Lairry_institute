import {
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const TestpaperFilter = ({
  search,
  setSearch,
  instituteSubjectsData,
  setSelectedSubjectId,
  selectedSubjectId,
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {/* 🔍 Search Field */}
      <TextField
        label="Search Test Paper"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{
          minWidth: 260,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "background.paper",
          },
        }}
      />

      {/* 📚 Subject Select */}
      <FormControl
        size="medium"
        sx={{
          minWidth: 260,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "background.paper",
          },
        }}
      >
        <InputLabel id="subject-select-label">
          Select Subject
        </InputLabel>

       <Select
  labelId="subject-select-label"
  value={selectedSubjectId}
  label="Select Subject"
  onChange={(e) => {
    // 🔥 CRITICAL FIX
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement?.blur();
    }

    setSelectedSubjectId(e.target.value);
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        borderRadius: "12px",
        mt: 1,
      },
    },
  }}
>
  {instituteSubjectsData?.map((subject) => (
    <MenuItem key={subject.id} value={subject.id}>
      {subject.subject_name}
    </MenuItem>
  ))}
</Select>
      </FormControl>
    </Stack>
  );
};

export default TestpaperFilter;