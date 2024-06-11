import { Controller } from 'react-hook-form';
import { Box, Switch as DefaultSwitch, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
    control: any;
    name: string;
    label?: string | ReactNode;
    className?: string;
    errors?: any;
    required?: boolean;
    disabled?: boolean;
};

export const Switch = (props: Props) => {
    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({ field, fieldState: { error } }) => (
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography fontSize={'12px'} sx={{ pr: 1 }}>
                            {props.label ?? ''}:
                        </Typography>
                        <Box
                            flexGrow={1}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'right'}
                            sx={{ '&>p': { fontSize: '12px' } }}
                        >
                            <Typography>OFF</Typography>
                            <DefaultSwitch disabled={props.disabled} checked={field.value} value={field.value} onChange={field.onChange} />
                            <Typography>ON</Typography>
                        </Box>
                    </Box>
                )}
            />
        </>
    );
};
