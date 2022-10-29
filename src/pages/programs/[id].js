import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { NewDocumentDialog } from '../../components/dialog-new-doc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProgramDetails } from '../../utils/requests';
import { DocumentList } from '../../components/documents/document-list';
import { DocumentsToolbar } from '../../components/documents/documents-toolbar';
import { useTargetAction } from "../../utils/hooks";
import { DetailsPanel } from 'src/components/programs/details-panel';
import { DeleteProgramsDialog } from 'src/components/programs/dialog-delete-programs';
import { NewProgramDialog } from 'src/components/programs/dialog-new-program';

const ProgramDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [programDetails, setProgramDetails] = useState();
    const [isloading, setloading] = useState(true);
    const [action, target, handleAction] = useTargetAction();

    useEffect(() => {
        loadData(id);
    }, [id]);

    function loadData(id) {
        if (typeof id !== "undefined") {
            setloading(true);
            fetchProgramDetails(id)
                .then((data) => {
                    setProgramDetails(data);
                    setloading(false)
                });
        }
    }
    if (isloading) return <p>cargando....</p>
    return (
        <>
            <Head>
                <title>
                    Proyecto |{" " + programDetails.name}
                </title>
            </Head>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                {["delete_program", "delete_program_doc", "delete_program_group_doc"].includes(action) && (
                    <DeleteProgramsDialog
                        onAction={action}
                        open
                        instance={target}
                        program_id={id}
                        onClose={handleAction}
                        loadData={() => loadData(id)}
                    />
                )}
                {["new", "edit"].includes(action) && (
                    <NewProgramDialog
                        open
                        onAction={action}
                        instance={programDetails}
                        onClose={handleAction}
                        loadData={() => loadData(id)} />
                )}
                {["new_document", "edit_document"].includes(action) && (
                    <NewDocumentDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        pj_id={programDetails.id}
                        loadData={() => loadData(id)}
                    />)}
                <Box
                    sx={{ m: 1, flexGrow: 1 }}
                >
                    <DocumentsToolbar handleAction={handleAction} />
                    <Box sx={{ p: 1 }}>
                        <DocumentList
                            handleAction={handleAction}
                            documents={programDetails.documents}
                            groups={programDetails.document_groups}
                        />
                    </Box>
                </Box>
                <DetailsPanel programDetails={programDetails}
                    handleAction={handleAction}
                    action={action}
                    loadData={() => loadData(id)} />
            </Box>
        </>)
};

ProgramDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ProgramDetails;
