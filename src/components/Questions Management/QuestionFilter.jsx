
import {
  
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

//,setStatusFilter,statusFilter
const QuestionFilter = ({ search, setSearch, instituteTestPapersData, setSelectedTestPaperId, selectedTestPaperId }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      {/* 🔍 Search Field */}
                  <TextField
                    label="Search Questions"
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
       {/* 📚 TestPaper Select */}
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
                Select Test Paper
              </InputLabel>
      
             <Select
        labelId="test-paper-select-label"
        value={selectedTestPaperId}
        label="Select Test Paper"
        onChange={(e) => {
          // 🔥 CRITICAL FIX
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement?.blur();
          }
      
          setSelectedTestPaperId(e.target.value);
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
        {instituteTestPapersData?.map((testpaper) => (
          <MenuItem key={testpaper.id} value={testpaper.id}>
            {testpaper.test_paper_name}
          </MenuItem>
        ))}
      </Select>
            </FormControl>



    </Stack>
  )
}

export default QuestionFilter