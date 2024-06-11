import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import Dialog from 'src/components/atoms/Dialog';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
    open: boolean;
    confirmWithdraw: (code: string) => void;
    onClose: () => void;
};

const WithdrawConfirmDialog = (props: Props) => {
    const { open, confirmWithdraw, onClose } = props;
    const [code, setCode] = useState<string>();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            actions={
                <Grid display={'flex'} className={'flex w-full'} sx={{ justifyContent: 'right', gap: 1 }}>
                    <PrimaryButton onClick={() => code && confirmWithdraw(code)}>Confirm</PrimaryButton>
                    <PrimaryOutlineButton onClick={onClose} className={'ml-2'}>
                        Cancel
                    </PrimaryOutlineButton>
                </Grid>
            }
        >
            <Grid p={1}>
                <Typography sx={{ textAlign: 'center' }}>
                    We've just sent withdrawal code to your email. <br /> Please check and confirm it.
                </Typography>
                <Box className="flex-center">
                    <TextField
                        onChange={(e) => setCode(e.target.value as string)}
                        required
                        aria-required
                        error={code === undefined || code === ''}
                        size="small"
                        sx={{ width: '150px', mt: 1 }}
                        inputProps={{
                            style: { textAlign: 'center' }
                        }}
                    />
                </Box>
            </Grid>
        </Dialog>
    );
};

export default WithdrawConfirmDialog;
