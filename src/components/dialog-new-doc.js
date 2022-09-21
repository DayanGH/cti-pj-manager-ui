import { Dialog, Button, TextField, Box } from '@mui/material';

export const NewDocumentDialog = (props) => {
  return (
    <Dialog
      open="false"
    >
      <Box
        sx={{px:2, pt:2, display: "flex", flexDirection: "column"}}
      >
        <TextField
          placeholder="Project name"
          variant="standard"
          text={open}
        >
        </TextField>
        <TextField
          helperText="Project chief"
          variant="standard"
        >
        </TextField>
        <Box
          sx={{display: "flex", justifyContent: "right"}}
        >
          <Button>
            Cancel
          </Button>
          <Button>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
