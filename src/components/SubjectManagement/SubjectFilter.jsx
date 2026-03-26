import {
  
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SubjectFilter = ({
  search,
  setSearch,
  // statusFilter,
  // setStatusFilter,
  instituteExamsData,
  setSelectedExamId,
  selectedExamId
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
              <InputLabel id="exam-select-label">
                Select Exam
              </InputLabel>
      
             <Select
        labelId="exam-select-label"
        value={selectedExamId}
        label="Select Exam"
        onChange={(e) => {
          // 🔥 CRITICAL FIX
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement?.blur();
          }
      
          setSelectedExamId(e.target.value);
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
        {instituteExamsData?.map((exam) => (
          <MenuItem key={exam.id} value={exam.id}>
            {exam.exam_title}
          </MenuItem>
        ))}
      </Select>
            </FormControl>
    </Stack>
  );
};

export default SubjectFilter;