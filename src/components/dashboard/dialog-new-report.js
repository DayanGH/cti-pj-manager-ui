import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useData } from '../../utils/hooks';

export const NewReportDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const [heading, setHeading] = useState('')
  const [file, setFile] = useState()
  const [errors, setErrors] = useData({});

  const generateReport = () => {

  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>"Nuevo reporte"</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          onChange={(event) => setHeading(event.target.value)}
          label="Encabezado" />
        <TextField
          label="Campos" />
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={generateReport}
          >
            Generar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
