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
import { NewProjectDialog } from './dialog-new-project';
import { useTargetAction } from "../../utils/hooks";
import { fetchProjects } from '../../utils/requests'

export const ProjectsListToolbar = ({ activeTab, setActiveTab, setProjects, setQuery }) => {
  const [action, target, handleAction] = useTargetAction();
  function loaddata(type) {
    fetchProjects(type === 0 ? "papn" : type === 1 ? "paps" : type === 2 ? "papt" : "pnap")
      .then((data) => {
        setProjects(data);
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
            loadData={(type) => loaddata(type)}
            setActiveTab={setActiveTab} />
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
            <Tabs value={activeTab}
              onChange={(event, newTab) => {
                setActiveTab(newTab)
                loaddata(newTab)
              }}
              centered>
              <Tab label="Nacionales" />
              <Tab label="Sectoriales" />
              <Tab label="Territoriales" />
              <Tab label="No asociados" />
            </Tabs>
          </Box>

          <Box sx={{ maxWidth: 500, m: 1 }}>
            <TextField
              onChange={(event) => setQuery(event.target.value)}
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
