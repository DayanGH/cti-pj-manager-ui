import Head from 'next/head';
import React from "react";
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { MemberAmount } from '../components/dashboard/member-amount';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { ProjectsByTypology } from '../components/dashboard/projects-by-typology';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => {

  /*   function useAuthentication() {
      const router = useRouter();

      useEffect(() => {
        if (loginState.status != 200) {
          router.push('/');
        }
      }, []);
    }
    useAuthentication(); */
  return (
    <>
      <Head>
        <title>
          Inicio | GePCTI
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
            >
               <ProjectsByTypology sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              xs={6}
            >
               <MemberAmount />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
