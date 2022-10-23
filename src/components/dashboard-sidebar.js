import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Avatar, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { PieChartIcon } from '../icons/pie-chart';
import { Cog as CogIcon } from '../icons/cog';
import { ProjectsIcon } from '../icons/projects';
import { ProgramsIcon } from '../icons/programs';
import { DocumentIcon } from '../icons/document';
import { InfoIcon } from '../icons/info';
import { LogoutIcon } from '../icons/logout';
import { Users as UsersIcon } from '../icons/users';
import { NavItem } from './nav-item';
import { getInitials } from '../utils/get-initials';

const items = [
  {
    href: '/',
    icon: (<PieChartIcon fontSize="small" />),
    title: 'Inicio'
  },
  {
    href: '/projects',
    icon: (<ProjectsIcon fontSize="small" />),
    title: 'Proyectos'
  },
  {
    href: '/programs',
    icon: (<ProgramsIcon fontSize="small" />),
    title: 'Programas'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuarios'
  },
    {
    href: '/members',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Miembros'
  },
  {
    href: '/documentation',
    icon: (<DocumentIcon fontSize="small" />),
    title: 'Documentación'
  },
  {
    href: '/register',
    icon: (<InfoIcon fontSize="small" />),
    title: 'Acerca de'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
      asignValues()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  function asignValues() {
    if (typeof window !== 'undefined' && localStorage.getItem("user") !== null && localStorage.getItem("email") !== null) {
      setUsername(JSON.parse(localStorage.getItem("user")).username)
      setEmail(JSON.parse(localStorage.getItem("email")).email)
    }
  }

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >

        <Box sx={{
          py: 1.3,
          px: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              bgcolor: '#9F9E9E'
            }}

          >
            {getInitials(username)}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography
              sx={{ mb: -0.2 }}
              variant="body1"
              fontWeight="bold"
            >
              {username}
            </Typography>
            <Typography
              variant="subtitle2"
            >
              {email}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: '#b8b8b8',
          }}
        />
        <Box sx={{
          flexGrow: 1,
          py: 1
        }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#b8b8b8' }} />
        <NavItem sx={{mt: 0.5}}
              key={''}
              icon={(<LogoutIcon fontSize="small" />)}
              href={''}
              title={'Cerrar sesion'}
            />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#C0C8B8',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#C0C8B8',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
