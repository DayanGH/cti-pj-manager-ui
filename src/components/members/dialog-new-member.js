import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { addMember } from 'src/utils/requests';
import { useData } from '../../utils/hooks';

export const NewMemberDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const [data, setData] = useData({
    name: "",
    c_id: "",
    email: "",
    organization: "",
    m_type: "in"
  });
  const [errors, setErrors] = useData({});

  const saveMember = async () => {
    console.log(data);

    addMember(data).then((data) => {
      handleClose();
      loadData();
    })
      .catch((error) => {
        setErrors(error.response.data)
        console.log(error.response.data)
      });

  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth={true}

    >
      <DialogTitle>{onAction === 'new_member' ? "Nuevo miembro" : "Editar miembro"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Nombre"
          error={'name' in errors}
          helperText={errors.name}
          onChange={() => setData({ ["name"]: event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <FormControl
          sx={{ mt: 2 }}
          error={'m_type' in errors}
          helpertext={errors.m_type}>
          <InputLabel
            id="demo-simple-select-filled-label"
          >
            Tipo
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data["m_type"]}
            label="Tipo"
            variant={'outlined'}
            onChange={(event) => {
              console.log(event.target.value)
              setData({ "m_type": event.target.value })
            }}
          >
            <MenuItem value={"out"}>Externo</MenuItem>
            <MenuItem value={'in'}>Interno</MenuItem>
            <MenuItem value={'stdnt'}>Estudiante</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: 2 }}
          label="Correo"
          error={'email' in errors}
          helperText={errors.email}
          onChange={(event) => setData({ "email": event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Carnet de Identidad"
          error={'c_id' in errors}
          helperText={errors.c_id}
          onChange={(event) => setData({ "c_id": event.target.value })}
          fullWidth
          inputProps={{
            maxLength: 11,
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Organizacion"
          error={'organization' in errors}
          helperText={errors.organization}
          onChange={(event) => setData({ "organization": event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
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
            onClick={saveMember}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};