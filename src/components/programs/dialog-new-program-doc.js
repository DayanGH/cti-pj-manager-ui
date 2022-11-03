import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { addDocument, fetchDocumentsGroup, addDocumentsGroup } from 'src/utils/requests';
import { useData } from '../../utils/hooks';

export const NewProgramDocumentDialog = ({ open, handleClose, pj_id, loadData, onAction, ...rest }) => {
  const [type, setType] = useState("document")
  const [showCustomName, setShowCustomName] = useState("none")
  const [showDate, setShowDate] = useState("none")
  const [docName, setDocName] = useState('')
  const [file, setFile] = useState()
  const [errors, setErrors] = useData({});
  const [customName, setCustomName] = useState("")
  const [date, setDate] = useState();

  const documentNames = [
    { key: 'other', value: 'Otro' },
    { key: 'profile', value: 'Perfil' },
    { key: 'contract', value: 'Contract' },
    { key: 'rsjf', value: 'Resolución de nombramiento del equipo de dirección' },
    { key: 'cidef', value: 'Compatibilización con los intereses de la Defensa' },
    { key: 'dap', value: 'Documento de aprobación del programa' },
    { key: 'daeg', value: 'Documento de aprobación de la entidad gestora' },
    { key: 'dpddp', value: 'Documentos de planificación del diseño y desarrollo del producto' },
    { key: 'csbie', value: 'Certifico del salario básico de los investigadores externos' },
    { key: 'fciie', value: 'Fotos escaneadas del carné de identidad de los investigadores' }]
  const [names, setNames] = useState(documentNames)
  const groupNames = [
    { key: 'dpac', value: 'Desglose del presupuesto del año en curso' },
    { key: 'mca', value: 'Anexo 15 Modelo de certificación de actividades' },
    { key: 'rdlc', value: 'Resultados de la convocatoria' },
    { key: 'rpe', value: 'Relación de proyectos en ejecucion' },
    { key: 'arge', value: 'Actas de las reuniones del grupo de expertos' },
    { key: 'iar', value: 'Informe anual de resultados del programa' },
    { key: 'ifp', value: 'Informe final del programa' },
    { key: 'bcpr', value: 'Base de cálculo para el pago por remuneración' },
    { key: 'acpp', value: 'Acta de conformidad de los participantes del programa' },
    { key: 'cpr', value: 'Certificación para el pago de la remuneración' },
    { key: 'cpie', value: 'Anexo 8. Certifico para el pago de los investigadores externos' }
  ]

  const saveDocument = async () => {
    let data = new FormData();
    let saveName = showCustomName === "flex" ? customName : (type === 'document' ? (documentNames.find(item => item.key == docName)) : (groupNames.find(item => item.key == docName))).value;

    if (type === "document") {
      saveName += "." + file.name.split(".").pop()
      data.append("file", file, saveName);
      data.append("program", pj_id);
      data.append("name", saveName);
      data.append("dtype", docName);
      add(data);
    } else {
      saveName += "_" + date + "." + file.name.split(".").pop()
      await fetchDocumentsGroup(docName, pj_id, "/programdocumentgroups/")
        .then((groupData) => {
          if (groupData.length === 1) {
            data.append("group", groupData[0].id);
            data.append("file", file, saveName);
            data.append("date", date);
            add(data);
          } else if (groupData.length === 0) {
            let datatemp = new FormData();
            datatemp.append('name', saveName)
            datatemp.append("program", pj_id)
            datatemp.append('dtype', docName)
            addDocumentsGroup(datatemp, "/programdocumentgroups/")
              .then((dd) => {
                data.append("group", dd.id);
                data.append("file", file, saveName);
                data.append("date", date);
                add(data);
              });
          }
        });
    }
    function add(data) {
      //TODO: Verify response and validate data before closing
      let path = type == "document" ? "/programdocuments/" : "/programgroupdocuments/"
      addDocument(data, path).then((data) => {
        handleClose();
        loadData();
      })
        .catch((error) => {
          setErrors(error.response.data)
          console.log(error.response.data)
        });
    }
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>{onAction === 'new_document' ? "Nuevo documento" : "Editar documento"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            label='Tipo'
            onChange={(event) => {
              setType(event.target.value);
              setNames(event.target.value == 'document' ? documentNames : groupNames);
              setShowDate(event.target.value == "group" ? "flex" : "none");
            }}
          >
            <MenuItem value={'group'}>Grupo</MenuItem>
            <MenuItem value={'document'}>Documento</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ mt: 2 }}
          error={'exist' in errors}>
          <InputLabel id="demo-simple-select-filled-label1">Nombre</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label1"
            id="demo-simple-select-filled1"
            label='Nombre'
            value={docName}
            onChange={(event) => {
              setDocName(event.target.value);
              setShowCustomName(event.target.value == "other" ? "flex" : "none");
            }}
          >
            {names.map((name) => (
              <MenuItem value={name.key}
                key={name.key}>{name.value}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.exist}</FormHelperText>
        </FormControl>
        <TextField
          sx={{ mt: 2, display: showDate }}
          label="Fecha"
          type="date"
          onChange={() => setDate(event.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2, display: showCustomName }}
          onChange={(event) => setCustomName(event.target.value)}
          label="Nombre" />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
        >
          <input
            type="file"
            name="file_url"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </Button>
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={saveDocument}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
