import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { addUser } from 'src/utils/requests';
import { useData } from '../../utils/hooks';

export const NewUserDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const [data, setData] = useData({
    name: "",
    c_id: "",
    email: "",
    type: "project_program_both_chief",
    password: ""
  });
  const [errors, setErrors] = useData({});

  const saveUser = async () => {
    console.log(data);

    addUser(data).then((data) => {
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
          onChange={() => setData({ ["name"]: event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <FormControl sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={data["type"]}
            label="Tipo"
            onChange={() => setData({ ["type"]: event.target.value })}
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
          onChange={() => setData({ ["email"]: event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          label="CID"
          onChange={() => setData({ ["c_id"]: event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          type="password"
          label="Contrasena"
          onChange={() => setData({ ["password"]: event.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ mt: 2 }}
          type="password"
          label="Confirmar Contrasena"
          onChange={() => { }}
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
            onClick={saveUser}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
