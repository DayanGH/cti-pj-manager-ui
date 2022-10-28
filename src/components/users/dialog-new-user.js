import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { addUser, editPassword, editUser } from 'src/utils/requests';
import { useData, useTargetAction } from '../../utils/hooks';
import { DeleteUsersMembersDialog } from '../dialog-delete-user-members';

export const NewUserDialog = ({ open, handleClose, loadData, onAction, instance, ...rest }) => {
  const [data, setData] = useData({
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    email: "",
    chief_type: "project_program_both_chief",
    c_id: "",
    ...instance,
  });
  const [data_pass, setDataPass] = useData({
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useData({});
  const [mainAction, setMainAction] = useState(onAction)
  const [editable, setEditable] = useState(mainAction === 'new_user' ? false : true)
  const [visible, setVisible] = useState(mainAction === 'new_user' ? "none" : "flex")
  const [invisible, setInvisible] = useState(mainAction === 'new_user' ? "flex" : "none")

  const [action, target, handleAction] = useTargetAction();


  const saveUser = async () => {
    const func = mainAction === 'new_user' ? addUser : editUser;
    if (data.password !== instance.password) {
      await editPassword(instance.id, data_pass)
        .then((datae) => {
          func(data)
            .then((data) => {
              handleClose();
              loadData();
            })
            .catch((error) => {
              setErrors(error.response.data)
              console.log(error.response.data)
            });
        })
        .catch((error) => {
          setErrors(error.response.data)
          console.log(error.response.data)
        });
    } else {
      await func(data)
        .then((data) => {
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
    <>
      {
        ["delete_user", "delete_member",].includes(action) && (
          <DeleteUsersMembersDialog
            onAction={action}
            open
            instance={target}
            onClose={handleAction}
            closeMain={handleClose}
            loadData={() => loadData()}
          />
        )
      }
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        fullWidth={true}

      >
        <DialogTitle>{mainAction === 'new_user' ? "Nuevo usuario" : mainAction === 'get_user' ? "Usuario" : "Editar usuario"}</DialogTitle>
        <Box
          sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="Nombre"
            value={data.first_name}
            error={'first_name' in errors}
            helperText={errors.first_name}
            onChange={(event) => {
              setData({ "first_name": event.target.value })
              setData({ "username": event.target.value.split(' ')[0].toLowerCase() })
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }} />

          <TextField
            sx={{ mt: 2 }}
            label="Apellidos"
            value={data.last_name}
            error={'last_name' in errors}
            helperText={errors.last_name}
            onChange={(event) => setData({ "last_name": event.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Carnet de Identidad"
            value={data?.c_id === null ? "" : data?.c_id}
            error={'c_id' in errors}
            helperText={errors.c_id}
            onChange={(event) => setData({ "c_id": event.target.value })}
            fullWidth
            inputProps={{
              maxLength: 11,
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
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
              value={data.chief_type}
              inputProps={{ readOnly: editable }}
              label="Tipo"
              onChange={(event) => setData({ "chief_type": event.target.value })}
            >
              <MenuItem value={"project_program_both_chief"}>Jefe de Proyecto/ Programa</MenuItem>
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
            value={data.email}
            onChange={(event) => setData({ "email": event.target.value })}
            fullWidth
            type={'email'}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />

          <TextField
            sx={{ mt: 2, display: invisible }}
            type="password"
            label={mainAction === 'edit_user' ? "Nueva contraseña" : "Contraseña"}
            error={'password' in errors}
            helperText={errors.password}
            onChange={(event) => { setData({ "password": event.target.value }), setDataPass({ "password": event.target.value }) }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />
          <TextField
            sx={{ mt: 2, display: invisible }}
            type="password"
            error={'password2' in errors}
            helperText={errors.password2}
            label="Confirmar Contraseña"
            onChange={(event) => { setData({ "password2": event.target.value }), setDataPass({ "password2": event.target.value }) }}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />
          <Box
            sx={{ pt: 2, display: "flex", justifyContent: "right" }}
          >
            <Button
              sx={{ display: invisible }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              sx={{ display: invisible }}
              onClick={() => saveUser()}
            >
              Guardar
            </Button>
            <Button
              color="error"
              sx={{ display: visible }}
              onClick={() => { handleAction('delete_user', instance?.id) }}
            >
              Eliminar
            </Button>
            <Button
              sx={{ display: visible }}
              onClick={() => { setMainAction('edit_user'), setEditable(false), setVisible('none'), setInvisible('flex') }}
            >
              Editar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );

};
