import Head from 'next/head';
import { Box, Container, Tab, Tabs, TabPanel } from '@mui/material';
import { ProjectsListResults } from '../../components/projects/projects-list-results';
import { ProjectsListToolbar } from '../../components/projects/projects-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../../utils/requests'

function Projects() {
  const [projects, setProjects] = useState();
  const [isloading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  function loadData(type) {
    setloading(true);
    fetchProjects(type === 0 ? "paps" : type === 1 ? "papt" : type === 2 ? "papn" : "pnap")
      .then((data) => {
        setProjects(data);
        setloading(false)
        console.log(data)
      });
  }
  if (isloading) return <p>loading....</p>

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
          <ProjectsListToolbar loadData={() => loadData()}
            activeTab={activeTab}
            setActiveTab={setActiveTab} />
          <Box sx={{ mt: 3 }}>
            <ProjectsListResults projects={projects || []} />
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
