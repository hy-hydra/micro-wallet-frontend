import { Box, Typography } from '@mui/material';
import { Token } from 'src/types/crypto';

type Props = {
    token: Token;
};

export default function TokenAvatar({ token }: Props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', my: 2 }}>
            <img src={token.name === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : token.icon} width={40} height={40} alt="usdc" />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
                <Typography>{`${token.name} ${token.type}`}</Typography>
                <Typography>{token.symbol}</Typography>
            </Box>
        </Box>
    );
}
