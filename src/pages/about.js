import Head from 'next/head';
import { Box, Grid, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { MailIcon } from 'src/icons/mail';
import { GitHubIcon } from 'src/icons/github';
import { MaterialIcon } from 'src/icons/materialui';
import { PythonIcon } from 'src/icons/python';
import { ReactIcon } from 'src/icons/react';
import { NextJSIcon } from 'src/icons/nextjs';

const About = () => {

    return (
        <>
            <Head>
                <title>
                    Acerca de
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2
                }}
            >
               <Grid container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        
          <Grid
            item
            xs={6}>
                  <Card
      >
      <CardHeader title="Axel358"
            sx={{ flexGrow: 1, py: 3 }} />
            <Divider />
        <CardContent sx={{ py: 3 }}>
        <Box sx={{display: "flex", alignItems: "center"}}>
        <MailIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              axel358@yahoo.com
            </Typography>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
        <GitHubIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              https://github.com/axel358
            </Typography>
        </Box>
        </CardContent>
      </Card>
          </Grid>
          
          <Grid
            item
            xs={6}>
                  <Card
      >
      <CardHeader title="DayanGH"
            sx={{ flexGrow: 1, py: 3 }} />
            <Divider />
        <CardContent sx={{ py: 3 }}>
        <Box sx={{display: "flex", alignItems: "center"}}>
        <MailIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              dayangh@yahoo.com
            </Typography>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
        <GitHubIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              https://github.com/DayanGH
            </Typography>
        </Box>
        </CardContent>
      </Card>
          </Grid>
          <Grid
            item
            xs={12}>
                  <Card
      >
      <CardHeader title="Departamento de CTI UHO"
            sx={{ flexGrow: 1, py: 3 }} />
            <Divider />
        <CardContent sx={{ py: 3 }}>
        <Box sx={{display: "flex", alignItems: "center"}}>
        <MailIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              ctideph@uho.edu.cu
            </Typography>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
        <GitHubIcon fontSize="small" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              https://github.com/CTIUHO
            </Typography>
        </Box>
        </CardContent>
      </Card>
          </Grid>
          
          <Grid
            item
            xs={12}>
                  <Card
      >
      <CardHeader title="Hecho con"
            sx={{ flexGrow: 1, py: 3 }} />
            <Divider />
        <CardContent sx={{ py: 3 }}>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: 'space-between'}}>
        <Box sx={{display: "flex"}}>
        <NextJSIcon fontSize="medium" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              NextJS
            </Typography>
        </Box>
        <Box sx={{display: "flex"}}>
        <MaterialIcon fontSize="medium" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              MaterialUI
            </Typography>
        </Box>
        <Box sx={{display: "flex"}}>
        <ReactIcon fontSize="medium" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              React
            </Typography>
        </Box>
        <Box sx={{display: "flex"}}>
        <PythonIcon fontSize="medium" />
        <Typography
             sx={{ml: 1}}
              variant="subtitle1"
            >
              Django Rest Framework
            </Typography>
        </Box>
        </Box>
        </CardContent>
      </Card>
          </Grid>
          

      </Grid>
            </Box>
        </>
    );
};

About.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default About;
