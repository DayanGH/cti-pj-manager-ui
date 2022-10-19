import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DocumentGrid } from '../components/documents/document-grid';
import { DocumentsToolbar } from '../components/documents/documents-toolbar';
import { NewSDocumentDialog } from '../components/documents/new-simple-doc-dialog';
import { useTargetAction } from "../utils/hooks";
import { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/requests';

const Documentation = () => {
    const [action, target, handleAction] = useTargetAction();
    const [documents, setDocuments] = useState();
    const [isloading, setloading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        setloading(true);
        fetchDocuments()
            .then((data) => {
                setDocuments(data);
                setloading(false)
            });

    }
    if (isloading) return <p>cargando....</p>

    return (
        <>
            <Head>
                <title>
                    Documentación
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1
                }}
            >
                <DocumentsToolbar handleAction={handleAction} />
                  {["new_document", "edit_document"].includes(action) && (
                    <NewSDocumentDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        loadData={() => loadData()}
                    />)}
                <Box sx={{ p: 1 }}>
                    <DocumentGrid
                        handleAction={handleAction}
                        documents={documents}
                    />
                </Box>
            </Box>
        </>
    );
};

Documentation.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Documentation;
