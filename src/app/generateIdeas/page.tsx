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
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

export default function Page() {
    const [formValues, setFormValues] = useState({
        technologies: [],
        focus: [],
        extraDetails: "",
        giveImplementationSteps: false,
    });

    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const focusValues = [
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

    if (loading) return <>Loda...</>;

    if (response)
        return (
            <Stack gap={2} p={3}>
                <Typography variant="h5" align="center">
                    Here&apos;s your idea
                </Typography>

                <Divider />
                <MuiMarkdown>{response}</MuiMarkdown>
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
                name="focus"
                options={focusValues}
                required
                value={formValues.focus}
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
            <Stack direction="row" gap={1}>
                <Button type="submit" variant="contained" sx={{ flex: 1 }}>
                    Generate me an idea
                </Button>
            </Stack>
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
