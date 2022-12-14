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
        const func = props.onAction === 'delete_program' ? deleteProgram : null;
        func(id)
            .then((response) => {
                props.onClose();
                router.push('/programs')
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
            <DialogTitle> Eliminar programa</DialogTitle>
            <DialogContent>
                Al eliminar el programa{" "}
                <u><i>{props.instance.name}</i></u>
                <b> se eliminarán todos los datos asociados.Esta acción no puede deshacerse.</b>
                <br />
                <br />
                ¿Está seguro de que desea eliminarlo?
            </DialogContent>


            <DialogActions>
                <Button
                    onClick={() => props.onClose()}>
                    Cancelar
                </Button>
                <Button color="error"
                    onClick={() => handleSubmit(props.instance.id)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
