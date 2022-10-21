import { Dialog, Button, TextField, Box, DialogTitle, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { addDocument} from '../../utils/requests';
import { useData } from '../../utils/hooks';

export const NewSDocumentDialog = ({ open, handleClose, loadData, onAction, ...rest }) => {
  const [docName, setDocName] = useState('')
  const [file, setFile] = useState()
  const [errors, setErrors] = useData({});

  const saveDocument = async () => {
    let data = new FormData();
      data.append("file", file, docName);
      data.append("name", docName);
      addDocument(data, "/documents/").then((data) => {
        handleClose();
        loadData();
      })
        .catch((error) => {
          //setErrors(error.response.data)
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
      <DialogTitle>{onAction === 'new_document' ? "Nuevo documento" : "Editar documento"}</DialogTitle>
      <Box
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
        <TextField
          onChange={(event) => setDocName(event.target.value)}
          label="Nombre" />
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
