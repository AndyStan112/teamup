"use client";
import { getCredits, talk } from "./action";
import MultiChipSelect from "@/components/inputs/MultiChipSelect";
import { technologies } from "@/constants/interests";
import { useEffect, useState } from "react";
import MuiMarkdown from "mui-markdown";
import {
    Button,
    Divider,
    FormControlLabel,
    Skeleton,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

const scopeValues = [
    "Frontend",
    "Backend",
    "Fullstack",
    "Mobile development",
    "Embedded development",
    "Web development",
    "Data Science",
    "Machine Learning",
    "AI",
    "Game development",
];

export default function Page() {
    const [formValues, setFormValues] = useState({
        technologies: [],
        scope: [],
        extraDetails: "",
        giveImplementationSteps: false,
    });

    const [credits, setCredits] = useState<number | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCredits().then(setCredits);
    }, []);

    const handleSelectChange = (name: string, values: string[]) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: values,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const result = await talk(formValues);
            setResponse(result);
            setCredits((c) => (c !== null ? c - 1 : c));
        } catch (e: any) {
            if (e.message === "NO_CREDITS") {
                alert("You have no credits left.");
            } else {
                alert("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack gap={2} p={3}>
            <Typography variant="h5" align="center">
                Generate Ideas
            </Typography>

            {credits !== null && (
                <Typography
                    variant="body2"
                    align="center"
                    color={credits > 0 ? "text.secondary" : "error"}
                >
                    Remaining credits: <b>{credits}</b>
                </Typography>
            )}

            <Divider />

            {loading && (
                <Stack gap={2}>
                    <Typography variant="h6" align="center">
                        Hang on, we&apos;re finding an idea
                    </Typography>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="40%" />
                </Stack>
            )}

            {!loading && response && (
                <>
                    <MuiMarkdown>{response}</MuiMarkdown>
                    <Divider />
                    <Button
                        variant="outlined"
                        onClick={() => setResponse(null)}
                    >
                        Make another idea
                    </Button>
                </>
            )}

            {!loading && !response && (
                <Stack component="form" onSubmit={handleSubmit} gap={2}>
                    <MultiChipSelect
                        label="Technologies"
                        name="technologies"
                        options={technologies}
                        required
                        value={formValues.technologies}
                        onSelect={handleSelectChange}
                    />

                    <MultiChipSelect
                        label="Focus"
                        name="scope"
                        options={scopeValues}
                        required
                        value={formValues.scope}
                        onSelect={handleSelectChange}
                    />

                    <Divider />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={formValues.giveImplementationSteps}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        giveImplementationSteps: e.target.checked,
                                    }))
                                }
                            />
                        }
                        label="Give implementation steps"
                    />

                    <Divider />

                    <TextField
                        value={formValues.extraDetails}
                        label="Any extra details?"
                        onChange={(e) =>
                            setFormValues((prev) => ({
                                ...prev,
                                extraDetails: e.target.value,
                            }))
                        }
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                    />

                    <Divider />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={credits !== null && credits <= 0}
                    >
                        Generate me an idea
                    </Button>
                </Stack>
            )}
        </Stack>
    );
}
