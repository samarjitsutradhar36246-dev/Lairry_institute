import { useState, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { MenuItem } from "@mui/material";
import {
    Button,
    Stack,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    TextField,
    Paper,
    IconButton
} from "@mui/material";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import LoadingDialog from "../Loading Screen/LoadingDialog";

export default function QuestionCSVActions({
    selectedTestPaperId,
    createQuestionForTestpaper,
    setLoading,loading
}) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const [previewRows, setPreviewRows] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [progress, setProgress] = useState(0);

    const [editingCell, setEditingCell] = useState({
        rowIndex: null,
        field: null,
    });

    const [dragActive, setDragActive] = useState(false);

    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const [allRows, setAllRows] = useState([]);

    const fileInputRef = useRef(null);
    const [downloadFormat, setDownloadFormat] = useState("");
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [filterType, setFilterType] = useState("all");
    // ------------------------------------------
    // CSV DOWNLOAD
    // ------------------------------------------
    
    const downloadCSVFormat = () => {
        const data = [
            {
                question_text: "Sample Question?",
                options: '["Option A","Option B","Option C","Option D"]',
                question_instruction: "MCQ",
                correct_option_s: '["Option A"]',
                positive_mark: 4,
                negative_mark: 0,
                expected_time_for_each_question: 60,
                chapter_name: "Sample Chapter",
                topic_name: "Sample Topic",
            },
        ];

        const csv = Papa.unparse(data);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "subject_test_paper_questions_format.csv";
        a.click();

        window.URL.revokeObjectURL(url);
    };
    // ------------------------------------------
    // Excel DOWNLOAD (MATCH CSV FORMAT)
    // ------------------------------------------
    const downloadExcelTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            {
                question_text: "Sample Question?",
                options: '["Option A","Option B","Option C","Option D"]',
                question_instruction: "MCQ",
                correct_option_s: '["Option A"]',
                positive_mark: 4,
                negative_mark: 0,
                expected_time_for_each_question: 60,
                chapter_name: "Sample Chapter",
                topic_name: "Sample Topic",
            },
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Questions");
        XLSX.writeFile(wb, "Question_Template.xlsx");
    };

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------
    const validateCSVStructure = (rows) => {
        if (!rows || rows.length === 0) {
            return "File is empty";
        }

        if (!rows[0].question_text) {
            return "Missing required column: question_text";
        }

        return null;
    };

    const processRows = (rows) => {
        const basicError = validateCSVStructure(rows);

        if (basicError) {
            setSnackbar({
                open: true,
                message: basicError,
                severity: "error",
            });
            return;
        }

        const processedRows = rows.map((row, index) =>
            normalizeRow(row, index)
        );
        setAllRows(processedRows)
        setPreviewRows(processedRows);
        setOpenPreview(true);
        setHistory([processedRows]);
        setHistoryIndex(0);
    };
    // ------------------------------------------
    // FILE PARSE
    // ------------------------------------------
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        processUploadedFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        const file = event.dataTransfer.files[0];
        if (!file) return;

        processUploadedFile(file);
    };

    const processUploadedFile = (file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (fileExtension === "csv") {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    processRows(results.data);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                },
            });
        } else if (fileExtension === "xlsx" || fileExtension === "xls") {
            const reader = new FileReader();

            reader.onload = (e) => {
                const workbook = XLSX.read(e.target.result, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);

                processRows(data);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            };

            reader.readAsBinaryString(file);
        } else {
            setSnackbar({
                open: true,
                message: "Only CSV or Excel files are allowed",
                severity: "error",
            });
        }
    };

    // ------------------------------------------
    // Normalize Row before preview
    // ------------------------------------------

    const normalizeRow = (row) => {
        let errors = {};

        if (!row.question_text) {
            errors.question_text = "Question is required";
        }

        // Smart option parser
        let optionsArray = [];

        try {
            if (row.options) {
                // If already JSON
                if (row.options.trim().startsWith("[")) {
                    optionsArray = JSON.parse(row.options);
                } else {
                    // Convert comma separated → JSON
                    optionsArray = row.options.split(",").map(o => o.trim());
                }
            } else {
                optionsArray = [
                    row.option1,
                    row.option2,
                    row.option3,
                    row.option4,
                ].filter(Boolean);
            }

            if (optionsArray.length < 2) {
                errors.options = "Minimum 2 options required";
            }
        } catch {
            errors.options = "Invalid options format";
        }

        let correctOptionsArray = [];

        try {
            if (row.correct_option_s) {
                if (row.correct_option_s.trim().startsWith("[")) {
                    correctOptionsArray = JSON.parse(row.correct_option_s);
                } else {
                    correctOptionsArray = [row.correct_option_s.trim()];
                }
            } else if (row.correct_option) {
                correctOptionsArray = [row.correct_option];
            } else {
                errors.correct_option_s = "Correct answer required";
            }
        } catch {
            errors.correct_option_s = "Invalid correct answer format";
        }
        const positiveMark = Number(row.positive_mark || 1);
        const negativeMark = Number(row.negative_mark || 0);
        const expectedTime = Number(row.expected_time_for_each_question || 60);

        if (isNaN(positiveMark)) errors.positive_mark = "Invalid number";
        if (isNaN(negativeMark)) errors.negative_mark = "Invalid number";
        if (isNaN(expectedTime)) errors.expected_time_for_each_question = "Invalid number";

        return {
            ...row,
            positive_mark: positiveMark,
            negative_mark: negativeMark,
            expected_time_for_each_question: expectedTime,
            optionsArray,
            correctOptionsArray,
            errors,
        };
    };

    // ------------------------------------------
    // FINAL UPLOAD
    // ------------------------------------------
    const confirmUpload = async () => {
        const validRows = previewRows.filter(
            (row) => Object.keys(row.errors).length === 0
        );

        if (validRows.length === 0) {
            setSnackbar({
                open: true,
                message: "No valid rows to upload",
                severity: "error",
            });
            return;
        }

        setLoading(true);
        let successCount = 0;

        for (let i = 0; i < validRows.length; i++) {
            const row = validRows[i];

            try {
                await createQuestionForTestpaper({
                    question_text: row.question_text,
                    options: row.optionsArray,
                    question_instruction: row.question_instruction || "MCQ",
                    correct_option_s: row.correctOptionsArray,
                    positive_mark: row.positive_mark || 1,
                    negative_mark: row.negative_mark || 0,
                    expected_time_for_each_question:
                        row.expected_time_for_each_question || 60,
                    chapter_name: row.chapter_name,
                    topic_name: row.topic_name,
                    test_paper_id: selectedTestPaperId,
                });

                successCount++;
                setProgress(
                    Math.round(((i + 1) / validRows.length) * 100)
                );
            } catch (err) {
                setSnackbar({
                open: true,
                message: err.message || "Upload failed",
                severity: "error",
            });
                
            }
        }

        setLoading(false);
        setOpenPreview(false);
        setProgress(0);

        setSnackbar({
            open: true,
            message: `${successCount}/${validRows.length} uploaded successfully`,
            severity: "success",
        });
    };
    

    const handleCellChange = (rowIndex, field, value) => {
        const updatedRows = [...previewRows];

        updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [field]: value,
        };

        const revalidated = normalizeRow(updatedRows[rowIndex]);
        updatedRows[rowIndex] = revalidated;

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(updatedRows)));

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setPreviewRows(updatedRows);
    };

    const exportErrorsCSV = () => {
        const failed = previewRows.filter(
            (r) => Object.keys(r.errors).length > 0
        );

        const csv = Papa.unparse(failed);
        const blob = new Blob([csv], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Failed_Rows.csv";
        a.click();
    };

    const handleFilterChange = (value) => {
        setFilterType(value);

        if (value === "errors") {
            setPreviewRows(
                allRows.filter((row) => Object.keys(row.errors).length > 0)
            );
        }

        if (value === "valid") {
            setPreviewRows(
                allRows.filter((row) => Object.keys(row.errors).length === 0)
            );
        }

        if (value === "all") {
            setPreviewRows(allRows);
        }
    };
    return (
        <>
        <LoadingDialog open={loading}/>
            {!selectedTestPaperId ? (
    <Box
        sx={{
            p: 2,
            borderRadius: 2,
            //backgroundColor: (theme) => theme.palette.warning.light,
            color: (theme) => theme.palette.warning.main,
            fontWeight: 600,
        }}
    >
        please select a test paper to create or upload the question
    </Box>
) : (
    <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
    >
        {/* Download Format Select */}
        <TextField
            select
            label="Download Template"
            value={downloadFormat}
            onChange={(e) => {
                const value = e.target.value;
                setDownloadFormat(value);

                if (value === "csv") downloadCSVFormat();
                if (value === "excel") downloadExcelTemplate();

                setDownloadFormat("");
            }}
            sx={(theme) => ({
                minWidth: 220,
                "& .MuiFilledInput-root": {
                    backgroundColor: theme.palette.background.paper,
                },
            })}
        >
            <MenuItem value="csv">Download CSV Format</MenuItem>
            <MenuItem value="excel">Download Excel Format</MenuItem>
        </TextField>

        {/* Upload Button */}
        <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={() => setOpenUploadDialog(true)}
            sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
            }}
        >
            Upload Questions
        </Button>
    </Stack>
)}

            {/* Preview Dialog */}
            <Dialog
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                maxWidth="lg"
                fullWidth
                disableRestoreFocus
            >

                <DialogTitle>CSV Preview ({previewRows.length} rows)</DialogTitle>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    mb={2}
                    ml={{ xs: 3, sm: 3 }}
                    mr={{ xs: 3, sm: 3 }}
                    alignItems={{ xs: "stretch", sm: "center" }}
                >
                    <TextField
                        select
                        label="Filter Rows"
                        value={filterType}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        sx={{ minWidth: { xs: "100%", sm: 200 } }}
                        fullWidth
                    >
                        <MenuItem value="all">Show All</MenuItem>
                        <MenuItem value="errors">Show Errors Only</MenuItem>
                        <MenuItem value="valid">Show Valid Only</MenuItem>
                    </TextField>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            const updated = previewRows.map((row) => ({
                                ...row,
                                question_instruction: "MCQ",
                            }));
                            setPreviewRows(updated);
                        }}
                    >
                        Auto Set Instruction = MCQ
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={exportErrorsCSV}
                    >
                        Export Failed Rows
                    </Button>
                </Stack>

                <DialogContent dividers>
                    <Box sx={{ maxHeight: 500, overflow: "auto" }}>

                        <Box mb={2}>
                            <Alert
                                severity={
                                    previewRows.some((r) => Object.keys(r.errors).length > 0)
                                        ? "error"
                                        : "success"
                                }
                            >
                                {previewRows.filter(
                                    (r) => Object.keys(r.errors).length > 0
                                ).length} rows contain errors.
                            </Alert>
                        </Box>

                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Question <Typography variant="caption" color="error">*</Typography>
                                    </TableCell>
                                    <TableCell>Option</TableCell>
                                    <TableCell>Question Instruction</TableCell>
                                    <TableCell>Correct Answer</TableCell>
                                    <TableCell>Positive Mark</TableCell>
                                    <TableCell>Negative Mark</TableCell>
                                    <TableCell>Expected Time</TableCell>
                                    <TableCell>Chapter</TableCell>
                                    <TableCell>Topic</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {previewRows.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={(theme) => ({
                                            backgroundColor:
                                                Object.keys(row.errors).length > 0
                                                    ? theme.palette.mode === "dark"
                                                        ? theme.palette.error.dark
                                                        : theme.palette.error.light
                                                    : "inherit",

                                            color:
                                                Object.keys(row.errors).length > 0
                                                    ? theme.palette.mode === "dark"
                                                        ? theme.palette.common.black
                                                        : theme.palette.common.black
                                                    : "inherit",

                                            "& .MuiTableCell-root": {
                                                color:
                                                    Object.keys(row.errors).length > 0
                                                        ? theme.palette.common.black
                                                        : "inherit",
                                            },
                                        })}
                                    >
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "question_text" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "question_text" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.question_text}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "question_text", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.question_text
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "options" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "options" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.options}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "options", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.options
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "question_instruction" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "question_instruction" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.question_instruction}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "question_instruction", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.question_instruction
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "correct_option_s" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "correct_option_s" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.correct_option_s}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "correct_option_s", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.correct_option_s
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "positive_mark" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "positive_mark" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.positive_mark}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "positive_mark", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.positive_mark
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "negative_mark" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "negative_mark" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.negative_mark}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "negative_mark", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.negative_mark
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "expected_time_for_each_question" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "expected_time_for_each_question" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.expected_time_for_each_question}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "expected_time_for_each_question", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.expected_time_for_each_question
                                            )}
                                        </TableCell>

                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "chapter_name" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "chapter_name" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.chapter_name}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "chapter_name", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.chapter_name
                                            )}
                                        </TableCell>
                                        <TableCell
                                            onDoubleClick={() =>
                                                setEditingCell({ rowIndex: i, field: "topic_name" })
                                            }
                                        >
                                            {editingCell.rowIndex === i &&
                                                editingCell.field === "topic_name" ? (
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    value={row.topic_name}
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleCellChange(i, "topic_name", e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setEditingCell({ rowIndex: null, field: null });
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        setEditingCell({ rowIndex: null, field: null })
                                                    }
                                                />
                                            ) : (
                                                row.topic_name
                                            )}
                                        </TableCell>


                                        <TableCell>
                                            {Object.keys(row.errors).length > 0
                                                ? Object.values(row.errors).join(", ")
                                                : "Valid"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </Box>


                    {progress > 0 && (
                        <>
                            <Typography mt={2}>Uploading... {progress}%</Typography>
                            <LinearProgress value={progress} variant="determinate" />
                        </>
                    )}
                </DialogContent>

                <DialogActions>

                    <Paper
                        elevation={1}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1,
                            py: 0.5,
                            borderRadius: 2,
                        }}
                    >
                        <IconButton
                            disabled={historyIndex <= 0}
                            onClick={() => {
                                setHistoryIndex(historyIndex - 1);
                                setPreviewRows(history[historyIndex - 1]);
                            }}
                        >
                            <UndoIcon />
                        </IconButton>

                        <IconButton
                            disabled={historyIndex >= history.length - 1}
                            onClick={() => {
                                setHistoryIndex(historyIndex + 1);
                                setPreviewRows(history[historyIndex + 1]);
                            }}
                        >
                            <RedoIcon />
                        </IconButton>
                    </Paper>

                    <Button
                        onClick={() => {
                            setOpenPreview(false);
                            setPreviewRows([]);
                            setAllRows([]);
                            setHistory([]);
                            setHistoryIndex(-1);

                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={confirmUpload}>
                        Confirm Upload
                    </Button>





                    {/* </Stack> */}
                </DialogActions>
            </Dialog>

            <Dialog
                open={openUploadDialog}
                onClose={() => setOpenUploadDialog(false)}
                maxWidth="sm"
                fullWidth
                disableRestoreFocus
                PaperProps={{
                    sx: (theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                    }),
                }}
            >
                <DialogTitle>Upload CSV / Excel File</DialogTitle>

                <DialogContent>
                    <Box
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                        }}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        sx={(theme) => ({
                            border: "2px dashed",
                            borderColor: dragActive
                                ? theme.palette.primary.main
                                : theme.palette.divider,
                            borderRadius: 3,
                            p: 4,
                            textAlign: "center",
                            backgroundColor: dragActive
                                ? theme.palette.action.hover
                                : theme.palette.background.paper,
                            transition: "all 0.3s ease",
                            cursor: "pointer",

                        })}
                    >
                        <UploadFileIcon
                            sx={(theme) => ({
                                fontSize: 42,
                                mb: 1,
                                color: theme.palette.text.secondary,
                            })}
                        />

                        <Typography fontWeight={600}>
                            Drag & Drop CSV / Excel file here
                        </Typography>

                        <Typography variant="body2" color="text.secondary" mb={2}>
                            or
                        </Typography>

                        <Button
                            component="label"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Browse File
                            <input
                                ref={fileInputRef}
                                hidden
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                onChange={(e) => {
                                    handleFileUpload(e);
                                    setOpenUploadDialog(false);

                                    setTimeout(() => {
                                        // let dialog fully close before opening preview
                                        setOpenPreview(true);
                                    }, 0);
                                }}
                            />
                        </Button>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenUploadDialog(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}