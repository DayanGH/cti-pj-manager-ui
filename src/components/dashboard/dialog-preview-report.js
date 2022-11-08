import { Dialog, Button, Box, DialogTitle, Container, Typography, Grid} from '@mui/material';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MemberAmount } from 'src/components/dashboard/member-amount';
import { Budget } from 'src/components/dashboard/budget';
import { ProjectsByTypology } from 'src/components/dashboard/projects-by-typology';


export const PreviewReportDialog = ({ open, handleClose, onAction, typologyData, sectorsData, members, budget }) => {

  const generateReport = () => {

  };

  const htmlToPDF = (id) => {
    const input = document.getElementById(id);
    console.log(input)
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("report.pdf");  
    });
  ;
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
     

    >
      <DialogTitle>Reporte</DialogTitle>
      <Box
        id="reportv"
         minWidth="700"
        sx={{ px: 2, mx: 1, display: "flex", flexDirection: "column" }}
      >
      <Typography>
      An example heading text to test the library functionality. Wich is... to say the least ... limited. This does not seem like a viable solution
      </Typography>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <ProjectsByTypology
                sectorsData={sectorsData}
                typologyData={typologyData}
                sx={{ height: '100%' }} />
                
            </Grid>
            <Grid
                  item
                  xs={12}
                >
                  <Budget budget={budget} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <MemberAmount members={members} />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <MemberAmount members={members} />
                </Grid>
            </Grid>
         </Container>
        <Box
          sx={{ pt: 2, display: "flex", justifyContent: "right" }}
        >
          <Button
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => htmlToPDF("reportv")}
          >
            Exportar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

};
