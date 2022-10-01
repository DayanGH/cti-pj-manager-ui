import {
  Box,
  Button,
  TextField,
  Tab,
  Tabs,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { AddIcon } from '../../icons/add';
import { useState } from 'react';
import { NewProjectDialog } from '../dialog-new-project';
import { useTargetAction } from "../../utils/hooks";

export const ProgramsToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [action, target, handleAction] = useTargetAction();
  function loaddata() {
    return props.loadData()
  }
  return (
    <>
      <Box>
        {["new", "edit"].includes(action) && (
          <NewProjectDialog
            open
            neww={action === "new"}
            instance={target}
            onClose={handleAction}
            loadData={() => loaddata()} />
        )}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            mt: 1
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
            <Tabs value={0}
              centered>
              <Tab label="Sectoriales" />
              <Tab label="Territoriales" />
              <Tab label="Nacionales" />
            </Tabs>
          </Box>

          <Box sx={{ maxWidth: 500, m: 1 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Buscar programas"
              variant="standard"
            />
          </Box>
          <Box sx={{ m: 1 }}>

            <Button
              startIcon={(<AddIcon fontSize="small" />)}
              color="primary"
              variant="contained"
              onClick={() => handleAction("new")}
            >
              Nuevo
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
};
