import { Bar } from "react-chartjs-2";
import { Box, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from 'react';

export const ProjectsBySectors = ({ projects }) => {
  const theme = useTheme();
  const [sData, setSData] = useState([])
  const [sLabels, setSLabels] = useState([])

  useEffect(() => {
    loadData();
  }, [loadData])

  const loadData = useCallback(() => {

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
      { amount: 0, value: 'Servicios técnicos profesionales' }]

    projects.forEach(project => {
      sectors.forEach(sector => {
        if (project.strategics_sectors.includes(sector.value))
          sector.amount++;
      })
    })

    let d = []
    let l = []
    sectors.forEach(sector => {
      d.push(sector["amount"])
      sLabels.push(sector.value)
    })
    setSData(d)
    setSLabels(l)
  }, [projects, sLabels])

  const barData = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: sData,
        label: "Cantidad",
        maxBarThickness: 10,
      }
    ],
    labels: ["Turismo", "Industria boitecnológica y farmacéutica", "Electroenergético", "Producción de alimentos", "Construcciones", "Telecomunicaciones e Informática", "Logística y transporte", "Redes hidráulicas y sanitarias", "Agroindustria azucarera", "Industria ligera", "Servicios técnicos profesionales"],
  };

  const barOptions = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (

    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <Bar data={barData}
        options={barOptions} />
    </Box>

  );
};
