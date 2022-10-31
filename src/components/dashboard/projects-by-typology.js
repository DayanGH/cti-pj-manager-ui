import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme, FormControl, InputLabel, Select, MenuItem, IconButton, Table, TableBody, TableRow, TableCell, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyIcon } from "../../icons/copy"


export const ProjectsByTypology = ({ projects }) => {
  const theme = useTheme();
  const [nac, setNac] = useState(0);
  const [ter, setTer] = useState(0);
  const [sec, setSec] = useState(0);
  const [nas, setNas] = useState(0);
  const [showBy, setShowBy] = useState("typology");
  const sectors = [
    { amount: 0, value: 'Turismo' },
    { amount: 0, value: 'Industria boitecnológica y farmacéutica' },
    { amount: 0, value: 'Electroenergético' },
    { amount: 0, value: 'Producción de alimentos' },
    { amount: 0, value: 'Construcciones' },
    { amount: 0, value: 'Telecomunicaciones e Informática' },
    { amount: 0, value: 'Logística y transporte' },
    { amount: 0, value: 'Redes hidráulicas y sanitarias' },
    { amount: 0, value: 'Agroindustria azucarera' },
    { amount: 0, value: 'Industria ligera' },
    { amount: 0, value: 'Servicios técnicos profesionales' }];

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
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

      sectors.forEach(sector => {
        if (project.strategics_sectors.includes(sector.value))
          sector.amount++;
      })
    })
    setNac(n)
    setTer(t)
    setSec(s)
    setNas(na)
  }

  const data = {
    datasets: [
      {
        data: [nac, ter, sec, nas],
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
      value: nac,
      color: '#3F51B5'
    },
    {
      title: 'Territoriales',
      value: ter,
      color: '#E53935'
    },
    {
      title: 'Sectoriales',
      value: sec,
      color: '#FB8C00'
    }
    ,
    {
      title: 'No asociados',
      value: nas,
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

  const BySectorsTable = () => {
    console.log(sectors)
    sectors.forEach(sector => console.log(sector.amount))
    return (
      <Table>
        <TableBody >
          {sectors.slice(0, sectors.length).map((sector) => (
            <TableRow key={sector.value}>
              <TableCell>
                <b>{sector.value}: </b>
              </TableCell>
              <TableCell>
                {sector.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
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
              data["datasets"]["data"] = [5, 9, 12, 3];
            }}
          >
            <MenuItem value={'typology'}>Por tipologia</MenuItem>
            <MenuItem value={'sector'}>Por sector estrategico</MenuItem>
          </Select>
        </FormControl>

        <Tooltip title="Copiar">
          <Box>
            <IconButton
              onClick={() => navigator.clipboard.writeText("Nacionales: " + nac + " Territoriales: " + ter + " Sectoriales: " + sec + " No asociados: " + nas)}
              size="small"
              title='Copiar'>
              <CopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
      <Divider />
      <CardContent>
        {showBy == "typology" ? <ByTypologyPie /> : <BySectorsTable />}
      </CardContent>
    </Card>
  );
};


