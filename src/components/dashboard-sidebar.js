import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Inicio'
  },
  {
    href: '/projects',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Proyectos'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Programas'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Usuarios'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Ajustes de perfil'
  },
  {
    href: '/register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Acerca de'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

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
          py: 1,
          px: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* <img
            alt="UHO logo"
            src="/static/images/uho_logo.webp"
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              width: 32,
              height: 32
            }}
          /> */}
          <Box sx={{ ml: 1 }}>
            <Typography
              sx={{ color: 'secondary.main', mb: -1 }}
              variant="h5"
            >
              GePCTI
            </Typography>
            <small>Gestion de programas y proyectos CTI</small>
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
        <Divider sx={{ borderColor: '#2D3748' }} />

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
