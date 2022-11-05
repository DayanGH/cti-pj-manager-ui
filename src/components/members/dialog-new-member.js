import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { addMember, editMember } from 'src/utils/requests';
import { useData, useTargetAction } from '../../utils/hooks';
import { DeleteUsersMembersDialog } from './dialog-delete-user-members';

export const NewMemberDialog = ({ open, handleClose, loadData, onAction, instance, setValue, ...rest }) => {
  const [data, setData] = useData({
    name: "",
    c_id: "",
    email: "",
    organization: "",
    m_type: "in",
    ...instance,
  });
  const [errors, setErrors] = useData({});
  const [mainAction, setMainAction] = useState(onAction)
  const [editable, setEditable] = useState(mainAction.startsWith('new_member') ? false : true)
  const [visible, setVisible] = useState(mainAction.startsWith('new_member') ? "none" : "flex")
  const [invisible, setInvisible] = useState(mainAction.startsWith('new_member') ? "flex" : "none")

  const [action, target, handleAction] = useTargetAction();


  const saveMember = async () => {
    const func = mainAction === 'new_member' || mainAction === 'new_member_p' ? addMember : editMember;

    await func(data)
      .then((data) => {
        handleClose();
        if (mainAction === 'new_member' || mainAction === 'edit_member') {
          loadData();
        } else {
          setValue(data)
          console.log(data)
        }

      })
      .catch((error) => {
        setErrors(error.response.data)
        console.log(error.response.data)
      });

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
        <DialogTitle>{mainAction.startsWith('new_member') ? "Nuevo miembro" : mainAction === 'get_member' ? "Miembro" : "Editar miembro"}</DialogTitle>
        <Box
          sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="Nombre"
            value={data.name}
            error={'name' in errors}
            helperText={errors.name}
            onChange={(event) => setData({ "name": event.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />

          <FormControl
            sx={{ mt: 2 }}
            error={'m_type' in errors}
            helpertext={errors.m_type}
          >
            <InputLabel
              id="demo-simple-select-filled-label"
            >
              Tipo
            </InputLabel>
            <Select
              inputProps={{ readOnly: editable }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={data.m_type}
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
            value={data.email}
            error={'email' in errors}
            helperText={errors.email}
            onChange={(event) => setData({ "email": event.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Carnet de Identidad"
            value={data.c_id}
            error={errors?.exist ? 'exist' in errors : 'c_id' in errors}
            helperText={errors?.exist ? errors.exist : errors.c_id}
            onChange={(event) => setData({ "c_id": event.target.value })}
            fullWidth
            inputProps={{
              maxLength: 11,
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: editable }}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Organizacion"
            value={data.organization}
            error={'organization' in errors}
            helperText={errors.organization}
            onChange={(event) => setData({ "organization": event.target.value })}
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
              onClick={saveMember}
            >
              Guardar
            </Button>
            <Button
              color="error"
              sx={{ display: visible }}
              onClick={() => { handleAction('delete_member', instance?.id) }}
            >
              Eliminar
            </Button>
            <Button
              sx={{ display: visible }}
              onClick={() => { setMainAction('edit_member'), setEditable(false), setVisible('none'), setInvisible('flex') }}
            >
              Editar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );


};
