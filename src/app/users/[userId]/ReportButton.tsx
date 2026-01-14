"use client";

import { useState } from "react";
import { Flag } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Alert,
} from "@mui/material";

const REPORT_REASONS = [
    "Inappropriate behavior",
    "Spam or scam",
    "Harassment",
    "Fake profile",
    "Offensive content",
    "Other",
];

interface ReportButtonProps {
    userId: string;
}

export default function ReportButton({ userId }: ReportButtonProps) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [comments, setComments] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setError("");
        setSuccess(false);
    };

    const handleClose = () => {
        setOpen(false);
        setReason("");
        setComments("");
        setError("");
        setSuccess(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reportedUserId: userId,
                    reason,
                    comments,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit report");
            }

            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="outlined" color="error" startIcon={<Flag />} onClick={handleOpen}>
                Report User
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Report User</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">Report submitted successfully!</Alert>}
                        
                        <FormControl fullWidth>
                            <InputLabel id="report-reason-label">Reason</InputLabel>
                            <Select
                                labelId="report-reason-label"
                                value={reason}
                                label="Reason"
                                onChange={(e) => setReason(e.target.value)}
                                disabled={loading || success}
                            >
                                {REPORT_REASONS.map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Additional Comments"
                            multiline
                            rows={4}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Please provide more details about your report..."
                            fullWidth
                            disabled={loading || success}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="error"
                        disabled={!reason || !comments.trim() || loading || success}
                    >
                        {loading ? "Submitting..." : "Submit Report"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
