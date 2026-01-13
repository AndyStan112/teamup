"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Chip,
    Avatar,
    TextField,
    CircularProgress,
    Alert,
    Divider,
    Stack,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

interface User {
    id: string;
    name: string;
    profileImage: string | null;
}

interface Report {
    id: string;
    reporterId: string;
    reportedUserId: string;
    reason: string;
    comments: string;
    status: "PENDING" | "UNDER_REVIEW" | "RESOLVED" | "DISMISSED";
    createdAt: string;
    reviewedAt: string | null;
    reviewNotes: string | null;
    reporter: User;
    reportedUser: User;
}

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [reviewNotes, setReviewNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/admin/reports");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch reports");
            }

            setReports(data.reports);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch reports");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status: "RESOLVED" | "DISMISSED") => {
        if (!selectedReport) return;

        setUpdating(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`/api/admin/reports/${selectedReport.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status,
                    reviewNotes: reviewNotes.trim() || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update report");
            }

            setSuccess(`Report ${status.toLowerCase()} successfully`);
            setReports((prev) => prev.map((r) => (r.id === selectedReport.id ? data.report : r)));
            setSelectedReport(data.report);
            setReviewNotes("");

            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update report");
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status: Report["status"]) => {
        switch (status) {
            case "PENDING":
                return "warning";
            case "UNDER_REVIEW":
                return "info";
            case "RESOLVED":
                return "success";
            case "DISMISSED":
                return "error";
            default:
                return "default";
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "100vh", p: 3, gap: 2 }}>
            {/* Left Column - Reports List */}
            <Paper sx={{ width: "400px", overflow: "auto" }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                    <Typography variant="h5" fontWeight="bold">
                        User Reports
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {reports.length} total reports
                    </Typography>
                </Box>
                <List>
                    {reports.map((report) => (
                        <ListItem key={report.id} disablePadding>
                            <ListItemButton
                                selected={selectedReport?.id === report.id}
                                onClick={() => {
                                    setSelectedReport(report);
                                    setReviewNotes(report.reviewNotes || "");
                                    setError("");
                                    setSuccess("");
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1" noWrap>
                                                {report.reportedUser.name}
                                            </Typography>
                                            <Chip
                                                label={report.status}
                                                size="small"
                                                color={getStatusColor(report.status)}
                                            />
                                        </Box>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="text.secondary">
                                                {report.reason}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Right Column - Report Details */}
            <Paper sx={{ flex: 1, overflow: "auto", p: 3 }}>
                {selectedReport ? (
                    <Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Report Details
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            {/* Status */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Status
                                </Typography>
                                <Chip
                                    label={selectedReport.status}
                                    color={getStatusColor(selectedReport.status)}
                                    sx={{ mt: 1 }}
                                />
                            </Box>

                            <Divider />

                            {/* Reported User */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Reported User
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                                    <Avatar
                                        src={selectedReport.reportedUser.profileImage || ""}
                                        alt={selectedReport.reportedUser.name}
                                    />
                                    <Typography variant="body1">
                                        {selectedReport.reportedUser.name}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Reporter */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Reported By
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                                    <Avatar
                                        src={selectedReport.reporter.profileImage || ""}
                                        alt={selectedReport.reporter.name}
                                    />
                                    <Typography variant="body1">
                                        {selectedReport.reporter.name}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider />

                            {/* Reason */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Reason
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {selectedReport.reason}
                                </Typography>
                            </Box>

                            {/* Comments */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Additional Comments
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
                                    {selectedReport.comments}
                                </Typography>
                            </Box>

                            <Divider />

                            {/* Timestamps */}
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Created At
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {new Date(selectedReport.createdAt).toLocaleString()}
                                </Typography>
                            </Box>

                            {selectedReport.reviewedAt && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Reviewed At
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {new Date(selectedReport.reviewedAt).toLocaleString()}
                                    </Typography>
                                </Box>
                            )}

                            {/* Review Notes Input */}
                            <Box>
                                <TextField
                                    label="Review Notes"
                                    multiline
                                    rows={4}
                                    value={reviewNotes}
                                    onChange={(e) => setReviewNotes(e.target.value)}
                                    placeholder="Add notes about your decision..."
                                    fullWidth
                                    disabled={
                                        updating ||
                                        selectedReport.status === "RESOLVED" ||
                                        selectedReport.status === "DISMISSED"
                                    }
                                />
                            </Box>

                            {/* Action Buttons */}
                            {selectedReport.status !== "RESOLVED" &&
                                selectedReport.status !== "DISMISSED" && (
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            startIcon={<CheckCircle />}
                                            onClick={() => handleStatusUpdate("RESOLVED")}
                                            disabled={updating}
                                            fullWidth
                                        >
                                            {updating ? "Updating..." : "Approve (Resolve)"}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Cancel />}
                                            onClick={() => handleStatusUpdate("DISMISSED")}
                                            disabled={updating}
                                            fullWidth
                                        >
                                            {updating ? "Updating..." : "Reject (Dismiss)"}
                                        </Button>
                                    </Box>
                                )}

                            {/* Review Notes Display (if already reviewed) */}
                            {selectedReport.reviewNotes &&
                                (selectedReport.status === "RESOLVED" ||
                                    selectedReport.status === "DISMISSED") && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Review Notes
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ mt: 1, whiteSpace: "pre-wrap" }}
                                        >
                                            {selectedReport.reviewNotes}
                                        </Typography>
                                    </Box>
                                )}
                        </Stack>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Select a report to view details
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
