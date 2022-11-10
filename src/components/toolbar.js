import { Box, Typography, Button } from '@mui/material';
import { AddIcon } from '../icons/add';

export const Toolbar = ({ title, handleAction, action, editable }) => {
    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                flexGrow: 1,
                borderBottom: 1,
                borderColor: 'divider',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography
                color="textPrimary"
                variant="h6"
            >
                {title}
            </Typography>
            <Button
                sx={{display: editable ? "" : "none"}}
                startIcon={(<AddIcon fontSize="small" />)}
                color="primary"
                variant="contained"
                onClick={() => handleAction(action)}
            >
                Nuevo
            </Button>
        </Box>
    );
};
