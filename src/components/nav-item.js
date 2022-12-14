import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title, OnClick, ...others } = props;
  const router = useRouter();

  const active = href ? (router.pathname === href || (router.pathname === '/projects/[id]' && href === "/projects") || (router.pathname === '/programs/[id]' && href === "/programs")) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          onClick={OnClick}
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && '#E8F0C8',
            borderRadius: 1,
            color: active ? 'primary.main' : '#2d2d2d',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'primary.main' : '#2d2d2d'
            },
            '&:hover': {
              backgroundColor: active ? '#E8F0C8' : 'rgba(255,255,255, 0.25)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
