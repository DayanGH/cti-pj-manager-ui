import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ProjectsListResults } from '../../components/projects/projects-list-results';
import { ProjectsListToolbar } from '../../components/projects/projects-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { fetchProjects, fetchProjectsIsViced } from '../../utils/requests'
import { plp } from 'src/utils/requests';

function Projects() {
  const [projects, setProjects] = useState();
  const [isloading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState([]);
  const [faculty, setFaculty] = useState('');

  useEffect(() => {
    loadData(0);
    if (typeof window !== 'undefined') {
      let g = localStorage.getItem('groups')
      setGroups(g)
    }
  }, []);

  function loadData(type) {
    if (typeof window !== 'undefined') {
      let f = localStorage.getItem('faculty')
      setFaculty(f)
    }
    if (f !== '') {
      fetchProjectsIsViced(type === 0 ? "papn" : type === 1 ? "paps" : type === 2 ? "papt" : "pnap", f)
        .then((data) => {
          setProjects(data);
          setloading(false)
        }).catch((error) => {
          console.log(error)
          if (error.response.status === 401) {
            plp()
          }
        });
    }
    else {
      fetchProjects(type === 0 ? "papn" : type === 1 ? "paps" : type === 2 ? "papt" : "pnap")
        .then((data) => {
          setProjects(data);
          setloading(false)
        }).catch((error) => {
          console.log(error)
          if (error.response.status === 401) {
            plp()
          }
        });
    }
    setloading(true);
  }
  if (isloading) return <p>cargando....</p>

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
          <ProjectsListToolbar setQuery={setQuery}
            setProjects={setProjects}
            editable={groups.includes('admin')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            group={groups}
            faculty={faculty} />
          <Box sx={{ mt: 3 }}>
            <ProjectsListResults query={query}
              projects={projects || []} />
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
