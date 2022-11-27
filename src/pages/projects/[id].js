import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { NewDocumentDialog } from '../../components/projects/dialog-new-doc';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { editProject, fetchProjectsDetails } from '../../utils/requests';
import { DeleteDialog } from '../../components/projects/dialog-delete-projects';
import { DocumentList } from '../../components/documents/document-list';
import { Toolbar } from '../../components/toolbar';
import { useTargetAction } from "../../utils/hooks";
import { NewProjectDialog } from 'src/components/projects/dialog-new-project';
import { DetailsPanel } from 'src/components/projects/details-panel';
import { DeleteDocumentsDialog } from 'src/components/documents/dialog-delete-documents';

const ProjectDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pdetails, setPdetails] = useState();
    const [isloading, setloading] = useState(true);
    const [action, target, handleAction] = useTargetAction();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadData(id);
        if (typeof window !== 'undefined') {
            let g = localStorage.getItem('groups')
            setGroups(g)
        }
    }, [id]);
    function loadData(id) {
        if (typeof id !== "undefined") {
            setloading(true);
            fetchProjectsDetails(id)
                .then((data) => {
                    setPdetails(data);
                    data.status = 0
                    //editProject(data).then((data) => { }).catch((e) => { })
                    console.log(data.status)
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
                {["delete_simple_doc", "delete_project_doc", 'delete_project_doc_group', 'delete_program_doc', 'delete_program_doc_group'].includes(action) && (
                    <DeleteDocumentsDialog
                        open
                        instance={target}
                        onAction={action}
                        handleClose={handleAction}
                        loadData={() => loadData(id)}
                    />)}
                {["delete_project"].includes(action) && (
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
                {["new_document"].includes(action) && (
                    <NewDocumentDialog
                        groupss={groups}
                        open
                        onAction={action}
                        handleClose={handleAction}
                        pj_id={pdetails.id}
                        loadData={() => loadData(id)}
                    />)}
                <Box
                    sx={{ m: 1, flexGrow: 1 }}
                >
                    <Toolbar
                        title="Documentos"
                        editable={groups.includes('admin') || groups.includes('project_chiefs') || groups.includes('economy')}
                        handleAction={handleAction}
                        action="new_document" />
                    <Box sx={{ p: 1 }}>
                        <DocumentList
                            editable={groups.includes('admin')}
                            source={'projects'}
                            handleAction={handleAction}
                            documents={pdetails.documents}
                            groups={pdetails.document_groups}
                        />
                    </Box>
                </Box>
                <DetailsPanel pdetails={pdetails}
                    handleAction={handleAction}
                    editable={groups.includes('admin')}
                    manageable={groups.includes('admin') || groups.includes('project_chiefs')}
                    action={action}
                    loadData={() => loadData(id)} />
            </Box>
        </>)
};

ProjectDetails.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ProjectDetails;
