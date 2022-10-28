import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteProgram } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';
import router from "next/router";


export const DeleteProgramsDialog = (props) => {
    const [errors, setErrors] = useData({});


    function handleSubmit(id) {
        console.log(id)
        const func = props.onAction === 'delete_program' ? deleteProgram : null;
        func(id)
            .then((response) => {
                props.onClose();
                if (props.onAction === 'delete_program') {
                    router.push('/programs')
                } else {
                    props.loadData()
                }


            })
            .catch((error) => {
                setErrors(error.response.data);
            });
    }
    console.log(props.instance)

    return (
        <Dialog
            onClose={props.onClose}
            open={props.open}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle> {props.onAction === 'delete_program' ? 'Eliminar programa' : 'Eliminar documento'}</DialogTitle>
            {props.onAction === 'delete_program' ?
                <DialogContent>
                    Al eliminar el programa{" "}
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
                <Button
                    onClick={() => props.onClose()}>
                    Cancelar
                </Button>
                <Button color="error"
                    onClick={props.onAction === 'delete_program' ? () => handleSubmit(props.instance.id) : () => handleSubmit(props.instance)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
