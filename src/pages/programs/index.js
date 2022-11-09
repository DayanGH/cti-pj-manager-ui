import Head from 'next/head';
import { Box, Container, Tab, Tabs, TabPanel } from '@mui/material';
import { ProgramList } from '../../components/programs/program-list';
import { ProgramsToolbar } from '../../components/programs/programs-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { fetchPrograms } from '../../utils/requests'
import { plp } from 'src/utils/requests';

function Programs() {
  const [programs, setPrograms] = useState();
  const [isloading, setloading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadData(0);
  }, []);

  function loadData(type) {
    setloading(true);
    fetchPrograms(type === 0 ? "nac" : type === 1 ? "sec" : "ter")
      .then((data) => {
        setPrograms(data);
        setloading(false)
      }).catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          plp()
        }
      });
  }
  if (isloading) return <p>loading....</p>

  return (
    <>
      <Head>
        <title>
          Programas
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
          <ProgramsToolbar setQuery={setQuery} setPrograms={setPrograms}
            activeTab={activeTab}
            setActiveTab={setActiveTab} />
          <Box sx={{ mt: 3 }}>
            <ProgramList query={query} programs={programs || []} />
          </Box>
        </Container>
      </Box>
    </>

  );

};

Programs.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Programs;
