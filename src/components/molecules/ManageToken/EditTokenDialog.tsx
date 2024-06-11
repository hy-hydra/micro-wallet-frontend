import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, ModalProps } from '@mui/material';
import { useForm, FieldValues } from 'react-hook-form';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import Dialog from 'src/components/atoms/Dialog';
import * as yup from 'yup';
import TextField from '../Inputs/TextField';
import { useNotify } from 'src/hooks/useNotify';
import axios from 'src/utils/axios';
import { Token } from 'src/types/crypto';
import { useEffect } from 'react';

type Props = {
    open: ModalProps['open'];
    data?: Token;
    onClose: (v?: boolean) => void;
};
const schema = yup.object({
    name: yup.string().required('Token name is required'),
    symbol: yup.string().required('Token symbol is required'),
    type: yup.string().required('Token type is required'),
    decimals: yup.number().required('Token decimals is required'),
    contract: yup.string().required('Token contract is required'),
    sell_price: yup.number().required('Sell price is required'),
    buy_price: yup.number().required('Buy price is required'),
    icon: yup.string().required('Token icon is required')
});

const defaultFormValues = {
    name: '',
    symbol: '',
    type: '',
    decimals: 6,
    contract: '',
    sell_price: 0,
    buy_price: 0,
    icon: ''
};

export default function EditTokenDialog(props: Props) {
    const { open, data, onClose } = props;
    const notify = useNotify();
    const { control, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues: defaultFormValues,
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data]);

    const close = () => {
        reset(defaultFormValues);
        onClose();
    };

    const saveItem = async (v: FieldValues) => {
        try {
            if (data) {
                await axios({
                    url: 'tokens/tokenview',
                    method: 'PUT',
                    params: { token_id: data.id },
                    data: v
                });
                notify('success', 'Successfully updated token');
            } else {
                await axios({
                    url: 'tokens/tokenview',
                    method: 'POST',
                    data: v
                });
                notify('success', 'Successfully created token');
            }

            close();
        } catch (e) {
            console.error(e);
            notify('error', 'Something went wrong');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            title={data ? 'Edit Token' : 'Create new token'}
            actions={
                <Grid className="flex w-full" sx={{ width: '100%', justifyContent: 'right', gap: 2 }}>
                    <PrimaryButton onClick={handleSubmit(saveItem)}>{data ? 'Edit' : 'Create'}</PrimaryButton>
                    <PrimaryOutlineButton onClick={() => close()} className={'ml-2'}>
                        Cancel
                    </PrimaryOutlineButton>
                </Grid>
            }
        >
            <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} pt={2}>
                <TextField control={control} name={'name'} label={'Name'} />
                <TextField control={control} name={'symbol'} label={'Symbol'} />
                <TextField control={control} name={'type'} label={'Type'} />
                <TextField control={control} name={'decimals'} label={'Decimals'} />
                <TextField control={control} name={'contract'} label={'Contract Address'} />
                <TextField control={control} name={'sell_price'} label={'sell_price'} />
                <TextField control={control} name={'buy_price'} label={'buy_price'} />
                <TextField control={control} name={'icon'} label={'Icon'} />
            </Grid>
        </Dialog>
    );
}
