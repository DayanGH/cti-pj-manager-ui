import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { UserList } from '../components/users/user-list';
import { Toolbar } from '../components/toolbar';
import { useTargetAction } from "../utils/hooks";
import { fetchUsers } from '../utils/requests';
import { useEffect, useState } from 'react';
import { NewUserDialog } from '../components/users/dialog-new-user';

const Users = () => {
  const [action, target, handleAction] = useTargetAction();
  const [users, setUsers] = useState();
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setloading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setloading(false)
      });

  }
  if (isloading) return <p>cargando....</p>
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
          p: 1
        }}
      >
        <Toolbar title="Usuarios"
          handleAction={handleAction}
          action="new_user" />

        {["new_user", "edit_user", "get_user"].includes(action) && (
          <NewUserDialog
            open
            onAction={action}
            handleClose={handleAction}
            loadData={() => loadData()}
            instance={target}
          />)}
        <UserList users={users}
          handleAction={handleAction}
          action="get_user" />
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
