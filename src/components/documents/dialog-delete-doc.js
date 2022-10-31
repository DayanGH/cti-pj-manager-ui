import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteDocument, deleteGroupDocuments } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';


export const DeleteDocumentDialog = (props) => {
    const [errors, setErrors] = useData({});


    function handleSubmit(id) {
        const func = props.onAction === 'delete_project' ? deleteProject : props.onAction === 'delete_project_doc' ? deleteDocument : deleteGroupDocuments;
        func(id)
            .then((response) => {
                props.onClose();
                props.loadData()
            })
            .catch((error) => {
                setErrors(error.response.data);
            });
    }

    return (
        <Dialog
            onClose={props.onClose}
            open={props.open}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Eliminar documento</DialogTitle>

            <DialogContent>¿Está seguro de que desea eliminar el documento de forma
                    <b> permanente</b>?
           </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => props.onClose()}>
                    Cancelar
                </Button>
                <Button color="error"
                    onClick={props.onAction === 'delete_project' ? () => handleSubmit(props.instance.id) : () => handleSubmit(props.instance)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
