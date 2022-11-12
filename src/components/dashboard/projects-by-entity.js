import { Bar } from "react-chartjs-2";
import { Box, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from 'react';

export const ProjectsByEntity = ({ entitiesData }) => {
  const theme = useTheme();
  const [sData, setSData] = useState()
  const [sLabels, setSLabels] = useState([])

  useEffect(() => {
    loadData();
  }, [loadData])

  const loadData = useCallback(() => {
    let d = []
    let l = []
    entitiesData.forEach(entity => {
      d.push(entity["amount"])
      l.push(entity.value)
    })
    setSData(d)
    setSLabels(l)
  }, [entitiesData])

  const barData = {
    datasets: [
      {
        backgroundColor: "#90B020",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: sData,
        label: "Cantidad",
        maxBarThickness: 10,
      }
    ],
    labels: sLabels,
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
      <Bar
       id="sectorsb"
       data={barData}
        options={barOptions} />
    </Box>

  );
};
