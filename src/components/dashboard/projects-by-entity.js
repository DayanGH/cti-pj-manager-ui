import { Doughnut } from 'react-chartjs-2';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';


export const ProjectsByEntity = ({ entitiesData }) => {
    const theme = useTheme();
    const data = {
        datasets: [
            {
                data: entitiesData,
                backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#90B020', '#3F51B5', '#e53935', '#FB8C00', '#90B020', '#3F51B5'],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Otro', 'FACCEA', 'FACCSO', 'FACHUM', 'FACINM', 'FACING', 'FEMS', 'FACEIPA', 'FACCUF']
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

    const types = [];

    entitiesData.forEach(entity => {
        types.push(
            {
                title: entity.value,
                value: entity.amount,
                color: '#FB8C00'
            }
        )
    });

    return (
        <Box

            id="projectsc"
        >
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

