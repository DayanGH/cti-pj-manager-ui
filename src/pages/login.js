import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useData } from "../utils/hooks";
import { useLoginContext } from '../utils/auth'
import { createToken } from '../utils/requests'
import axios from '../utils/axios';

const Login = () => {
  const [state, setState] = useData({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const { setLoginState } = useLoginContext();
  const router = useRouter();

  const handleChange = (field, value) => {
    setState({ [field]: value });
    formik.setFieldValue(field, value)

  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required(
          'Este campo es requerido'),
      password: Yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required(
          'Este campo es requerido')
    }),
    onSubmit: async (event) => {
      event.preventDefault;
      setState({ username: formik.values.username, password: formik.values.password })
      const responseToken = await createToken(state);
      if (responseToken.status == 200) {
        router.push('/');
        setLoggedIn(true);
        setLoginState({ status: 200 });
        localStorage.setItem("access_token", responseToken.data.access);
        localStorage.setItem("refresh_token", responseToken.data.refresh);
        localStorage.setItem("user", JSON.stringify(responseToken.data.user));
        localStorage.setItem("email", JSON.stringify(responseToken.data.email));
        localStorage.setItem("groups", JSON.stringify(responseToken.data.groups));
        localStorage.setItem("user_id", responseToken.data.user_id);
        localStorage.setItem("faculty", responseToken.data.faculty);
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${responseToken.data.access}`;

      } else if (responseToken.status == 401) {
        formik.setFieldError('username', 'No hay ninguna cuenta asociada con estos credenciales');
        formik.setFieldError('password', 'No hay ninguna cuenta asociada con estos credenciales')
      }

    }
  });

  return (
    <>
      <Head>
        <title>Inicio de Sesión | GePCTI</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3, alignItems: "center" }}>
              <Typography
                color="secondary.main"
                variant="h4"
                align='center'
              >
                GePCTI
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
              onChange={(e) => handleChange("username", e.target.value)}
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
              onChange={(e) => handleChange("password", e.target.value)}
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
