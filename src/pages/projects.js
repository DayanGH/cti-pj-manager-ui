import Head from 'next/head';
import { Box, Container, Tab, Tabs, TabPanel } from '@mui/material';
import { ProjectsListResults } from '../components/projects/projects-list-results';
import { ProjectsListToolbar } from '../components/projects/projects-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { projects } from '../__mocks__/projects';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../utils/requests';
import { useAsync } from "react-async";

function Projects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetchProjects().then((data) => {
      console.log(data)
      setProjects(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          Proyectos
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth={false}>
          <ProjectsListToolbar />
          <Box sx={{ mt: 3 }}>
            <ProjectsListResults projects={projects?.results || []} />
          </Box>
        </Container>
      </Box>
    </>
  );

};
Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
