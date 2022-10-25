import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import {CopyIcon} from "../../icons/copy"

export const MemberAmount = ({members}) => {

    const [int, setInt] = useState(0);
    const [out, setOut] = useState(0);
    const [stu, setStu] = useState(0);
    const [aso, setAso] = useState(0);

    useEffect(() => {
    loadData();
  }, []);

      function loadData(){
    let i= 0, o = 0, s = 0, a = 0;
    members.forEach( member => {

      if(member.m_type=="in")
        i++;
      else if(member.m_type=="out")
        o++;
      else if(member.m_type=="stdnt")
        s++;

      if(member.projects.length > 0)
        a++;
    } )
    setInt(i)
    setOut(o)
    setStu(s)
    setAso(a)
  }

  return (
    <Card>
    <Box sx={{display: "flex", alignItems: "center", mr: 1}}>
      <CardHeader
        title="Miembros"
        sx={{flexGrow: 1}}
      />
      <IconButton
          size="small"
          onClick={() => navigator.clipboard.writeText("Internos: " + int)}
          >
            <CopyIcon fontSize="small" />
      </IconButton>
      </Box>
      <Divider />
      <CardContent>
      <Table>
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
                            <b>Asociados a proyecto: </b>
                        </TableCell>
                        <TableCell>
                            {aso}
                        </TableCell>
                    </TableRow>
                    </TableBody>
                    </Table>
      </CardContent>
    </Card>
  );
};
