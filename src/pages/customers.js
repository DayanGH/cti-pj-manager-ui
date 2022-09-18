import Head from 'next/head';
import { Box, Container, Tab, Tabs, TabPanel } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { projects } from '../__mocks__/projects';

const Customers = () => (
  <>
    <Head>
      <title>
        Projects
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
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults projects={projects} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
