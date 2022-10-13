import { Box, Typography, Button} from '@mui/material';
import { AddIcon } from '../../icons/add';

export const DocumentsToolbar = ({handleAction}) => {
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
                            Documentos
                        </Typography>
                        <Button
                            startIcon={(<AddIcon fontSize="small" />)}
                            color="primary"
                            variant="contained"
                            onClick={() => handleAction("new_document")}
                        >
                            Nuevo
                        </Button>
                    </Box>
  );
};
