import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { MemberList } from '../components/members/member-list';
import { Toolbar } from '../components/toolbar';
import { useTargetAction } from "../utils/hooks";
import { fetchMembers } from '../utils/requests';
import { NewMemberDialog } from '../components/members/dialog-new-member';
import { useEffect, useState } from 'react';

const Members = () => {
  const [action, target, handleAction] = useTargetAction();
  const [members, setMembers] = useState();
  const [isloading, setloading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setloading(true);
    fetchMembers()
      .then((data) => {
        setMembers(data);
        setloading(false)
      });

  }
  if (isloading) return <p>cargando....</p>
  return (
    <>
      <Head>
        <title>
          Miembros
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1
        }}
      >
        <Toolbar title="Miembros"
          handleAction={handleAction}
          action="new_member" />
        {["new_member", "edit_member", "get_member"].includes(action) && (
          <NewMemberDialog
            open
            onAction={action}
            handleClose={handleAction}
            loadData={() => loadData()}
            instance={target}
          />)}
        <MemberList members={members}
          handleAction={handleAction}
          action="get_member" />
      </Box>
    </>
  );
};

Members.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Members;
