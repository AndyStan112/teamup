import {
    Container,
    Stack,
    Card,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Flag, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <Container maxWidth="sm">
            <Stack alignItems="center" justifyContent="center">
                <Stack component={Card} width={{ xs: "100%", sm: 550 }} p={3} my={2} gap={2}>
                    <Typography variant="h5" align="center">
                        Admin Dashboard
                    </Typography>
                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} href="/admin/reports">
                                <ListItemIcon>
                                    <Flag />
                                </ListItemIcon>
                                <ListItemText
                                    primary="User Reports"
                                    secondary="Review and manage user-reported content"
                                />
                                <ChevronRight />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Stack>
            </Stack>
        </Container>
    );
}
