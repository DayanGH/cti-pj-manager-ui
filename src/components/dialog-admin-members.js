import { Dialog, Button, TextField, Box, DialogTitle, CircularProgress, Autocomplete } from '@mui/material';
import { useState } from 'react';
import { useAsync } from 'react-async';
import { fetchMembers } from 'src/utils/requests';
import { useData, useToggleState } from '../../src/utils/hooks';

export const AdminMembers = ({ open, onClose, pj_id, loadData, project, ...rest }) => {
    const [errors, setErrors] = useData({});
    const [value, setValue] = useState(project.members)
    const [inputValue, setInputValue] = useState('')
    const [toggleMembers, openMembers, closeMembers] = useToggleState();
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

    const addMembers = async () => {
        //TODO implement add selected members to project
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='xs'
            fullWidth={true}

        >
            <DialogTitle>Administrar miembros</DialogTitle>
            <Box
                sx={{ px: 2, mx: 2, display: "flex", flexDirection: "column" }}
            >

                <Autocomplete
                    multiple
                    id="select-members"
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
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Miembros"
                            variant="standard"
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
                    sx={{ pt: 2, display: "flex", justifyContent: "right" }}
                >
                    <Button
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={addMembers}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );

};
