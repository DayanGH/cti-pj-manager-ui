import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { addPDocument, fetchGroupDocuments, addGroupDocuments } from 'src/utils/requests';
import { useData } from '../../src/utils/hooks';

export const NewDocumentDialog = ({ open, handleClose, pj_id, loadData, onAction, ...rest }) => {
  const [type, setType] = useState("document")
  const [showCustomName, setShowCustomName] = useState('none')
  const [docName, setDocName] = useState('')
  const [file, setFile] = useState()
  const [errors, setErrors] = useData({});
  const [customName, setCustomName] = useState("")
  const [group, setGroup] = useState("")

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

  const saveDocument = async () => {
    let data = new FormData();
    let saveName = showCustomName === "flex" ? customName : (type === 'document' ? (documentNames.find(item => item.key == docName)) : (groupNames.find(item => item.key == docName))).value;

    if (type === "document") {
      data.append("file", file, saveName);
      data.append("project", pj_id);
      data.append("name", saveName);
      data.append("dtype", docName);
      add(data);
    } else {
      await fetchGroupDocuments(docName, pj_id)
        .then((groupData) => {
          if (groupData.length === 1) {
            data.append("group", groupData[0].id);
            data.append("file", file, saveName);
            data.append("date", getDate());
            add(data);
          } else if (groupData.length === 0) {
            let datatemp = new FormData();
            datatemp.append('name', saveName)
            datatemp.append('project', pj_id)
            datatemp.append('dtype', docName)
            addGroupDocuments(datatemp)
              .then((dd) => {

              });
          }
        });
    }
    function add(data) {
      //TODO: Verify response and validate data before closing
      addPDocument(data, type == "document" ? "/projectdocuments/" : "/groupdocuments/").then((data) => {
        handleClose();
        loadData();
      })
        .catch((error) => {
          setErrors(error.response.data)
          console.log(error.response.data)
        });
    }
    function getDate() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();

      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
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
        sx={{ px: 2, mx: 2, display: "flex", flexDirection: "column" }}
      >
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
              setNames(event.target.value == 'document' ? documentNames : groupNames);
            }}
          >
            <MenuItem value={'group'}>Grupo</MenuItem>
            <MenuItem value={'document'}>Documento</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard"
          sx={{ mt: 1 }}
          error={'exist' in errors}
          helpertext={errors.exist}>
          <InputLabel id="demo-simple-select-filled-labeld">Nombre</InputLabel>
          <Select
            labelId="demo-simple-select-filled-labell"
            id="demo-simple-select-filledd"
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
        </FormControl>
        <TextField
          sx={{ mt: 1, display: showCustomName }}
          onChange={(event) => setCustomName(event.target.value)}
          label="Nombre"
          variant="standard" />
        <Button
          sx={{ mt: 1 }}
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
