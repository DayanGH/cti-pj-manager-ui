import { Button, Menu, MenuItem } from '@mui/material';
import { ContextMenuIcon } from '../icons/context-menu';
import { useState } from 'react';

export const PopupMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showItem, setshowItem] = useState(props.onAction === 'project' || props.onAction === 'program' ? 'felx' : 'none');
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="long-button"
                aria-label="more"
                sx={{ color: "text.primary" }}
                startIcon={(<ContextMenuIcon fontSize="small" />)}
                aria-controls={openMenu ? 'menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}

            >
            </Button>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                open={openMenu}
                onClose={handleCloseMenu}>

                <MenuItem sx={{ display: showItem }}
                    onClick={() => { props.onAction === 'project' ? props.handleAction("edit") : props.onAction === 'project_document' ? props.handleAction("edit_document") : props.onAction === 'program' ? console.log('program') : console.log('program_document'); handleCloseMenu() }}>
                    Editar
                </MenuItem>
                <MenuItem onClick={() => { props.onAction === 'project' ? props.handleAction("delete_project", props.instance) : props.onAction === 'project_document' ? props.handleAction("delete_project_doc", props.instance) : props.onAction === 'group_document' ? props.handleAction("delete_project_group_doc", props.instance) : props.onAction === 'program' ? console.log('program') : console.log('program_document'); handleCloseMenu() }}>
                    Eliminar
                </MenuItem>
            </Menu>
        </>
    );
};