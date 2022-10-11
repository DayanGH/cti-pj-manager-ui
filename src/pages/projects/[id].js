import Head from 'next/head';
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { NewDocumentDialog } from '../../components/dialog-new-doc';
import { AddIcon } from '../../icons/add';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProjectsDetails } from '../../utils/requests'
import { DeleteDialog } from '../../components/dialog-delete';
import { DocumentList } from '../../components/documents/document-list';
import { useTargetAction } from "../../utils/hooks";
import { NewProjectDialog } from 'src/components/dialog-new-project';
import { PopupMenu } from 'src/components/popup-menu';
import { DetailsPanel } from 'src/components/projects/details-panel';

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
    if (isloading) return <p>cargando....</p>
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
                    <Box sx={{ p: 1 }}>
                        <DocumentList
                            handleAction={handleAction}
                            documents={pdetails.documents}
                            groups={pdetails.document_groups}
                        />
                    </Box>
                </Box>
                <DetailsPanel pdetails={pdetails} handleAction={handleAction}/>
            </Box>
        </>)
};

ProjectDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ProjectDetails;
