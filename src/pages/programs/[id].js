import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { NewDocumentDialog } from '../../components/projects/dialog-new-doc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProgramDetails } from '../../utils/requests';
import { DocumentList } from '../../components/documents/document-list';
import { Toolbar } from '../../components/toolbar';
import { useTargetAction } from "../../utils/hooks";
import { DetailsPanel } from 'src/components/programs/details-panel';
import { DeleteProgramsDialog } from 'src/components/programs/dialog-delete-programs';
import { NewProgramDialog } from 'src/components/programs/dialog-new-program';
import { DeleteDocumentsDialog } from 'src/components/documents/dialog-delete-documents';
import { NewProgramDocumentDialog } from 'src/components/programs/dialog-new-program-doc';

const ProgramDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [programDetails, setProgramDetails] = useState();
    const [isloading, setloading] = useState(true);
    const [action, target, handleAction] = useTargetAction();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadData(id);
        if (typeof window !== 'undefined'){
          let g = localStorage.getItem('groups')
          setGroups(g)
        }
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
                    Programa |{" " + programDetails.name}
                </title>
            </Head>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex'
                }}
            >
                {["delete_simple_doc", "delete_project_doc", 'delete_project_doc_group', 'delete_program_doc', 'delete_program_doc_group'].includes(action) && (
                    <DeleteDocumentsDialog
                        open
                        instance={target}
                        onAction={action}
                        handleClose={handleAction}
                        loadData={() => loadData(id)}
                    />)}
                {["delete_program"].includes(action) && (
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
                {["new_document"].includes(action) && (
                    <NewProgramDocumentDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        pj_id={programDetails.id}
                        loadData={() => loadData(id)}
                    />)}
                <Box
                    sx={{ m: 1, flexGrow: 1 }}
                >
                    <Toolbar title="Documentos"
                        editable={true}
                        handleAction={handleAction}
                        action="new_document" />
                    <Box sx={{ p: 1 }}>
                        <DocumentList
                            editable={groups.length < 3}
                            source={'programs'}
                            handleAction={handleAction}
                            documents={programDetails.documents}
                            groups={programDetails.document_groups}
                        />
                    </Box>
                </Box>
                <DetailsPanel programDetails={programDetails}
                    handleAction={handleAction}
                    editable={groups.length < 3}
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
