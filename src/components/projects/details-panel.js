import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { AdminMembers } from './dialog-admin-members';
import { PopupMenu } from '../popup-menu';
import { MailIcon } from 'src/icons/mail';
import { sendMail } from 'src/utils/requests';
export const DetailsPanel = ({ pdetails, handleAction, action, loadData }) => {
    return (
        <Box
            sx={{
                p: 1,
                minWidth: "30%",
                maxWidth: "35%",
                borderLeft: 1,
                borderColor: 'divider'
            }}
        >
            {["admin_new"].includes(action) && (
                <AdminMembers
                    open
                    onAction={action}
                    onClose={handleAction}
                    project={pdetails}
                    loadData={() => loadData()} />
            )}
            <Box
                sx={{
                    p: 1,
                    display: 'flex',
                    flexGrow: 1,
                    borderBottom: 1,
                    borderColor: 'divider',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    {pdetails.name}
                </Typography>
                <PopupMenu
                    onAction={'project'}
                    handleAction={handleAction}
                    instance={pdetails}
                ></PopupMenu>
            </Box>
            <Table>
                <TableBody>
                    <TableRow
                    >
                        <TableCell>
                            <b>Jefe: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.chief_name}
                            <IconButton
                                size="small"
                                onClick={() => sendMail(pdetails.chief_email)}
                            >
                                <MailIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ display: pdetails.program === null ? "none" : "" }}
                    >
                        <TableCell>
                            <b>Programa </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.program_name}
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ display: pdetails.notes.length < 1 ? "none" : "" }}
                    >
                        <TableCell>
                            <b>Notas </b>
                        </TableCell>
                        <TableCell>
                            <b>{pdetails.notes}</b>
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Tipo: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.type}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Sectores estrategicos: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.strategics_sectors}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Clasificación: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.classification}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Entidad principal: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.main_entity}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Enidades: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.entities}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Plazo: </b>
                        </TableCell>
                        <TableCell>
                            {pdetails.start_date} hasta {pdetails.end_date}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Finaciamiento: </b>
                        </TableCell>
                        <TableCell>
                            ${pdetails.financing}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Miembros: </b>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => handleAction("admin_new")}>
                                Administrar
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};
