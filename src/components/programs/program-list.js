import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import router from 'next/router';

export const ProgramList = ({ programs, query, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const ProgramsTable = () => {
    const filteredPrograms = programs.filter( (program) => {
      if(query === "")
        return program;
      else
        return program.name.toLowerCase().includes(query);
    } );

    return (
      <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Jefe
                </TableCell>
                <TableCell>
                  Clasificación
                </TableCell>
                <TableCell>
                  Finalización
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPrograms.slice(page * limit, page * limit + limit).map((program) => (
                <TableRow
                  hover
                  key={program.id}
                >

                  <TableCell onClick={() => router.push(`/programs/${program.id}`)}
                  >
                    {program.name}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        sx={{ mr: 2 }}
                      >
                        {getInitials(program.chief)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {program.chief}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {program.classification}
                  </TableCell>
                  <TableCell>
                    {new Date() >= new Date(program.end_date) ? <b>{program.end_date}</b> : program.end_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
    );
  };

  return (
    <Card {...rest}>

      <ProgramsTable/>
      <TablePagination
        component="div"
        count={programs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProgramList.propTypes = {
  programs: PropTypes.array.isRequired
};
