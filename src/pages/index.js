import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container,  TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: 'CTI',
      password: 'ctipj2022'
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required(
          'Este campo es requerido'),
      password: Yup
        .string()
        .min(8,'La contraseña debe tener al menos 8 caracteres')
        .required(
          'Este campo es requerido')
    }),
    onSubmit: () => {
      router.push('/dashboard');
    }
  });

  return (
    <>
      <Head>
        <title>Inicio de Sesión | CTIPM</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container 
        maxWidth="sm"
        align="center">
        <Avatar sx={{ m: 1, bgcolor: 'primary.main'}}>
            <LockOutlinedIcon />
        </Avatar>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3, alignItems:"center"}}>
              <Typography
                color="textPrimary"
                variant="h4"
                align='center'
              >
                Bienvenido
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
                align='center'
              >
                Inicio de sesión en la plataforma
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Usuario"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
