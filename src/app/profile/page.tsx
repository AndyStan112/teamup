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
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { addOrUpdateUser } from "./actions";

export default function ProfilePage(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    profileImage: null,
    age: "",
    gender: "MALE",
    githubLink: "",
    country: "",
    city: "",
    languages: "",
    technologies: "",
    description: "",
    codingTimePreference: [],
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const updatedPreferences = prev.codingTimePreference.includes(value)
        ? prev.codingTimePreference.filter((item) => item !== value)
        : [...prev.codingTimePreference, value];
      return { ...prev, codingTimePreference: updatedPreferences };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!edit) return;
    const formDataObject = new FormData(event.target as HTMLFormElement);
    await addOrUpdateUser(formDataObject);
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} alignItems="center" justifyContent="center">
      <Stack component={Card} width={{ xs: "100%", sm: 550 }} p={3} gap={2}>
        <Typography variant="h5" align="center">
          My Profile
        </Typography>
        <Divider />

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <input type="file" name="profileImage" onChange={handleChange} disabled={!edit} />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
          fullWidth
          InputProps={{ readOnly: !edit }}
        />

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange} disabled={!edit}>
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
            <MenuItem value="DONOTWANTTOSAY">Prefer not to say</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="GitHub Link"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <TextField
          label="Languages"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <TextField
          label="Technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          InputProps={{ readOnly: !edit }}
        />

        <FormGroup>
          <Typography> Coding Time Preference </Typography>
          {["MORNING", "AFTERNOON", "EVENING", "NIGHT", "ANYTIME"].map((time) => (
            <FormControlLabel
              key={time}
              control={
                <Checkbox
                  checked={formData.codingTimePreference.includes(time)}
                  onChange={() => handleCheckboxChange(time)}
                  disabled={!edit}
                />
              }
              label={time}
            />
          ))}
        </FormGroup>

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
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outlined" type="button" sx={{ flex: 1 }} onClick={() => setEdit(true)}>
              Edit
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
