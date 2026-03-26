import {
  Stack,
  TextField,
  MenuItem,
  Paper,
  InputAdornment,
  FormControl,
  Select
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ExamFilter = ({
  search,
  setSearch,
  setStatusFilter,
  statusFilter,
  
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-color)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <TextField
          fullWidth
          placeholder="Search exam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ opacity: 0.6 }} />
              </InputAdornment>
            )
          }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {["All", "Active", "Deactive"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default ExamFilter;