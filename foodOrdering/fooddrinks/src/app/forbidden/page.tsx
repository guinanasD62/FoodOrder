import React from 'react';
import { Box, Typography } from '@mui/material';

const UnauthorizedPage: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="background.default"
            p={2}
        >
            <Typography variant="h3" color="error" align="center">
                Forbidden. You need permission contact Admin.
            </Typography>
        </Box>
    );
};

export default UnauthorizedPage;
