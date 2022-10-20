import { Avatar, Box, Typography } from  '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const UserEntry = ({name}) => {
  return(
  <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        sx={{ mr: 2 }}
                      >
                        {getInitials(name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {name}
                      </Typography>
                    </Box>
                    );
};
