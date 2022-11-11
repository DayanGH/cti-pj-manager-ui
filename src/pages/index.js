import Head from 'next/head';
import React from "react";
import { Box, Container, Grid, Snackbar } from '@mui/material';
import { MemberAmount } from '../components/dashboard/member-amount';
import { Budget } from '../components/dashboard/budget';
import { ProjectStats } from '../components/dashboard/project-stats';
import { DashboardLayout } from '../components/dashboard-layout';
import { fetchMembers, fetchProjects, fetchUsers } from '../utils/requests';
import { useEffect, useState } from 'react';
import { useTargetAction } from "../utils/hooks";
import { plp } from 'src/utils/requests';

const Dashboard = () => {
  const [isloading, setloading] = useState(true);
  const [members, setMembers] = useState();
  const [sectorsData, setSectorsData] = useState([]);
  const [typologyData, setTypologyData] = useState([])
  const [budget, setBudget] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [action, target, handleAction] = useTargetAction();
  const [snackOpen, setSnackOpen] = useState(false)

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    let d = [0, 0, 0, 0]
    setloading(true);
    fetchProjects("all")
      .then((data) => {
        let m = 0, n = 0
        let sectors = [
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

        data.forEach(project => {
          if (project.pj_type == "papn")
            d[0]++;
          else if (project.pj_type == "papt")
            d[1]++;
          else if (project.pj_type == "paps")
            d[2]++;
          else if (project.pj_type.startsWith("pnap"))
            d[3]++;

          sectors.forEach(sector => {
            if (project.strategics_sectors.includes(sector.value))
              sector.amount++;
          })

          if (project.status === 1)
            n++

          m += parseInt(project.financing)
        })
        setTypologyData(d)
        setSectorsData(sectors)
        setBudget(m)
        setNotifications(n)
        fetchMembers()
          .then((data) => {
            setMembers(data);
            setloading(false)
          }).catch((error) => {
            console.log(error)
          });
      }).catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          plp()
        }
      });;


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
        id="dashboard"
        component="main"
        sx={{
          flexGrow: 1,
          p: 1
        }}
      >
        <Snackbar
          open={snackOpen}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          autoHideDuration={4000}
          message="Datos copiados"
        />
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={6}
            >
              <ProjectStats
                setSnackOpen={setSnackOpen}
                sectorsData={sectorsData}
                typologyData={typologyData}
                sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              xs={6}>
              <Grid
                container

                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Budget budget={budget} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <MemberAmount setSnackOpen={setSnackOpen}
                    members={members} />
                </Grid>

              </Grid>
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
