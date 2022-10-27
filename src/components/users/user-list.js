import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { UserEntry } from '../users/user-entry'
import { sendMail } from 'src/utils/requests';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

export const UserList = ({ users, handleAction, action, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Correo
                </TableCell>
                <TableCell>
                  Tipo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * limit, page * limit + limit).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell onClick={() => handleAction(action, user)}>
                    <UserEntry name={user.name} />
                  </TableCell>
                  <TableCell onClick={() => sendMail(user.email)}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};
