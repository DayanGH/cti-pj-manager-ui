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

export const ProjectsListToolbar = (props) => (
  <Box {...props}>
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
        >
          Nuevo
        </Button>
      </Box>
    </Box>
  </Box>
);
