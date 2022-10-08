import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteProject } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';
import router from "next/router";


export const DeleteProject = (props) => {
    const [errors, setErrors] = useData({});


    function handleSubmit() {
        deleteProject(props.project_id)
            .then((response) => {
                props.onClose();
                router.push('/projects')
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
            <DialogTitle>Eliminar proyecto</DialogTitle>
            <DialogContent>
                Al eliminar el proyecto{" "}
                <u><i>{props.instance.name}</i></u>
                <b> se eliminarán todos los datos asociados.Esta acción no puede deshacerse.</b>
                <br />
                <br />
                ¿Está seguro de que desea eliminarlo?
            </DialogContent>
            <DialogActions>
                <Button color="primary"
                    onClick={() => handleSubmit()}>
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
