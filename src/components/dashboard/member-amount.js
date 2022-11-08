import { Box, Card, CardContent, CardHeader, Divider, Table, TableBody, TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyIcon } from "../../icons/copy"

export const MemberAmount = ({ members }) => {

  const [int, setInt] = useState(0);
  const [out, setOut] = useState(0);
  const [stu, setStu] = useState(0);
  const [aso, setAso] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    let i = 0, o = 0, s = 0;
    members.forEach(member => {

      if (member.m_type == "in")
        i++;
      else if (member.m_type == "out")
        o++;
      else if (member.m_type == "stdnt")
        s++;

    })
    setInt(i)
    setOut(o)
    setStu(s)
    setTotal(i + o + s)

  }

  return (
    <Card
    >
      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
        <CardHeader
          title="Miembros"
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title="Copiar">

          <IconButton
            size="small"
            onClick={() => navigator.clipboard.writeText("Internos: " + int + " Estudiantes: " + stu + " Externos: " + out)}
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <CardContent>
        <Table id="membersc">
          <TableBody>

            <TableRow
            >
              <TableCell>
                <b>Internos: </b>
              </TableCell>
              <TableCell>
                {int}
              </TableCell>
            </TableRow>
            <TableRow
            >
              <TableCell>
                <b>Externos: </b>
              </TableCell>
              <TableCell>
                {out}
              </TableCell>
            </TableRow>
            <TableRow
            >
              <TableCell>
                <b>Estudiantes: </b>
              </TableCell>
              <TableCell>
                {stu}
              </TableCell>
            </TableRow>
            <TableRow
            >
              <TableCell>
                <b>Total: </b>
              </TableCell>
              <TableCell>
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
