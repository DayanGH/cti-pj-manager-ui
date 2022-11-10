import { useState, Fragment } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, Collapse, TableContainer, IconButton } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { ExpandIcon } from 'src/icons/expand';
import { CollapseIcon } from 'src/icons/collapse';
import { DocumentIcon } from 'src/icons/document';
import { downloadDocument } from 'src/utils/requests';

export const DocumentList = ({ documents, groups, handleAction, source, editable }) => {
    console.log(editable)

    const DocumentRow = ({ document, action }) => {
        return (
            <TableRow
                hover
                sx={{ display: 'flex' }}
                key={document.id}
            >
                <TableCell sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexGrow: 1
                        }}
                    >
                        <DocumentIcon
                            sx={{ color: "secondary.main" }}
                            fontSize="large" />
                        <Typography
                            onClick={() => downloadDocument(document.path + document.id, document.file.split("/").pop())}
                            sx={{ mx: 1 }}
                            color="textPrimary"
                            variant="body1"
                        >
                            {document.d_name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell sx={{ px: 0, display: editable ? "" : "none" }}>
                    <PopupMenu
                        onAction={action}
                        handleAction={handleAction}
                        instance={document.id}
                    ></PopupMenu>
                </TableCell>
            </TableRow>
        );
    };

    const GroupRow = ({ group }) => {
        const [groupOpen, setGroupOpen] = useState(false);
        return (
            <Fragment>
                <TableRow
                    hover
                    key={group.id}
                    onClick={() => setGroupOpen(!groupOpen)}
                >
                    <TableCell>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <DocumentIcon
                                sx={{ color: "secondary.main" }}
                                fontSize="large" />
                            <Typography
                                sx={{ mx: 1 }}
                                color="textPrimary"
                                variant="body1"
                            >
                                {group.d_name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row"
                            size="small">
                            {groupOpen ? <CollapseIcon /> : <ExpandIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ py: 0 }}>
                        <Collapse in={groupOpen}
                            timeout="auto"
                            unmountOnExit>
                            <Table>
                                <TableBody >
                                    {group.documents?.slice(0, group.documents?.length).map((document) => (
                                        <DocumentRow key={document.id}
                                            document={document}
                                            action={source === 'projects' ? 'group_document' : 'program_group_document'} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    };

    const GroupsTable = () => {
        return (
            <Table>
                <TableBody>
                    {groups.slice(0, groups.length).map((group) => (
                        <GroupRow key={group.id}
                            group={group} />
                    ))}
                </TableBody>
            </Table>
        );
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table>
                    <TableHead></TableHead>
                    <TableBody>
                        {documents.slice(0, documents.length).map((document) => (
                            <DocumentRow key={document.id}
                                document={document}
                                action={source === 'projects' ? 'project_document' : 'program_document'} />
                        ))}
                    </TableBody>
                </Table>
                {typeof groups !== "undefined" ? <GroupsTable /> : <Box />}
            </TableContainer>
        </Paper>
    );
};
