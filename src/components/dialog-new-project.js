import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useToggleState, useData } from 'src/utils/hooks';
import { fetchProgramDetails, fetchPrograms, fetchChiefs, fetchChiefDetails, addProject, editProject } from 'src/utils/requests';
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useAsync } from "react-async";


export const NewProjectDialog = ({ open, loadData, onClose, neww, ...rest }) => {
  const [data, setData] = useData({
    documents: [],
    document_groups: [],
    members: [],
    chief: null,
    project_classification: "",
    pj_type: "",
    name: "",
    project_code: "",
    program_code: "",
    main_entity: "",
    entities: "",
    start_date: "",
    end_date: "",
    financing: 0,
    program: null
  });
  const projectTypesNAP = [
    { key: 'pnap_di', value: 'Proyectos No Asociados a Programas Demanda Interna' },
    { key: 'pnap_de', value: 'Proyectos No Asociados a Programas Demanda Externa' }]

  const [togglePrograms, openPrograms, closePrograms] = useToggleState();
  const [toggleChief, openChiefs, closeChiefs] = useToggleState();
  const [ptype, setPtype] = useState("none")
  const [pnapType, setPnapType] = useState("")
  let component;


  const programsAsyncData = useAsync({
    deferFn: fetchPrograms,
  });
  const chiefsAsyncData = useAsync({
    deferFn: fetchChiefs,
  });


  function handleOpenPrograms() {
    openPrograms();
    programsAsyncData.run();
  }
  function handleClosePrograms() {
    closePrograms();
  }
  function handleOpenChiefs() {
    openChiefs();
    chiefsAsyncData.run();
  }
  function handleClosechiefs() {
    closeChiefs();
  }

  function handleChangeField(value, field) {
    setData({ [field]: value });
  }
  function handleAddProject(data) {
    const func = neww ? addProject : editProject;
    console.log(data)
    func(data)
      .then((data) => {
        onClose();
        loadData();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  if (ptype === 'nac') {
    component = <TextField
      sx={{ mt: 1 }}
      label="Tipo"
      variant="standard"
      contentEditable={false}
      value='Proyectos Asociados a Programas Nacional'
    />
  } else if (ptype === 'sec') {
    component = <TextField
      sx={{ mt: 1 }}
      label="Tipo"
      variant="standard"
      contentEditable={false}
      value='Proyectos Asociados a Programas Sectorial'
    />
  } else if (ptype === 'ter') {
    component = <TextField
      sx={{ mt: 1 }}
      label="Tipo"
      variant="standard"
      contentEditable={false}
      value='Proyectos Asociados a Programas Territorial'
    />
  }
  else if (ptype === 'none') {
    component = <FormControl variant="standard"
      sx={{ mt: 1 }}>
      <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={pnapType}
        onChange={(event) => {
          handleChangeField(event.target.value, 'pj_type')
          setPnapType(event.target.value)
        }}
      >
        {projectTypesNAP.map((type) => (
          <MenuItem value={type.key}
            key={type.key}>{type.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth={true}


    >
      <DialogTitle>{neww ? "Nuevo proyecto" : "Editar proyecto"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 2, display: "flex", flexDirection: "column" }}
      >
        <TextField
          sx={{ mt: 1 }}
          label="Nombre"
          variant="standard"
          onChange={(event) => {
            handleChangeField(event.target.value, 'name')
          }} />
        <TextField
          sx={{ mt: 1 }}
          label="Código"
          variant="standard"
          onChange={(event) => {
            handleChangeField(event.target.value, 'project_code')

          }} />
        <Autocomplete
          id="select-program"
          open={togglePrograms}
          onOpen={handleOpenPrograms}
          onClose={handleClosePrograms}
          onChange={(_, value) => {
            handleChangeField(value?.id, 'program')
            handleChangeField(value?.program_code, 'program_code')
            setPtype(value?.ptype)
            if (value === null) {
              setPtype('none')
              handleChangeField(null, 'program')
              handleChangeField("", 'program_code')
            }
            if (value?.ptype === 'nac') {
              handleChangeField('papn', 'pj_type')
            } else if (value?.ptype === 'sec') {
              handleChangeField('paps', 'pj_type')
            } else if (value?.ptype === 'ter') {
              handleChangeField('papt', 'pj_type')
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={programsAsyncData.data || []}
          loading={programsAsyncData.isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Programa"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <div>
                    {programsAsyncData.isLoading ? (
                      <CircularProgress
                        color="inherit"
                        size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </div>
                ),
              }}
            />
          )}
        />
        {component}
        <Autocomplete
          id="select-chief"
          open={toggleChief}
          onOpen={handleOpenChiefs}
          onClose={handleClosechiefs}
          onChange={(_, value) => {
            if (value !== null) {
              handleChangeField(value?.id, 'chief')
            }

          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
          options={chiefsAsyncData.data || []}
          loading={chiefsAsyncData.isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jefe"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <div>
                    {chiefsAsyncData.isLoading ? (
                      <CircularProgress
                        color="inherit"
                        size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </div>
                ),
              }}
            />
          )}
        />

        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button onClick={() => { console.log(data) }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
