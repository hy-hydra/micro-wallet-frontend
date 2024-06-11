import { MouseEvent, ReactNode, useState } from 'react';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import RedTextButton from 'src/components/atoms/Buttons/RedTextButton';
import Dialog from 'src/components/atoms/Dialog';
import { Box } from '@mui/material';

type Props = {
    onDelete: () => any;
    icon?: boolean;
    text?: string;
    message?: string | ReactNode;
    children?: ReactNode;
    bold?: boolean;
    className?: string;
};

export default function DeleteButton(props: Props) {
    const [open, setOpen] = useState(false);
    const deleteItem = () => {
        props.onDelete();
        setOpen(false);
    };
    const openDialog = (e: MouseEvent<Element>) => {
        e.stopPropagation();
        setOpen(true);
    };
    return (
        <>
            <RedTextButton onClick={(e) => openDialog(e)}>{props.text ?? 'Delete'}</RedTextButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                actions={
                    <Box className={'flex justify-end w-full'} gap={2}>
                        <PrimaryButton delete onClick={deleteItem}>
                            {props.text ?? 'Delete'}
                        </PrimaryButton>
                        <PrimaryOutlineButton onClick={() => setOpen(false)} className={'ml-2'}>
                            Cancel
                        </PrimaryOutlineButton>
                    </Box>
                }
            >
                {props.message ? props.message : 'データを削除してもよろしいですか？'}
            </Dialog>
        </>
    );
}
