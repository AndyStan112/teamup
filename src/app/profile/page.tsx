"use client";
import {
    Button,
    Card,
    Divider,
    Stack,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Skeleton,
    InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { addOrUpdateUser, getCurrentUser } from "./actions";
import MultiChipSelect from "@/components/inputs/MultiChipSelect";
import { languages, technologies } from "@/constants/interests";
import GitHubIcon from "@mui/icons-material/GitHub";

interface ProfileFormValues {
    name: string;
    profileImage?: File;
    age: number;
    gender: "" | "MALE" | "FEMALE" | "OTHER" | "DONOTWANTTOSAY";
    githubLink: string;
    country: string;
    city: string;
    languages: string[];
    technologies: string[];
    description: string;
    codingTimePreference: string[];
}

// Default empty state
const defaultState: ProfileFormValues = {
    name: "",
    age: 0,
    gender: "",
    githubLink: "",
    country: "",
    city: "",
    languages: [],
    technologies: [],
    description: "",
    codingTimePreference: [],
};

export default function ProfilePage(): React.ReactElement {
    const [edit, setEdit] = useState(false);
    const [formValues, setFormValues] = useState<ProfileFormValues>(defaultState);
    const [formKey, setFormKey] = useState(0); // Key to force re-render
    const [loading, setLoading] = useState(true);

    // Fetch user data from the server on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setFormValues({
                        name: userData.name || "",
                        profileImage: userData.profileImage
                            ? new File([], userData.profileImage)
                            : undefined,
                        age: userData.age || 0,
                        gender: userData.gender || "",
                        githubLink: userData.githubLink || "",
                        country: userData.country || "",
                        city: userData.city || "",
                        languages: userData.languages || [],
                        technologies: userData.technologies || [],
                        description: userData.description || "",
                        codingTimePreference: userData.codingTimePreference || [],
                    });
                } else {
                    setFormValues(defaultState);
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!edit) return;

        const formDataObject = new FormData(event.target as HTMLFormElement);
        await addOrUpdateUser(formDataObject);
        const updatedValues: ProfileFormValues = {
            name: formDataObject.get("name") as string,
            profileImage: formDataObject.get("profileImage") as File,
            age: Number(formDataObject.get("age")),
            gender: formDataObject.get("gender") as
                | ""
                | "MALE"
                | "FEMALE"
                | "OTHER"
                | "DONOTWANTTOSAY",
            githubLink: formDataObject.get("githubLink") as string,
            country: formDataObject.get("country") as string,
            city: formDataObject.get("city") as string,
            languages: formDataObject.getAll("languages") as string[],
            technologies: formDataObject.getAll("technologies") as string[],
            description: formDataObject.get("description") as string,
            codingTimePreference: formDataObject.getAll("codingTimePreference") as string[],
        };
        setFormValues(updatedValues);
        setEdit(false);
    };

    const handleReset = () => {
        // setFormValues(defaultState); // Reset values
        setFormKey((prev) => prev + 1); // Change key to force re-render
        setEdit(false);
    };

    if (loading) {
        return (
            <Stack alignItems="center" justifyContent="center">
                <Stack component={Card} width={{ xs: "100%", sm: 550 }} p={3} gap={2}>
                    <Typography variant="h5" align="center">
                        My Profile
                    </Typography>
                    <Divider />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={40} />
                    <Divider />
                    <Stack direction="row" gap={1}>
                        <Skeleton variant="rectangular" height={40} width="100%" />
                        <Skeleton variant="rectangular" height={40} width="100%" />
                    </Stack>
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack
            component="form"
            onSubmit={handleSubmit}
            key={formKey} // Force re-render on reset
            alignItems="center"
            justifyContent="center"
        >
            <Stack component={Card} width={{ xs: "100%", sm: 550 }} p={3} gap={2}>
                <Typography variant="h5" align="center">
                    My Profile
                </Typography>
                <Divider />

                <TextField
                    label="Name"
                    name="name"
                    required
                    defaultValue={formValues.name}
                    slotProps={{ input: { readOnly: !edit } }}
                />
                <input type="file" name="profileImage" disabled={!edit} />
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    fullWidth
                    required
                    defaultValue={formValues.age}
                    slotProps={{ input: { readOnly: !edit } }}
                />

                <FormControl fullWidth required>
                    <InputLabel id="profile-gender-label">Gender</InputLabel>
                    <Select
                        name="gender"
                        labelId="profile-gender-label"
                        label="Gender"
                        required
                        defaultValue={formValues.gender}
                        slotProps={{ input: { readOnly: !edit } }}
                    >
                        <MenuItem disabled value="">
                            Select a value
                        </MenuItem>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                        <MenuItem value="DONOTWANTTOSAY">Prefer not to say</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="GitHub Link"
                    type="url"
                    name="githubLink"
                    fullWidth
                    required
                    defaultValue={formValues.githubLink}
                    slotProps={{
                        input: {
                            readOnly: !edit,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GitHubIcon />
                                </InputAdornment>
                            ),
                            endAdornment: !edit && (
                                <InputAdornment position="end">
                                    <Button
                                        variant="text"
                                        onClick={() => window.open(formValues.githubLink, "_blank")}
                                        disabled={!formValues.githubLink}
                                    >
                                        Open
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    label="Country"
                    name="country"
                    fullWidth
                    required
                    defaultValue={formValues.country}
                    slotProps={{ input: { readOnly: !edit } }}
                />
                <TextField
                    label="City"
                    name="city"
                    fullWidth
                    required
                    defaultValue={formValues.city}
                    slotProps={{ input: { readOnly: !edit } }}
                />

                <MultiChipSelect
                    label="Spoken Languages"
                    name="languages"
                    options={languages}
                    disabled={!edit}
                    required
                    defaultValue={formValues.languages}
                />
                <MultiChipSelect
                    label="Technologies"
                    name="technologies"
                    options={technologies}
                    disabled={!edit}
                    required
                    defaultValue={formValues.technologies}
                />
                <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    fullWidth
                    required
                    defaultValue={formValues.description}
                    slotProps={{ input: { readOnly: !edit } }}
                />
                <MultiChipSelect
                    label="Coding Time Preference"
                    name="codingTimePreference"
                    options={["MORNING", "AFTERNOON", "EVENING", "NIGHT", "ANYTIME"]}
                    disabled={!edit}
                    required
                    defaultValue={formValues.codingTimePreference}
                />

                <Divider />
                <Stack direction="row" gap={1}>
                    {edit ? (
                        <>
                            <Button variant="contained" type="submit" sx={{ flex: 1 }}>
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                type="button"
                                sx={{ flex: 1 }}
                                onClick={handleReset}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            type="button"
                            sx={{ flex: 1 }}
                            onClick={(event) => {
                                event.preventDefault();
                                setEdit(true);
                            }}
                        >
                            Edit
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
}
