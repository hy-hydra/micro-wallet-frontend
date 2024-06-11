import { Button, Typography, useTheme } from '@mui/material';
import { MouseEventHandler } from 'react';
import IconLabel from '../IconLabel';
import { Token } from 'src/types/crypto';

type Props = {
    onClick: MouseEventHandler | undefined;
    className?: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean;
    token: Token;
    active?: boolean;
    noBalance?: boolean;
};

export default function TokenButton(props: Props) {
    const theme = useTheme();
    const { className, type, onClick, token, disabled, active } = props;

    return (
        <Button
            className={className ? className : ''}
            size={'large'}
            type={type}
            onClick={onClick}
            variant={active ? 'contained' : 'outlined'}
            href=""
            disabled={disabled}
            sx={{
                textTransform: 'capitalize',
                fontFamily: 'Poppins',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2.5,
                py: 1.5,
                width: '100%',
                '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                    color: '#fff'
                }
            }}
        >
            <IconLabel
                icon={
                    <img src={token.name === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : token.icon} width={32} height={32} alt="token" />
                }
                label={`${token.name} ${token.type}`}
            />
            <Typography>{props.noBalance ? '' : token.balance?.toFixed(3) + ' ' + token.symbol}</Typography>
        </Button>
    );
}
