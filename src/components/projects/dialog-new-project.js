import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem, InputAdornment, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useToggleState, useData } from 'src/utils/hooks';
import { fetchPrograms, fetchChiefs, addProject, editProject } from 'src/utils/requests';
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useAsync } from "react-async";


export const NewProjectDialog = ({ open, loadData, onClose, onAction, instance, setActiveTab, ...rest }) => {
  const [data, setData] = useData({
    documents: [],
    document_groups: [],
    members: [],
    chief: null,
    project_classification: "",
    pj_type: "",
    name: "",
    strategics_sectors: "",
    project_code: "",
    program_code: "",
    main_entity: "",
    entities: "",
    start_date: "",
    end_date: "",
    financing: 0,
    program: null,
    notes: "",
    ...instance,
  });
  const projectTypesNAP = [
    { key: 'pnap_pe', value: 'Proyectos No Asociados a Programas (PE)' },
    { key: 'pnap_pne', value: 'Proyectos No Asociados a Programas (PNE)' },
    { key: 'pnap_pdl', value: 'Proyectos No Asociados a Programas (PDL)' },
    { key: 'pnap_prci', value: 'Proyectos No Asociados a Programas (PRCI)' },
    { key: 'pnap_pi', value: 'Proyectos No Asociados a Programas (PI)' }]
  const projectsClass = [
    { key: 'i_bas', value: 'De Investigación Básica' },
    { key: 'i_d', value: 'Aplicada y de Desarrollo' },
    { key: 'inn', value: 'Innovación' }]

  const strategics_sectors = [
    { id: 'Turismo', value: 'Turismo' },
    { id: 'Industria boitecnológica y farmacéutica', value: 'Industria boitecnológica y farmacéutica' },
    { id: 'Electroenergético', value: 'Electroenergético' },
    { id: 'Producción de alimentos', value: 'Producción de alimentos' },
    { id: 'Construcciones', value: 'Construcciones' },
    { id: 'Telecomunicaciones e Informática', value: 'Telecomunicaciones e Informática' },
    { id: 'Logística y transporte', value: 'Logística y transporte' },
    { id: 'Redes hidráulicas y sanitarias', value: 'Redes hidráulicas y sanitarias' },
    { id: 'Agroindustria azucarera', value: 'Agroindustria azucarera' },
    { id: 'Industria ligera', value: 'Industria ligera' },
    { id: 'Servicios técnicos profesionales', value: 'Servicios técnicos profesionales' }]

  const [togglePrograms, openPrograms, closePrograms] = useToggleState();
  const [toggleChief, openChiefs, closeChiefs] = useToggleState();
  const [errors, setErrors] = useData({});
  const [ptype, setPtype] = useState(data.pj_type.startsWith("pnap_") || data.pj_type === "" ? 'none' : data.pj_type)
  const [value, setValue] = useState(data.program !== null ? { id: data?.program, name: instance?.program_name } : null)
  const [inputValue, setInputValue] = useState('')
  const [pnapType, setPnapType] = useState(data.pj_type)
  const [pClass, setpClass] = useState("")

  const [valueChief, setValueChief] = useState(data.chief !== null ? { id: data?.chief, name: instance?.chief_name } : null)
  const [inputValueChief, setInputValueChief] = useState('')

  const [valueSectors, setValueSectors] = useState(instance?.sectors !== undefined ? instance?.sectors : [])
  const [inputValueSectors, setInputValueSector] = useState('')
  const [displayNotes, setdisplayNotes] = useState(onAction === 'new' ? "none" : "flex")
  let component;
  const programsAsyncData = useAsync({
    deferFn: fetchPrograms,
  });
  const chiefsAsyncData = useAsync({
    deferFn: fetchChiefs,
  });


  function handleOpenPrograms() {
    openPrograms();
    programsAsyncData.run('all');
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
    const func = onAction === 'new' ? addProject : editProject;
    if (onAction === 'new') {
      func(data)
        .then((data) => {
          onClose();
          loadData(data.pj_type === "papn" ? 0 : data.pj_type === "paps" ? 1 : data.pj_type === "papt" ? 2 : 3);
          setActiveTab(data.pj_type === "papn" ? 0 : data.pj_type === "paps" ? 1 : data.pj_type === "papt" ? 2 : 3)
        })
        .catch((error) => {
          setErrors(error.response.data)
          console.log(error.response.data)
        });
    } else {
      func(data)
        .then((data) => {
          onClose();
          loadData();
        })
        .catch((error) => {
          setErrors(error.response.data)
        });
    }
  }
  function setStrategicsSectors(value) {
    console.log(value)
    let strategics_sectorstemp = ''
    if (value.length === 0) {
      handleChangeField("", "strategics_sectors")
    } else {
      for (let i = 0; i < value.length; i++) {
        if (strategics_sectorstemp === '') {
          strategics_sectorstemp += value[i].value
        } else {
          strategics_sectorstemp += ',' + value[i].value
        }

      }
    }
    handleChangeField(strategics_sectorstemp, 'strategics_sectors')
  }

  if (ptype === 'nac' || (data.pj_type === 'papn' && ptype !== 'none')) {
    component = <TextField
      sx={{ mt: 2 }}
      label="Tipo"
      contentEditable={false}
      value='Proyectos Asociados a Programas Nacional'
    />
  } else if (ptype === 'sec' || (data.pj_type === 'paps' && ptype !== 'none')) {
    component = <TextField
      sx={{ mt: 2 }}
      label="Tipo"
      contentEditable={false}
      value='Proyectos Asociados a Programas Sectorial'
    />
  } else if (ptype === 'ter' || (data.pj_type === 'papt' && ptype !== 'none')) {
    component = <TextField
      sx={{ mt: 2 }}
      label="Tipo"
      contentEditable={false}
      value='Proyectos Asociados a Programas Territorial'
    />
  }
  else if (ptype === 'none') {
    component = <FormControl
      sx={{ mt: 2 }}
      error={'pj_type' in errors}>
      <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        label="Tipo"
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
      <FormHelperText>{errors.pj_type}</FormHelperText>
    </FormControl>
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>{onAction === 'new' ? "Nuevo proyecto" : "Editar proyecto"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Nombre"
          value={data.name}
          error={'name' in errors}
          helperText={errors.name}
          onChange={(event) => {
            handleChangeField(event.target.value, 'name')
          }} />
        <TextField
          sx={{ mt: 2 }}
          label="Código"
          value={data.project_code}
          error={'project_code' in errors}
          helperText={errors.project_code}
          onChange={(event) => {
            handleChangeField(event.target.value, 'project_code')

          }} />
        <Autocomplete
          sx={{ mt: 2 }}
          id="select-program"
          open={togglePrograms}
          onOpen={handleOpenPrograms}
          value={value}
          onClose={handleClosePrograms}
          onChange={(_, value) => {
            handleChangeField(value?.id, 'program')
            handleChangeField(value?.program_code, 'program_code')
            setValue(value)
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
          inputValue={inputValue}
          onInputChange={(_, value) => {
            setInputValue(value)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={programsAsyncData.data || []}
          loading={programsAsyncData.isLoading}
          renderOption={(props, option) => {
            return (
              <li {...props}
                key={option.id}>
                {option.name}
              </li>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Programa"
              error={'program' in errors}
              helperText={errors.program}
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
          sx={{ mt: 2 }}
          id="select-chief"
          open={toggleChief}
          onOpen={handleOpenChiefs}
          onClose={handleClosechiefs}
          value={valueChief}
          onChange={(_, value) => {
            if (value !== null) {
              handleChangeField(value?.id, 'chief')
              setValueChief(value)
            }

          }}
          inputValue={inputValueChief}
          onInputChange={(_, value) => {
            setInputValueChief(value)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={chiefsAsyncData.data || []}
          loading={chiefsAsyncData.isLoading}
          renderOption={(props, option) => {
            return (
              <li {...props}
                key={option.id}>
                {option.name}
              </li>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Jefe"
              error={'chief' in errors}
              helperText={errors.chief}
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
        <Autocomplete
          multiple
          sx={{ mt: 2 }}
          id="select-sectors"
          value={valueSectors}
          onChange={(_, value) => {
            setValueSectors(value)
            setStrategicsSectors(value)
          }}
          inputValue={inputValueSectors}
          onInputChange={(_, value) => {
            setInputValueSector(value)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.value}
          options={strategics_sectors}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sectores estratégicos"
              error={'chief' in errors}
              helperText={errors.chief}
            />
          )}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Financiamiento"
          type="number"
          inputProps={{ min: 0 }}
          error={'financing' in errors}
          helperText={errors.financing}
          onChange={(evt) =>
            handleChangeField(evt.target.value, "financing")
          }
          fullWidth
          value={data.financing}
          InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
        />
        <FormControl
          sx={{ mt: 2 }}
          error={'project_classification' in errors}>
          <InputLabel id="p_clasification">Clasificación</InputLabel>
          <Select
            labelId="p_clasification"
            id="demo-simple-select-filled"
            label="Clasificación"
            value={data.project_classification}
            onChange={(event) => {
              handleChangeField(event.target.value, 'project_classification')
              setpClass(event.target.value)
            }}
          >
            {projectsClass.map((classif) => (
              <MenuItem value={classif.key}
                key={classif.key}>{classif.value}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.project_classification}</FormHelperText>
        </FormControl>
        <Box sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >
          <TextField
            sx={{ mr: 1 }}
            label="Fecha de inicio"
            type="date"
            value={data.start_date}
            error={'start_date' in errors}
            helperText={errors.start_date}
            onChange={(evt) => handleChangeField(evt.target.value, 'start_date')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fecha de culminación"
            type="date"
            value={data.end_date}
            error={'end_date' in errors}
            helperText={errors.end_date}
            onChange={(evt) => handleChangeField(evt.target.value, 'end_date')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          sx={{ mt: 2 }}
          label="Entidad principal"
          type='text'
          value={data.main_entity}
          error={'main_entity' in errors}
          helperText={errors.main_entity}
          onChange={(evt) => handleChangeField(evt.target.value, 'main_entity')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Entidades participantes"
          multiline
          value={data.entities}
          maxRows={4}
          type='text'
          error={'entities' in errors}
          helperText={errors.entities}
          onChange={(evt) => handleChangeField(evt.target.value, 'entities')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2, display: displayNotes }}
          label="Notas"
          multiline
          value={data.notes}
          maxRows={10}
          type='text'
          error={'notes' in errors}
          helperText={errors.entities}
          onChange={(evt) => handleChangeField(evt.target.value, 'notes')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button onClick={() => {
            handleAddProject(data)
          }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog >
  );

};
