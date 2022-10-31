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
                    onClick={() => { props.onAction === 'project' ? props.handleAction("edit") : props.onAction === 'program' ? props.handleAction("edit") : console.log('other'); handleCloseMenu() }}>
                    Editar
                </MenuItem>
                <MenuItem onClick={() => { props.onAction === 'project' ? props.handleAction("delete_project", props.instance) : props.onAction === 'project_document' ? props.handleAction("delete_project_doc", props.instance) : props.onAction === 'group_document' ? props.handleAction("delete_project_doc_group", props.instance) : props.onAction === 'program' ? props.handleAction("delete_program", props.instance) : props.onAction === 'program_document' ? props.handleAction("delete_program_doc", props.instance) : props.onAction === 'simple_doc' ? props.handleAction("delete_simple_doc", props.instance) : props.handleAction('delete_program_doc_group', props.instance); handleCloseMenu() }}>
                    Eliminar
                </MenuItem>
            </Menu>
        </>
    );
};