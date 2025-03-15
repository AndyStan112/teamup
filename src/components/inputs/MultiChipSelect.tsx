import React, { useState } from "react";
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
    value?: string[];
    label: string;
    onSelect?: (selected: string[]) => void;
    options: string[];
    disabled?: boolean;
    defaultValue?: string[];
}

const MultiChipSelect: React.FC<MultiChipSelectProps> = ({
    name,
    value,
    label,
    onSelect,
    options,
    disabled = false,
    defaultValue = [],
}) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValues =
            typeof event.target.value === "string"
                ? event.target.value.split(",")
                : (event.target.value as string[]);

        if (onSelect) {
            onSelect(selectedValues);
        }

        if (value === undefined) {
            setInternalValue(selectedValues);
        }
    };

    const selectedValues = value !== undefined ? value : internalValue;

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={name}
                multiple
                value={selectedValues}
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
