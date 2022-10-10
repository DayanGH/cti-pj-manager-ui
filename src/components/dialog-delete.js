import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteDocument, deleteProject } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';
import router from "next/router";


export const DeleteDialog = (props) => {
    const [errors, setErrors] = useData({});


    function handleSubmit(id) {
        const func = props.onAction === 'delete_project' ? deleteProject : deleteDocument;
        func(id)
            .then((response) => {
                props.onClose();
                if (props.onAction === 'delete_project') {
                    router.push('/projects')
                } else {
                    props.loadData()
                }


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
            <DialogTitle> {props.onAction === 'delete_project' ? 'Eliminar proyecto' : 'Eliminar documento'}</DialogTitle>
            {props.onAction === 'delete_project' ?
                <DialogContent>
                    Al eliminar el proyecto{" "}
                    <u><i>{props.instance.name}</i></u>
                    <b> se eliminarán todos los datos asociados.Esta acción no puede deshacerse.</b>
                    <br />
                    <br />
                    ¿Está seguro de que desea eliminarlo?
                </DialogContent> :
                <DialogContent>¿Está seguro de que desea eliminar el documento de forma
                    <b> permanente</b>?
                </DialogContent>
            }

            <DialogActions>
                <Button color="primary"
                    onClick={props.onAction === 'delete_project' ? () => handleSubmit(props.instance.id) : () => handleSubmit(props.instance)}>
                    Eliminar
                </Button>
                <Button color="error"
                    onClick={() => props.onClose()}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
