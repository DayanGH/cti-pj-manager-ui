import { Dialog, Button, Box, DialogTitle, Container, Typography, Grid} from '@mui/material';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MemberAmount } from 'src/components/dashboard/member-amount';
import { Budget } from 'src/components/dashboard/budget';
import { ProjectsByTypology } from 'src/components/dashboard/projects-by-typology';
import { ProjectsBySectors } from 'src/components/dashboard/projects-by-sector';


export const PreviewReportDialog = ({ open, handleClose, onAction, typologyData, sectorsData, members, budget }) => {

  const generateReport = () => {

  };

  const htmlToPDF = (id) => {
    const pdf = new jsPDF();
    pdf.text("An example heading text to test the library functionality. Wich is... to say the least ... limited. This does not seem like a viable solution", 10, 10, {maxWidth: "200"})
    html2canvas(document.getElementById("projectsc"))
    .then((canvas) => {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 40, 30, 120, 100);
    html2canvas(document.getElementById("sectorsb"))
    .then((canvas) => {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 40, 140, 120, 100);
    html2canvas(document.getElementById("membersc"))
    .then((canvas) => {
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 20, 10, 140, 100);
    html2canvas(document.getElementById("budgetc"))
    .then((canvas) => {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 20, 120, 140, 30);
       pdf.save("report.pdf");
    });
    });
    });
    });
      
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
              <ProjectsBySectors
                sectorsData={sectorsData}
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
