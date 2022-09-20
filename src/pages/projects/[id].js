import Head from 'next/head';
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Icon } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { AddIcon } from '../../icons/add';
import { ContextMenuIcon } from '../../icons/context-menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProjectsDetails } from '../../utils/requests'

const documents = [
    {
        id: '1',
        name: 'Perfil'
    },
    {
        id: '2',
        name: 'Resolución de nombramiento del jefe de proyecto'
    },
    {
        id: '3',
        name: 'Compatibilización con los intereses de la Defensa'
    },
    {
        id: '4',
        name: 'Resolución oficial de aprobación del proyecto'
    },
    {
        id: '5',
        name: 'Dictamen de aprobación del proyecto por el CCA'
    },
    {
        id: '6',
        name: 'Fotos escaneadas del carné de identidad de los investigadores'
    },
    {
        id: '7',
        name: 'Desglose del presupuesto del año en curso'
    },
    {
        id: '8',
        name: 'Informe científico técnico'
    },
    {
        id: '9',
        name: 'Anexo 8. Certifico para el pago de los investigadores externos'
    },
    {
        id: '10',
        name: 'Resolución de nombramiento del jefe de proyecto'
    }
]

const ProjectDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pdetails, setPdetails] = useState();
    const [isloading, setloading] = useState(true);

    useEffect(() => {
        if (typeof id !== "undefined") {
            setloading(true);
            fetchProjectsDetails(id)
                .then((data) => {
                    setPdetails(data);
                    setloading(false)
                });
        }
    }, [id]);
    if (isloading) return <p>loading....</p>
    return (
        <>
            <Head>
                <title>
                    Proyecto|{pdetails.name}
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                <Box
                    sx={{ m: 1, flexGrow: 1 }}
                >
                    <Box
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexGrow: 1,
                            borderBottom: 1,
                            borderColor: 'divider',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            color="textPrimary"
                            variant="h6"
                        >
                            Documentos
                        </Typography>
                        <Button
                            startIcon={(<AddIcon fontSize="small" />)}
                            color="primary"
                            variant="contained"
                        >
                            Nuevo
                        </Button>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <PerfectScrollbar>
                            <Table>
                                <TableBody>
                                    {documents.slice(0, 10).map((document) => (
                                        <TableRow
                                            hover
                                            key={document.id}
                                        >
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <img
                                                        alt="Icon of a document"
                                                        src="/static/images/document.svg"
                                                        style={{
                                                            display: 'inline-block',
                                                            maxWidth: '100%',
                                                            width: 40,
                                                            height: 40
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{ mx: 1 }}
                                                        color="textPrimary"
                                                        variant="body1"
                                                    >
                                                        {document.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <ContextMenuIcon />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </PerfectScrollbar>
                    </Box>
                </Box>
                <Box
                    sx={{
                        my: 1,
                        p: 1,
                        minWidth: "30%",
                        maxWidth: "35%",
                        borderLeft: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Table>
                        <TableBody>
                            <TableRow
                            >
                                <TableCell>
                                    <b>Jefe: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.chief}
                                </TableCell>
                            </TableRow>
                            <TableRow
                            >
                                <TableCell>
                                    <b>Tipo: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.pj_type}
                                </TableCell>
                            </TableRow>
                            <TableRow
                            >
                                <TableCell>
                                    <b>Clasificación: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.project_classification}
                                </TableCell>
                            </TableRow>
                            <TableRow
                            >
                                <TableCell>
                                    <b>Entidad principal: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.main_entity}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>Enidades: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.entities}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>Plazo: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.start_date} hasta {pdetails.end_date}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>Finaciamiento: </b>
                                </TableCell>
                                <TableCell>
                                    ${pdetails.financing}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>Miembros: </b>
                                </TableCell>
                                <TableCell>
                                    <Button>
                                        Administrar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>)
};

ProjectDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ProjectDetails;
