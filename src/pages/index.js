import Head from 'next/head';
import React from "react";
import { Box, Container, Grid, Snackbar } from '@mui/material';
import { MemberAmount } from '../components/dashboard/member-amount';
import { Budget } from '../components/dashboard/budget';
import { ProjectStats } from '../components/dashboard/project-stats';
import { DashboardLayout } from '../components/dashboard-layout';
import { fetchMembers, fetchProjects, fetchProjectsIsViced, fetchUsers } from '../utils/requests';
import { useEffect, useState } from 'react';
import { useTargetAction } from "../utils/hooks";
import { plp } from 'src/utils/requests';

const Dashboard = () => {
  const [isloading, setloading] = useState(true);
  const [members, setMembers] = useState();
  const [sectorsData, setSectorsData] = useState([]);
  const [entitiesData, setEntitiesData] = useState([]);
  const [typologyData, setTypologyData] = useState([])
  const [budget, setBudget] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [action, target, handleAction] = useTargetAction();
  const [snackOpen, setSnackOpen] = useState(false)

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    let f = '';
    if (typeof window !== 'undefined') {
      f = localStorage.getItem('faculty')
    }
    let d = [0, 0, 0, 0]
    let request = f === '' ? fetchProjects("all") : fetchProjectsIsViced("all", f);

    request
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

        let entities = [
          { amount: 0, value: 'FACCEA' },
          { amount: 0, value: 'FACCSO' },
          { amount: 0, value: 'FACHUM' },
          { amount: 0, value: 'FACIM' },
          { amount: 0, value: 'FACING' },
          { amount: 0, value: 'FEMS' },
          { amount: 0, value: 'FACEIPA' },
          { amount: 0, value: 'FACCUF' },]

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

          entities.forEach(entity => {
            if (project.main_entity.includes(entity.value))
              entity.amount++;
          })

          if (project.status === 1)
            n++

          m += parseInt(project.financing)
        })
        setTypologyData(d)
        setSectorsData(sectors)
        setEntitiesData(entities)
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
                entitiesData={entitiesData}
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
