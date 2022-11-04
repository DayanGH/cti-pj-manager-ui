import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { UserEntry } from '../users/user-entry'

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';
import router from 'next/router';
import { AlertIcon } from 'src/icons/status-alert';
import { OkIcon } from 'src/icons/status-ok';

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
                    <UserEntry name={project.chief}/>
                  </TableCell>
                  <TableCell>
                    {project.project_classification}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={project.notes.length < 1 ? "Sin notas" : project.notes}>
                      {project.notes.length < 1 ? <OkIcon fontSize="small" sx={{color: "green"}}/> : <AlertIcon fontSize="small" sx={{color: "red"}} /> }
                    </Tooltip>
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
