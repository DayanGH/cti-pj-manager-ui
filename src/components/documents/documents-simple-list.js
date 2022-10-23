import { useState, Fragment } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, Collapse, TableContainer, IconButton } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { ExpandIcon } from 'src/icons/expand';
import { CollapseIcon } from 'src/icons/collapse';
import { DocumentIcon } from 'src/icons/document';

export const SimpleDocumentList = ({ documents, handleAction }) => {


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
                            sx={{ mx: 1 }}
                            color="textPrimary"
                            variant="body1"

                        >
                            {document.name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell sx={{ px: 0 }}>
                    <PopupMenu
                        onAction={action}
                        handleAction={handleAction}
                        instance={document.id}
                    ></PopupMenu>
                </TableCell>
            </TableRow>
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
                                action={'project_document'} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
