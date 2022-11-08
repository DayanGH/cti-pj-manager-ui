import { ProjectsBySectors } from "./projects-by-sector"
import { ProjectsByTypology } from "./projects-by-typology"
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyIcon } from "../../icons/copy"
import { ExportPDF } from 'src/icons/export-pdf';
import { NewReportDialog } from './dialog-new-report';
import { useTargetAction } from 'src/utils/hooks';


export const ProjectStats = ({ sectorsData, typologyData }) => {
  const theme = useTheme();
  const [showBy, setShowBy] = useState("typology");
  const [action, target, handleAction] = useTargetAction();

  let component = showBy == "typology" ? <ProjectsByTypology typologyData={typologyData} /> : <ProjectsBySectors sectorsData={sectorsData} />
  
  return (
    <>
      {["export"].includes(action) && (
        <NewReportDialog
          onAction={action}
          open
          handleClose={handleAction}
        />
      )}
      <Card
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
          <CardHeader title="Projectos"
            sx={{ flexGrow: 1 }} />
          <FormControl>
            <InputLabel id="demo-simple-select-filled-label">Datos</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={showBy}
              label='Datos'
              onChange={(event) => {
                setShowBy(event.target.value);
              }}
            >
              <MenuItem value={'typology'}>Por tipologia</MenuItem>
              <MenuItem value={'sector'}>Por sector estrategico</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Exportar">
            <Box>
              <IconButton
                onClick={() => handleAction('export')}
                size="small"
                title='Copiar'>
                <ExportPDF fontSize="small" />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
        <Divider />
        <CardContent>
          {component}
        </CardContent>
      </Card>
    </>
  );
};

