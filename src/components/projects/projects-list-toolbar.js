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
import { fetchProjects } from '../../utils/requests'

export const ProjectsListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [action, target, handleAction] = useTargetAction();
  function loaddata(type) {
    console.log(type)
    fetchProjects(type === 0 ? "paps" : type === 1 ? "papt" : type === 2 ? "papn" : "pnap")
      .then((data) => {
        props.setProjects(data);
        console.log(data)
      });
  }
  return (
    <>
      <Box>
        {["new", "edit"].includes(action) && (
          <NewProjectDialog
            open
            onAction={action}
            instance={target}
            onClose={handleAction}
            loadData={(type) => loaddata(type)} />
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
            <Tabs value={props.activeTab}
              onChange={(event, newTab) => {
                props.setActiveTab(newTab)
                loaddata(newTab)
              }}
              centered>
              <Tab label="Sectoriales" />
              <Tab label="Territoriales" />
              <Tab label="Nacionales" />
              <Tab label="No asociados" />
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
              placeholder="Buscar proyectos"
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
