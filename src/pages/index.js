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
import { fetchProjects } from '../utils/requests'
import { fetchMembers } from '../utils/requests';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [isloading, setloading] = useState(true);
  const [members, setMembers] = useState();
  const [projects, setProjects] = useState();

    useEffect(() => {
    loadData(0);
  }, []);

  function loadData(type) {
    setloading(true);
    fetchProjects("all")
      .then((data) => {
        setProjects(data);
        fetchMembers()
          .then((data) => {
          setMembers(data);
          setloading(false)
        })
      });
  }

 if (isloading) return <p>cargando....</p>

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
               <ProjectsByTypology
                 projects={projects}
                 sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              xs={6}
            >
               <MemberAmount members={members}/>
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
