import { Grid, Typography } from '@mui/material';
import Panel from 'src/components/atoms/Panel';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import TextField from 'src/components/molecules/Inputs/TextField';
import { useForm, FieldValues } from 'react-hook-form';
import ForwardIcon from '@mui/icons-material/Forward';
import SelectBox from 'src/components/molecules/Inputs/SelectBox';
import { useDispatch, useSelector } from 'src/store';
import { useMemo } from 'react';
import { TransferTokenProps } from 'src/types/crypto';
import { postTransferToken } from 'src/store/slices/token';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues = {
    token: 'USDT',
    amount: 0,
    receiver_email: ''
};

const schema = yup.object({
    receiver_email: yup.string().email('Invalid email').required('Email is required.'),
    amount: yup.number().moreThan(0.001, 'Amount must be greater than 0.001').required('Please input amount'),
    token: yup.string().required('Token is required')
});

export default function TransferLayout() {
    const dispatch = useDispatch();
    const { tokenList } = useSelector((state) => state.token);
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues
    });

    const tokenName = watch('token');

    const tokenSelectOptions = useMemo(() => {
        const options = tokenList.map((token) => {
            return {
                label: token.name,
                value: token.name,
                icon: token.icon
            };
        });

        return options;
    }, [tokenList]);

    const transferToken = (v: FieldValues) => {
        const tokenToSend = tokenList.find((token) => token.name === v.token);
        const data: TransferTokenProps = {
            token_id: tokenToSend ? tokenToSend.id : 0,
            receiver_email: v.receiver_email,
            amount: v.amount
        };
        dispatch(postTransferToken(data));
        reset(defaultValues);
    };

    return (
        <Grid
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    mt: 6
                }}
            >
                <Panel onChange={() => {}} tokenList={[]} height="550px" headText={'Transfer Funds'}>
                    <Grid sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Grid gap={2} sx={{ p: { xs: 0.5, md: 2 }, width: '100%' }}>
                            <SelectBox control={control} name="token" label="Select Token" selectOptions={tokenSelectOptions} />
                            <Typography sx={{ mt: 2, mb: 1 }}>Transfer {tokenName} Amount</Typography>
                            <TextField name="amount" label="Amount" control={control} error={errors} />
                            <Typography sx={{ mt: 2, mb: 1 }}>Receiver's Email</Typography>
                            <TextField name="receiver_email" label="Email" control={control} error={errors} placeholder="abc@email.com" />
                            {/* <Grid
                                className="flex-align-center"
                                mt={2}
                                sx={{
                                    justifyContent: 'space-between',
                                    '& p': {
                                        fontSize: '14px'
                                    }
                                }}
                            >
                                <Typography>Network Fee</Typography>
                                <Typography>3 IQDT</Typography>
                            </Grid> */}
                            <Grid sx={{ textAlign: 'right', mt: 2 }}>
                                <PrimaryButton size="medium" onClick={handleSubmit(transferToken)}>
                                    <ForwardIcon sx={{ mr: 1, width: '20px', height: '20px' }} />
                                    Send
                                </PrimaryButton>
                            </Grid>
                        </Grid>
                        {/* <List listItems={mock_list_item} /> */}
                    </Grid>
                </Panel>
            </Grid>
        </Grid>
    );
}
