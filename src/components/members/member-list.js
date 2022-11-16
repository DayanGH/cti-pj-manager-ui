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

export const MemberList = ({ members, handleAction, action, query }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const MembersList = () => {
    const filteredMembers = members.filter((member) => {
      if (query === "")
        return member;
      else
        return member.name.toLowerCase().includes(query);
    });

    return (
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
              {filteredMembers.slice(page * limit, page * limit + limit).map((member) => (
                <TableRow
                  hover
                  key={member.id}
                >
                  <TableCell onClick={() => handleAction(action, member)}>
                    <UserEntry name={member.name} />
                  </TableCell>
                  <TableCell onClick={() => sendMail(member.email)}>
                    {member.email}
                  </TableCell>
                  <TableCell>
                    {member.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
    );
  }
  return (
    <Card>
      <MembersList/>
      <TablePagination
        component="div"
        count={members.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MemberList.propTypes = {
  members: PropTypes.array.isRequired
};
