import { Doughnut } from 'react-chartjs-2';
import { ProjectsBySectors } from "./projects-by-sector"
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, IconButton, Table, TableBody, TableRow, TableCell, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyIcon } from "../../icons/copy"
import { ExportPDF } from 'src/icons/export-pdf';
import { NewReportDialog } from './dialog-new-report';
import { useTargetAction } from 'src/utils/hooks';


export const ProjectsByTypology = ({ sectorsData, typologyData }) => {
  const theme = useTheme();
  const [nac, setNac] = useState(0);
  const [ter, setTer] = useState(0);
  const [sec, setSec] = useState(0);
  const [nas, setNas] = useState(0);
  const [showBy, setShowBy] = useState("typology");
  const [action, target, handleAction] = useTargetAction();

  /* useEffect(() => {
    loadTypologyData()
  })

  function loadTypologyData() {
    let n = 0, t = 0, s = 0, na = 0;

    projects.forEach(project => {
      if (project.pj_type == "papn")
        n++;
      else if (project.pj_type == "papt")
        t++;
      else if (project.pj_type == "paps")
        s++;
      else if (project.pj_type.startsWith("pnap"))
        na++;
    })
    setNac(n)
    setTer(t)
    setSec(s)
    setNas(na)
  } */

  const data = {
    datasets: [
      {
        data: typologyData,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#90B020'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Nacionales', 'Territoriales', 'Sectoriales', 'No asociados']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const types = [
    {
      title: 'Nacionales',
      value: typologyData[0],
      color: '#3F51B5'
    },
    {
      title: 'Territoriales',
      value: typologyData[1],
      color: '#E53935'
    },
    {
      title: 'Sectoriales',
      value: typologyData[2],
      color: '#FB8C00'
    }
    ,
    {
      title: 'No asociados',
      value: typologyData[3],
      color: '#90B020'
    }
  ];

  const ByTypologyPie = () => {
    return (
      <Box>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {types.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  };


  let component = showBy == "typology" ? <ByTypologyPie /> : <ProjectsBySectors sectorsData={sectorsData} />
  return (
    <>
      {["export"].includes(action) && (
        <NewReportDialog
          onAction={action}
          open
          handleClose={handleAction}
        />
      )}
      <Card>
        <Box id="boxi" sx={{ display: "flex", alignItems: "center", mr: 1 }}>
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
                onClick={() => htmlToPDF("dashboard") /*handleAction('export')*/}
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

