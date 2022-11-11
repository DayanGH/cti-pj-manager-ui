import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DocumentGrid } from '../components/documents/document-grid';
import { Toolbar } from '../components/toolbar';
import { NewSDocumentDialog } from '../components/documents/new-simple-doc-dialog';
import { useTargetAction } from "../utils/hooks";
import { useEffect, useState } from 'react';
import { fetchSimpleDocuments } from '../utils/requests';
import { DeleteDocumentsDialog } from 'src/components/documents/dialog-delete-documents';

const Documentation = () => {
    const [action, target, handleAction] = useTargetAction();
    const [documents, setDocuments] = useState();
    const [isloading, setloading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadData();
        if (typeof window !== 'undefined') {
            let g = localStorage.getItem('groups')
            setGroups(g)
        }
    }, []);

    function loadData() {
        setloading(true);
        fetchSimpleDocuments()
            .then((data) => {
                setDocuments(data);
                setloading(false)
            }).catch((error) => {
                console.log(error)
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
                    flexGrow: 1,
                    p: 1
                }}
            >
                <Toolbar title="Documentos"
                    editable={groups.includes('admin')}
                    handleAction={handleAction}
                    action="new_document" />
                {["new_document", "edit_document"].includes(action) && (
                    <NewSDocumentDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        loadData={() => loadData()}
                    />)}
                {["delete_simple_doc", "delete_project_doc", 'delete_project_doc_group', 'delete_program_doc'].includes(action) && (
                    <DeleteDocumentsDialog
                        open
                        instance={target}
                        onAction={action}
                        handleClose={handleAction}
                        loadData={() => loadData()}
                    />)}
                <Box sx={{ p: 1 }}>
                    <DocumentGrid
                        editable={groups.includes('admin')}
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
