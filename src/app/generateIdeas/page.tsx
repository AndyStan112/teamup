"use client";
import { talk } from "./action";
import MultiChipSelect from "@/components/inputs/MultiChipSelect";
import { technologies } from "@/constants/interests";
import { useState } from "react";
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

    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (name: string, values: string[]) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: values,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const result = await talk(formValues);
        setLoading(false);
        setResponse(result);
    };

    if (loading)
        return (
            <Stack gap={2} p={3}>
                <Typography variant="h5" align="center">
                    Hang on, we&apos;re finding an idea
                </Typography>

                <Divider />
                <Stack gap={2}>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="40%" />
                </Stack>
            </Stack>
        );

    if (response)
        return (
            <Stack gap={2} p={3}>
                <Typography variant="h5" align="center">
                    Here&apos;s your idea
                </Typography>

                <Divider />
                <MuiMarkdown>{response}</MuiMarkdown>

                <Divider />
                <Button
                    type="button"
                    variant="outlined"
                    sx={{ flex: 1 }}
                    onClick={() => {
                        setResponse(null);
                    }}
                >
                    Make another idea
                </Button>
            </Stack>
        );

    return (
        <Stack component="form" onSubmit={handleSubmit} gap={2} p={3}>
            <Typography variant="h5" align="center">
                Generate Ideas
            </Typography>

            <Divider />
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
                    setFormValues((prev) => ({ ...prev, extraDetails: e.target.value }))
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                sx={{ flex: 1 }}
            />

            <Divider />
            <Button type="submit" variant="contained" sx={{ flex: 1 }}>
                Generate me an idea
            </Button>
        </Stack>
    );

    // return (
    //     <div>
    //         <h1 className="mb-4">Generate project idea</h1>
    // <form onSubmit={handleSubmit}>
    //     <MultiChipSelect
    //         label="Technologies"
    //         name="technologies"
    //         options={technologies}
    //         required
    //         value={formValues.technologies}
    //         onSelect={handleSelectChange}
    //     />
    //     <MultiChipSelect
    //         label="Focus"
    //         name="focus"
    //         options={focusValues}
    //         required
    //         value={formValues.focus}
    //         onSelect={handleSelectChange}
    //     />
    //             <label htmlFor="giveImplementationSteps">Give implementation steps </label>
    //             <input
    //                 type="checkbox"
    //                 checked={formValues.giveImplementationSteps}
    //                 onChange={(e) =>
    //                     setFormValues((prev) => ({
    //                         ...prev,
    //                         giveImplementationSteps: e.target.checked,
    //                     }))
    //                 }
    //             />
    //             <br />
    //             <button className="bg-blue-500 p-2 rounded-2xl" type="submit">
    //                 Generate project idea
    //             </button>
    //         </form>

    //         <MuiMarkdown>{response}</MuiMarkdown>
    //     </div>
    // );
}
