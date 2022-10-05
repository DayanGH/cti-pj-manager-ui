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

export const ProjectsListResults = ({ projects, ...rest }) => {
  const [selectedProjectsIds, setSelectedProjectsIds] = useState([]);
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
                  Jefe
                </TableCell>
                <TableCell>
                  Clasificación
                </TableCell>
                <TableCell>
                  Revisión
                </TableCell>
                <TableCell>
                  Finalización
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.slice(page * limit, page * limit + limit).map((project) => (
                <TableRow
                  hover
                  key={project.id}
                  selected={selectedProjectsIds.indexOf(project.id) !== -1}
                >

                  <TableCell onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    {project.name}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={project.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(project.chief)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {project.chief}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {project.project_classification}
                  </TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {project.end_date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProjectsListResults.propTypes = {
  projects: PropTypes.array.isRequired
};
