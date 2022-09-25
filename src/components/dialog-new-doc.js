import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { min } from 'date-fns';
import { useState } from 'react';

export const NewDocumentDialog = ({ open, handleClose, ...rest }) => {
  const [type, setType] = useState('')
  const [showCustomName, setShowCustomName] = useState('none')
  const [doc_name, setDoc_name] = useState('')

  const d = 'document'
  let form;
  const documentNames = [
    { key: 'other', value: 'Otro' },
    { key: 'profile', value: 'Perfil' },
    { key: 'contract', value: 'Contract' },
    { key: 'rsjf', value: 'Resolución de nombramiento del jefe de proyecto' },
    { key: 'cidef', value: 'Compatibilización con los intereses de la Defensa' },
    { key: 'roap', value: 'Resolución oficial de aprobación del proyecto' },
    { key: 'dapcca', value: 'Dictamen de aprobación del proyecto por el CCA' },
    { key: 'dpddp', value: 'Documentos de planificación del diseño y desarrollo del producto' },
    { key: 'csbie', value: 'Certifico del salario básico de los investigadores externos' },
    { key: 'fciie', value: 'Fotos escaneadas del carné de identidad de los investigadores' }]
  const [names, setNames] = useState(documentNames)
  const groupNames = [
    { key: 'other', value: 'Otro' },
    { key: 'dpac', value: 'Desglose del presupuesto del año en curso' },
    { key: 'mca', value: 'Anexo 15 Modelo de certificación de actividades' },
    { key: 'isp', value: 'Anexo 13 Informe semestral del proyecto' },
    { key: 'ict', value: 'Informe científico técnico' },
    { key: 'dapiscca', value: 'Dictamen de aprobación del informe semestral por el CCA' },
    { key: 'dgeri', value: 'Dictamen del Grupo de Expertos sobre los resultados y el Informe de la Etapa' },
    { key: 'mnig', value: 'Anexo 16 Modelo de Notificación de Ingresos/Gastos' },
    { key: 'bcpr', value: 'Base de cálculo para el pago por remuneración' },
    { key: 'acpp', value: 'Acta de conformidad de los participantes del proyecto' },
    { key: 'cpr', value: 'Certificación para el pago de la remuneración' },
    { key: 'cpie', value: 'Anexo 8. Certifico para el pago de los investigadores externos' }]

  const handleType = (event) => {
    setType(event.target.value);
    setNames(event.target.value == 'document' ? documentNames : groupNames)
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>Nuevo documento</DialogTitle>
      <Box
        sx={{ px: 2, mx: 2, display: "flex", flexDirection: "column" }}
      >
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            onChange={handleType}
          >
            <MenuItem value={'group'}>Grupo</MenuItem>
            <MenuItem value={'document'}>Documento</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard"
          sx={{ mt: 1 }}>
          <InputLabel id="demo-simple-select-filled-label">Nombre</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={doc_name}
            onChange={(event) => {
              setDoc_name(event.target.value);
              setShowCustomName(event.target.value == "other" ? "flex" : "none")
            }}
          >
            {names.map((name) => (
              <MenuItem value={name.key}
                key={name.key}>{name.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: 1, display: showCustomName }}
          label="Nombre"
          variant="standard" />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
        >
          Seleccionar archivo
        </Button>
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
