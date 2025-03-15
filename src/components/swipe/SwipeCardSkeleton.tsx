import React from "react";
import { Skeleton, Box, Avatar, Chip, Stack } from "@mui/material";

const SwipeCardSkeleton: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt="-60px">
            <Skeleton variant="circular" animation={false}>
                <Avatar sx={{ width: 120, height: 120 }} />
            </Skeleton>
            <Stack p={1} gap={0.7} width="100%" alignItems="center">
                <Skeleton variant="text" width="60%" height={35} animation={false} />
                <Skeleton variant="text" width="30%" animation={false} />
            </Stack>
            <Stack gap={0.5} p={2} pt={1} width="100%">
                <Skeleton variant="text" width="50%" animation={false} />
                <Box display="flex" gap={1}>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwerty" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwertyuiop" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwert" />
                    </Skeleton>
                </Box>
                <Skeleton variant="text" width="50%" animation={false} />
                <Box display="flex" gap={1}>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwertyui" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwertyuiop" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="qwerty" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="2345" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="wertuui" />
                    </Skeleton>
                </Box>
                <Skeleton variant="text" width="50%" animation={false} />
                <Box display="flex" gap={1}>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="Chip" />
                    </Skeleton>
                    <Skeleton variant="rectangular" animation={false}>
                        <Chip label="Chip" />
                    </Skeleton>
                </Box>
            </Stack>
        </Box>
    );
};

export default SwipeCardSkeleton;
