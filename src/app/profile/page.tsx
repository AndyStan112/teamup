import { Button, Card, Stack } from "@mui/material";

export default function ProfilePage(): React.ReactElement {
    return (
        <Stack alignItems="center" justifyContent="center">
            <Card>
                <Stack width={400} p={2}>
                    <Button variant="contained">Save</Button>
                </Stack>
            </Card>
        </Stack>
    );
}
