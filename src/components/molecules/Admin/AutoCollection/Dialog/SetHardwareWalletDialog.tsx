import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import Dialog from 'src/components/atoms/Dialog';
import { Box, Grid, Typography } from '@mui/material';
import { isEthereumAddress } from 'src/utils/web3';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import TextField from 'src/components/molecules/Inputs/TextField';

type Props = {
    open: boolean;
    hardwareWallet: string;
    setHardwareWallet: (addr: string) => void;
    onClose: () => void;
};
const defaultValues = {
    hardwareAddress: 'xxx-xxx-xxx-xxx'
};

const SetHardwareWalletDialog = (props: Props) => {
    const { open, hardwareWallet, setHardwareWallet, onClose } = props;
    const { control, reset, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues
    });

    useEffect(() => {
        reset({ hardwareAddress: hardwareWallet });
    }, [hardwareWallet]);

    const handleHardwareWallet = (v: FieldValues) => {
        if (isEthereumAddress(v.hardwareAddress)) {
            setHardwareWallet(v.hardwareAddress);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            actions={
                <Grid display={'flex'} className={'flex w-full'} sx={{ justifyContent: 'right', gap: 1 }}>
                    <PrimaryButton onClick={handleSubmit(handleHardwareWallet)}>Confirm</PrimaryButton>
                    <PrimaryOutlineButton onClick={onClose} className={'ml-2'}>
                        Cancel
                    </PrimaryOutlineButton>
                </Grid>
            }
        >
            <Grid p={1}>
                <Typography sx={{ textAlign: 'center', mb: 2 }}>Please input your hardware wallet address here</Typography>
                <Box className="flex-center">
                    <TextField name="hardwareAddress" label="" control={control} />
                </Box>
            </Grid>
        </Dialog>
    );
};

export default SetHardwareWalletDialog;
