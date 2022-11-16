import { Box, Typography, Button, InputAdornment, TextField, SvgIcon } from '@mui/material';
import { AddIcon } from '../../icons/add';
import { Search as SearchIcon } from '../../icons/search';

export const UsersToolbar = ({ title, handleAction, action, setQuery, editable }) => {
    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                flexGrow: 1,
                borderBottom: 1,
                borderColor: 'divider',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography
                sx={{flexGrow: 1}}
                color="textPrimary"
                variant="h6"
            >
                {title}
            </Typography>
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
              placeholder={"Buscar " + title.toLowerCase()}
              variant="standard"
            />
          </Box>
            <Button
                sx={{display: editable ? "" : "none"}}
                startIcon={(<AddIcon fontSize="small" />)}
                color="primary"
                variant="contained"
                onClick={() => handleAction(action)}
            >
                Nuevo
            </Button>
        </Box>
    );
};
