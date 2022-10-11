import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, Collapse, TableContainer } from '@mui/material';
import { PopupMenu } from '../popup-menu';

export const DocumentList = ({ documents, groups, handleAction }) => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {documents.slice(0, documents.length).map((document) => (
                        <TableRow
                            hover
                            key={document.id}
                        >
                            <TableCell>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <img
                                        alt="Icon of a document"
                                        src="/static/images/document.svg"
                                        style={{
                                            display: 'inline-block',
                                            maxWidth: '100%',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <Typography
                                        sx={{ mx: 1 }}
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {document.d_name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <PopupMenu
                                    onAction={'project_document'}
                                    handleAction={handleAction}
                                    instance={document.id}
                                ></PopupMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    {groups.slice(0, groups.length).map((group) => (
                        <TableRow
                            hover
                            key={group.id}
                        >
                            <TableCell>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <img
                                        alt="Icon of a document"
                                        src="/static/images/document.svg"
                                        style={{
                                            display: 'inline-block',
                                            maxWidth: '100%',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <Typography
                                        sx={{ mx: 1 }}
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {group.d_name}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
