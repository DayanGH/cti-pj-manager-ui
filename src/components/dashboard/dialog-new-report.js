import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { useData } from '../../utils/hooks';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const NewReportDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const export_crit = [
    { id: 'typology', value: 'Tipología' },
    { id: 'sectors', value: 'Sectores Estratégicos' },
    { id: 'facult', value: 'Facultades' },
    { id: 'members', value: 'Miembros' }]

  const [heading, setHeading] = useState('')
  const [file, setFile] = useState()
  const [errors, setErrors] = useData({});
  const [valueData, setValueData] = useState([])
  const [inputValueData, setInputValueData] = useState('')

  const generateReport = () => {
       const doc = new jsPDF()
       
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>Nuevo reporte</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          onChange={(event) => setHeading(event.target.value)}
          label="Encabezado" />

        <Autocomplete
          multiple
          sx={{ mt: 2 }}
          id="select-data"
          value={valueData}
          onChange={(_, value) => {
            setValueData(value)
          }}
          inputValue={inputValueData}
          onInputChange={(_, value) => {
            setInputValueData(value)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.value}
          options={export_crit}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Datos"
            />
          )}
        />
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
            Exportar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
