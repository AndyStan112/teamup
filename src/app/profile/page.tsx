import {
    Button,
    Card,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function ProfilePage(): React.ReactElement {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Stack
                component={Card}
                width={{ xs: "100%", sm: 550 }}
                p={3}
                gap={2}
            >
                <Typography variant="h5" align="center">
                    My Profile
                </Typography>
                <Divider />
                <TextField label="Name" variant="outlined" fullWidth />
                <TextField
                    label="Age"
                    variant="outlined"
                    fullWidth
                    type="number"
                />
                <TextField label="Gender" variant="outlined" fullWidth />
                <TextField label="GitHub Link" variant="outlined" fullWidth />
                <TextField label="Country" variant="outlined" fullWidth />
                <Divider />
                <Stack direction="row" gap={1}>
                    <Button variant="contained" sx={{ flex: 1 }}>
                        Save
                    </Button>
                    <Button variant="outlined" sx={{ flex: 1 }}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
