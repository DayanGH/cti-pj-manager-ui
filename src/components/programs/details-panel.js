import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { AdminMembers } from '../dialog-admin-members';
import { PopupMenu } from '../popup-menu';

export const DetailsPanel = ({ pdetails, handleAction, action, loadData }) => {
    console.log(pdetails)
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
                </TableBody>
            </Table>
        </Box>
    );
};
