import { Box, Typography, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { PopupMenu } from '../popup-menu';
import { MailIcon } from 'src/icons/mail';
import { sendMail } from 'src/utils/requests';
export const DetailsPanel = ({ programDetails, handleAction }) => {
    console.log(programDetails)
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
                    {programDetails.name}
                </Typography>
                <PopupMenu
                    onAction={'program'}
                    handleAction={handleAction}
                    instance={programDetails}
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
                            {programDetails.chief_name}
                            <IconButton
                                size="small"
                                onClick={() => sendMail(programDetails.chief_email)}
                            >
                                <MailIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Secretario: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.secretary}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Tipo: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.type}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Sectores estrategicos: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.strategics_sectors}
                        </TableCell>
                    </TableRow>
                    <TableRow
                    >
                        <TableCell>
                            <b>Entidad principal: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.main_entity}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Enidades: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.entities}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Proyectos asociados: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.pj_amount}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Plazo: </b>
                        </TableCell>
                        <TableCell>
                            {programDetails.start_date} hasta {programDetails.end_date}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <b>Finaciamiento: </b>
                        </TableCell>
                        <TableCell>
                            ${programDetails.money}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};
