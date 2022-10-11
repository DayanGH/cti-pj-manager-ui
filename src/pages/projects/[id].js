import Head from 'next/head';
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Collapse, TableContainer } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { NewDocumentDialog } from '../../components/dialog-new-doc';
import { AddIcon } from '../../icons/add';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProjectsDetails } from '../../utils/requests'
import { DeleteDialog } from '../../components/dialog-delete';
import { DocumentList } from '../../components/documents/document-list';
import { useTargetAction } from "../../utils/hooks";
import { NewProjectDialog } from 'src/components/dialog-new-project';
import { PopupMenu } from 'src/components/popup-menu';

const ProjectDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pdetails, setPdetails] = useState();
    const [isloading, setloading] = useState(true);
    const [action, target, handleAction] = useTargetAction();

    useEffect(() => {
        loadData(id);
    }, [id]);

    function loadData(id) {
        if (typeof id !== "undefined") {
            setloading(true);
            fetchProjectsDetails(id)
                .then((data) => {
                    setPdetails(data);
                    setloading(false)
                });
        }
    }
    if (isloading) return <p>loading....</p>
    return (
        <>
            <Head>
                <title>
                    Proyecto |{" " + pdetails.name}
                </title>
            </Head>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                {["delete_project", "delete_project_doc"].includes(action) && (
                    <DeleteDialog
                        onAction={action}
                        open
                        instance={target}
                        project_id={id}
                        onClose={handleAction}
                        loadData={() => loadData(id)}
                    />
                )}
                {["new", "edit"].includes(action) && (
                    <NewProjectDialog
                        open
                        onAction={action}
                        instance={pdetails}
                        onClose={handleAction}
                        loadData={() => loadData(id)} />
                )}
                {["new_document", "edit_document"].includes(action) && (
                    <NewDocumentDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        pj_id={pdetails.id}
                        loadData={() => loadData(id)}
                    />)}
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
                            onClick={() => handleAction("new_document")}
                        >
                            Nuevo
                        </Button>
                    </Box>
                    <Box sx={{ p: 1}}>
                        <DocumentList
                            handleAction={handleAction}
                            documents={pdetails.documents}
                            groups={pdetails.document_groups}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 1,
                        minWidth: "30%",
                        maxWidth: "35%",
                        borderLeft: 1,
                        borderColor: 'divider'
                    }}
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
                            {pdetails.name}
                        </Typography>
                        <PopupMenu
                            onAction={'project'}
                            handleAction={handleAction}
                            instance={pdetails}
                        ></PopupMenu>
                    </Box>
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
                                    {pdetails.type}
                                </TableCell>
                            </TableRow>
                            <TableRow
                            >
                                <TableCell>
                                    <b>Clasificación: </b>
                                </TableCell>
                                <TableCell>
                                    {pdetails.classification}
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
