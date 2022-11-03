import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from "@mui/material";
import { deleteMember, deleteUser } from 'src/utils/requests';
import { useData } from 'src/utils/hooks';


export const DeleteUsersMembersDialog = (props) => {
    const [errors, setErrors] = useData({});


    function handleSubmit(id) {
        console.log(id)
        const func = props.onAction === 'delete_member' ? deleteMember : deleteUser;
        func(id)
            .then((response) => {
                props.onClose();
                props.closeMain();

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
            <DialogTitle> {props.onAction === 'delete_member' ? 'Eliminar miembro' : 'Eliminar usuario'}</DialogTitle>
            {props.onAction === 'delete_member' ?
                <DialogContent>
                    ¿Está seguro de que desea eliminar el miembro de forma
                    <b> permanente</b>?
                </DialogContent> :
                <DialogContent>¿Está seguro de que desea eliminar el usuario de forma
                    <b> permanente</b>?
                </DialogContent>
            }

            <DialogActions>
                <Button
                    onClick={() => props.onClose()}>
                    Cancelar
                </Button>
                <Button color="error"
                    onClick={() => handleSubmit(props.instance)}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
