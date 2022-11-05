import { Dialog, Button, TextField, Box, DialogTitle, CircularProgress, Autocomplete, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useAsync } from 'react-async';
import { fetchMembers, editProject } from 'src/utils/requests';
import { useData, useTargetAction, useToggleState } from '../../utils/hooks';
import { CopyIcon } from 'src/icons/copy';
import { NewMemberDialog } from '../members/dialog-new-member';

export const AdminMembers = ({ open, onClose, pj_id, loadData, project, ...rest }) => {
    const [errors, setErrors] = useData({});
    const [value, setValue] = useState(project.members)
    const [inputValue, setInputValue] = useState('')
    const [action, target, handleAction] = useTargetAction();
    const [toggleMembers, openMembers, closeMembers] = useToggleState();
    const [focused, setFocused] = useState(false);
    const membersAsyncData = useAsync({
        deferFn: fetchMembers,
    });
    function handleOpenMembers() {
        openMembers();
        membersAsyncData.run();
    }
    function handleCloseMembers() {
        closeMembers();
    }

    function addMembers() {
        project.members = value
        editProject(project)
            .then((data) => {
                onClose();
                loadData();
            })
            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <>
            {
                ["new_member_p"].includes(action) && (
                    <NewMemberDialog
                        open
                        onAction={action}
                        handleClose={handleAction}
                        setValue={setValue}
                        value={value}
                        instance={target}
                        setFocused={setFocused}
                    />)
            }
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth='xs'
                fullWidth={true}

            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DialogTitle
                        sx={{ flexGrow: 1 }}
                    >
                        Administrar miembros
                    </DialogTitle>
                    <Tooltip title="Copiar">
                        <IconButton
                            onClick={() => {
                                let members = "";
                                value.forEach(v => {
                                    members += v["name"] + ", "
                                })
                                navigator.clipboard.writeText(members)
                            }}
                            sx={{ mr: 2 }}
                            size="small"
                        >
                            <CopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box
                    sx={{ px: 2, mx: 2, display: "flex", flexDirection: "column" }}
                >

                    <Autocomplete
                        multiple
                        id="select-members"
                        autoHighlight
                        open={toggleMembers}
                        value={value}
                        onOpen={handleOpenMembers}
                        onClose={handleCloseMembers}
                        options={membersAsyncData.data || []}
                        onChange={(_, value) => { setValue(value) }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        loading={membersAsyncData.isLoading}
                        inputValue={inputValue}
                        onInputChange={(_, value) => {
                            setInputValue(value)
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props}
                                    key={option.id}>
                                    {option.name}
                                </li>
                            )
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Miembros"
                                variant="standard"
                                autoFocus={focused}

                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <div>
                                            {membersAsyncData.isLoading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </div>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Box
                        sx={{ pt: 2, display: "flex", mb: 1 }}
                    >
                        <Button

                            onClick={() => handleAction('new_member_p')}
                        >
                            Nuevo
                        </Button>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Button
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => addMembers()}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Dialog >
        </>
    );


};
