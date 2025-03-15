import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Box,
    Chip,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";

interface MultiChipSelectProps {
    name: string;
    value: string[];
    label: string;
    onSelect: (selected: string[]) => void;
    options: string[];
    disabled?: boolean;
}

const MultiChipSelect: React.FC<MultiChipSelectProps> = ({
    name,
    value,
    label,
    onSelect,
    options,
    disabled = false,
}) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValues =
            typeof event.target.value === "string"
                ? event.target.value.split(",")
                : (event.target.value as string[]);
        onSelect(selectedValues);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={name}
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput id={`select-multiple-chip-${name}`} label={label} />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {(selected as string[]).map((val) => (
                            <Chip key={val} label={val} />
                        ))}
                    </Box>
                )}
                disabled={disabled}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiChipSelect;
