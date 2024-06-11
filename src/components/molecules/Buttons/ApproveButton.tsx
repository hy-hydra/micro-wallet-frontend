import { MouseEvent, ReactNode, useState } from 'react';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import Dialog from 'src/components/atoms/Dialog';
import { Box } from '@mui/material';
import PrimaryTextButton from 'src/components/atoms/Buttons/PrimaryTextButton';

type Props = {
    onApprove: () => any;
    icon?: boolean;
    text?: string;
    message?: string | ReactNode;
    children?: ReactNode;
    bold?: boolean;
    className?: string;
};

export default function ApproveButton(props: Props) {
    const [open, setOpen] = useState(false);
    const deleteItem = () => {
        props.onApprove();
        setOpen(false);
    };
    const openDialog = (e: MouseEvent<Element>) => {
        e.stopPropagation();
        setOpen(true);
    };
    return (
        <>
            <PrimaryTextButton onClick={(e) => openDialog(e)}>{props.text ?? 'Approve'}</PrimaryTextButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                actions={
                    <Box className={'flex justify-end w-full'} gap={2}>
                        <PrimaryButton onClick={deleteItem}>{props.text ?? 'Approve'}</PrimaryButton>
                        <PrimaryOutlineButton onClick={() => setOpen(false)} className={'ml-2'}>
                            Cancel
                        </PrimaryOutlineButton>
                    </Box>
                }
            >
                {props.message ? props.message : 'Are you sure to approve this request?'}
            </Dialog>
        </>
    );
}
