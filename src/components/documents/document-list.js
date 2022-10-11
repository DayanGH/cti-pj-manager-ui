import { useState, Fragment } from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, Collapse, TableContainer, IconButton } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { ExpandIcon } from 'src/icons/expand';
import { CollapseIcon } from 'src/icons/collapse';
import { DocumentIcon } from 'src/icons/document';
import { DocumentGroupIcon } from 'src/icons/document-group';

export const DocumentList = ({ documents, groups, handleAction }) => {

    const [grupOpen, setGroupOpen] = useState(false);

    const DocumentRow = ({ document }) => {

        return (
            <TableRow
                hover
                sx={{display: 'flex'}}
                key={document.id}
            >
                <TableCell sx={{flexGrow: 1}}>
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
                            sx={{ mx: 1 }}
                            color="textPrimary"
                            variant="body1"

                        >
                            {document.d_name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell sx={{px: 0}}>
                    <PopupMenu
                        onAction={'project_document'}
                        handleAction={handleAction}
                        instance={document.id}
                    ></PopupMenu>
                </TableCell>
            </TableRow>
        );
    };

    const GroupRow = ({ group }) => {
        return (
            <Fragment>
                <TableRow
                    hover
                    key={group.id}
                    onClick={() => setGroupOpen(!grupOpen)}
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
                        <IconButton aria-label="expand row" size="small">
                            {grupOpen ? <CollapseIcon /> : <ExpandIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{py: 0}}>
                    <Collapse in={grupOpen} timeout="auto" unmountOnExit>
                        <Table>
                            <TableBody >
                                {group.documents.slice(0, documents.length).map((document) => (
                                    <DocumentRow  document={document} />
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    };

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {documents.slice(0, documents.length).map((document) => (
                        <DocumentRow document={document} />
                    ))}
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    {groups.slice(0, groups.length).map((group) => (
                        <GroupRow group={group} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
