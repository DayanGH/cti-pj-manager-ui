import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useToggleState } from 'src/utils/hooks';
import { fetchPrograms } from 'src/utils/requests';
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useAsync } from "react-async";

export const NewProjectDialog = ({ open, loadData, onClose, neww, ...rest }) => {
  const [toggleProject, openProjects, closeProjects] = useToggleState();
  const programsAsyncData = useAsync({
    deferFn: fetchPrograms,
  });

  function handleOpenProjects() {
    openProjects();
    programsAsyncData.run();
  }

  function handleCloseProjects() {
    closeProjects();
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
          variant="standard" />
        <TextField
          sx={{ mt: 1 }}
          label="Código"
          variant="standard" />

        <TextField
          sx={{ mt: 1 }}
          label="Nombre"
          variant="standard" />
        <Autocomplete
          id="select-product"
          open={toggleProject}
          onOpen={handleOpenProjects}
          onClose={handleCloseProjects}
          onChange={(_, value) => {
            console.log(value)
          }}
          getOptionLabel={(option) => option.name}
          options={programsAsyncData.data || []}
          loading={programsAsyncData.isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Producto"
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

        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button onClick={() => { loadData(); onClose() }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
