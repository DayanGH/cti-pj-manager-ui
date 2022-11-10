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
import { NewProgramDialog } from './dialog-new-program';
import { useTargetAction } from "../../utils/hooks";
import { fetchPrograms } from 'src/utils/requests';

export const ProgramsToolbar = ({ activeTab, setActiveTab, setPrograms, setQuery, editable }) => {
  const [action, target, handleAction] = useTargetAction();
  function loaddata(type) {
    fetchPrograms(type === 0 ? "nac" : type === 1 ? "sec" : "ter")
      .then((data) => {
        setPrograms(data);
      });
  }
  return (
    <>
      <Box>
        {["new", "edit"].includes(action) && (
          <NewProgramDialog
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
              placeholder="Buscar programas"
              variant="standard"
            />
          </Box>
          <Box sx={{ m: 1 }}>

            <Button
              sx={{display: editable ? "" : "none"}}
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
