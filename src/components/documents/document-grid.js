import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { DocumentIcon } from 'src/icons/document';

export const DocumentGrid = ({ documents, handleAction }) => {
  return (
    <Box
      container
      spacing={3}
      sx={{
        justifyContent: 'space-between',
        display: 'flex',
        wrap: 1
      }}
    >
      {documents.slice(0, documents.length).map((document) => (
        <Card>
          <Box
            sx={{
              alignItems: 'center',
              minWidth: 280,
              display: 'flex',
              p: 1.5,
            }}
          >
            <DocumentIcon
              sx={{ color: "secondary.main" }}
              fontSize="large" />
            <Typography
              sx={{ mx: 1, flexGrow: 1 }}
              color="textPrimary"
              variant="body1"
            >
              {document.name}
            </Typography>
            <PopupMenu
              onAction={'document'}
              handleAction={handleAction}
              instance={document.id}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};
