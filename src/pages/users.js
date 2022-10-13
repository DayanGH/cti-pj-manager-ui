import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

const Users = () => {
  return (
  <>
    <Head>
      <title>
        Usuarios
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
    </Box>
  </>
  );
};

Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
