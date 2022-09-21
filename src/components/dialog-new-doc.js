import { Dialog, Button, TextField, Box } from '@mui/material';

export const NewDocumentDialog = ({ open, handleClose, ...rest }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{ px: 2, pt: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Document name"
          variant="standard"
          margin='1'
        >
        </TextField>
        <TextField
          label="Project chief"
          variant="standard"
          margin='1'
        >
        </TextField>
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button>
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};

