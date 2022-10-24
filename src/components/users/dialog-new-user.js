import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { addUser } from 'src/utils/requests';
import { useData } from '../../utils/hooks';

export const NewUserDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const [data, setData] = useData({
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "",
    chief_type: "project_program_both_chief",
    c_id: "",
  });
  const [errors, setErrors] = useData({});

  const saveUser = async () => {
    console.log(data)

    await addUser(data)
      .then((data) => {
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
      <DialogTitle>{onAction === 'new_user' ? "Nuevo usuario" : "Editar usuario"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Nombre"
          error={'first_name' in errors}
          helperText={errors.first_name}
          onChange={(event) => {
            setData({ "first_name": event.target.value })
            setData({ "username": event.target.value.split(' ')[0].toLowerCase() })
          }}
          fullWidth
          InputLabelProps={{ shrink: true }} />

        <TextField
          sx={{ mt: 2 }}
          label="Apellidos"
          error={'last_name' in errors}
          helperText={errors.last_name}
          onChange={(event) => setData({ "last_name": event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Carnet de Identidad"
          onChange={(event) => setData({ "c_id": event.target.value })}
          fullWidth
          inputProps={{
            maxLength: 11,
          }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl
          sx={{ mt: 2 }}
          error={'chief_type' in errors}
          helpertext={errors.chief_type}
        >
          <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data["chief_type"]}
            label="Tipo"
            onChange={(event) => setData({ "chief_type": event.target.value })}
          >
            <MenuItem value={"project_program_both_chief"}>Jefe de Proyecto/ Programa / Ambos</MenuItem>
            <MenuItem value={"human_resources"}>Recursos Humanos</MenuItem>
            <MenuItem value={"economy"}>Economia</MenuItem>
            <MenuItem value={"vicedec_inv_postgr"}>Vicedecano de Investigacion y Postgrado</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mt: 2 }}
          label="Correo"
          error={'email' in errors}
          helperText={errors.email}
          onChange={(event) => setData({ "email": event.target.value })}
          fullWidth
          type={'email'}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          sx={{ mt: 2 }}
          type="password"
          label="Contrasña"
          error={'password' in errors}
          helperText={errors.password}
          onChange={(event) => setData({ "password": event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          type="password"
          error={'password2' in errors}
          helperText={errors.password2}
          label="Confirmar Contrasña"
          onChange={(event) => { setData({ "password2": event.target.value }) }}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => saveUser()}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
