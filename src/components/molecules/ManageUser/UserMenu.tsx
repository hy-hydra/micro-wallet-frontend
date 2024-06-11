import { Menu as BaseMenu, MenuItem } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';
import { UserMenuOption } from 'src/types/select';
import DeleteDialog from '../Dialogs/DeleteDialog';
import { useState } from 'react';
import { UserProfile } from 'src/types/user';

type Props = {
    open: ModalProps['open'];
    anchorEl: HTMLElement | null;
    data: UserProfile;
    onClick: (v: number) => void;
    onClose: ModalProps['onClose'];
    onDelete: () => void;
};

export default function UserMenu(props: Props) {
    const { open, anchorEl, data, onClick, onClose, onDelete } = props;
    const [openDel, setOpenDel] = useState(false);

    const handleDelete = () => {
        onDelete();
        setOpenDel(false);
    };

    return (
        <>
            <BaseMenu
                id="base-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={() => onClick(UserMenuOption.detail)}>Detail</MenuItem>
                <MenuItem onClick={() => onClick(UserMenuOption.edit)}>Edit</MenuItem>
                <MenuItem onClick={() => setOpenDel(true)} sx={{ color: 'red' }}>
                    {data.is_active ? 'Deactivate' : 'Activate'}
                </MenuItem>
            </BaseMenu>
            <DeleteDialog
                isDelete={data.is_active ? true : false}
                open={openDel}
                btnText={data.is_active ? 'Deactivate' : 'Activate'}
                message={'Are you sure to delete this user?'}
                onDelete={handleDelete}
                onClose={() => setOpenDel(false)}
            />
        </>
    );
}
