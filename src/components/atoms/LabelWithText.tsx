import { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

type Props = {
    label: string | ReactNode;
    children: ReactNode;
    light?: boolean;
};

export default function LabelWithText(props: Props) {
    return (
        <Stack className={'w-full pr-2'}>
            <Typography fontSize={10} style={{ color: props.light ? '#6D6D6D' : '#c0cad1' }} component={'span'}>
                {props.label}
            </Typography>
            <Typography
                className={'truncate ...'}
                display={'block'}
                style={{ borderBottom: `1px solid ${props.light ? 'black' : '#c0cad1'}` }}
                component={'span'}
            >
                {props.children ? props.children : '-'}
            </Typography>
        </Stack>
    );
}
