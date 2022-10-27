import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { DocumentIcon } from 'src/icons/document';
import { downloadDocument } from 'src/utils/requests';

export const DocumentGrid = ({ documents, handleAction }) => {

  const DocItem = ({ document }) => {
    return (
      <Card>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            p: 1.5,
          }}
        >
          <DocumentIcon
            sx={{ color: "secondary.main" }}
            fontSize="large" />
          <Typography
            onClick={() => downloadDocument( "documents/" + document.id, document.file.split("/").pop())}
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
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {documents.slice(0, documents.length).map((document) => (
          <Grid
            item
            xs={6}
            key={document.id}>
            <DocItem document={document} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
