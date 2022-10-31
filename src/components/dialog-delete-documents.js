import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteSimpleDocuments, deleteDocument, deleteGroupDocuments, deleteProgramDocument, deleteProgramGroupDocuments } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';


export const DeleteDocumentsDialog = ({ instance, onAction, handleClose, loadData, open }) => {
    const [errors, setErrors] = useData({});


    function handleSubmit(id) {
        console.log(id)
        const func = onAction === 'delete_simple_doc' ? deleteSimpleDocuments : onAction === 'delete_project_doc' ? deleteDocument : onAction === 'delete_project_doc_group' ? deleteGroupDocuments : onAction === 'delete_program_doc' ? deleteProgramDocument : deleteProgramGroupDocuments;
        func(id)
            .then((response) => {
                handleClose();
                loadData()
            })
            .catch((error) => {
                setErrors(error.response.data);
                console.log(error)
            });
    }
    console.log(instance)

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle> Eliminar documento</DialogTitle>

            <DialogContent>¿Está seguro de que desea eliminar el documento de forma
                <b> permanente</b>?
            </DialogContent>


            <DialogActions>
                <Button
                    onClick={() => handleClose()}>
                    Cancelar
                </Button>
                <Button color="error"
                    onClick={() => handleSubmit(instance)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
