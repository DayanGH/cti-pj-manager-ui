import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { DocumentList } from '../components/documents/document-list';
import { DocumentsToolbar } from '../components/documents/documents-toolbar';
import { useTargetAction } from "../utils/hooks";
import { useEffect, useState } from 'react';
import { fetchDocuments } from '../utils/requests';

const Documentation = () => {
    const [action, target, handleAction] = useTargetAction();
    const [documents, setDocuments] = useState();
    const [isloading, setloading] = useState(true);

    useEffect(() => {
        loadData();
    });

    function loadData() {
        if (typeof id !== "undefined") {
            setloading(true);
            fetchDocuments()
                .then((data) => {
                    setDocuments(data);
                    setloading(false)
                });
        }
    }
    if (isloading) return <p>cargando....</p>

    return(
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
          <DocumentsToolbar handleAction={handleAction}/>
          <Box sx={{ p: 1 }}>
            <DocumentList
              handleAction={handleAction}
              documents={documents}
              groups={''}
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
