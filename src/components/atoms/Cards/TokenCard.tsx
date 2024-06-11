import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { Token } from 'src/types/crypto';
import Icon from '@mui/material/Icon';
import IconLabel from '../IconLabel';

type Props = {
    token: Token;
};

export default function TokenCard(props: Props) {
    const pc = useMediaQuery('(min-width:768px)');
    const { token } = props;
    return (
        <Box className="token-card">
            {pc ? (
                <Stack
                    direction="row"
                    // divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    className="pc-token-card-content"
                >
                    <IconLabel
                        icon={
                            <img
                                src={token.name === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : token.icon}
                                width={32}
                                height={32}
                                alt="token icon"
                            />
                        }
                        label={token.name}
                    />
                    <Typography>$ {token.sell_price?.toFixed(5)}</Typography>
                    <Typography>
                        {token.balance?.toFixed(5)}
                        <span style={{ marginLeft: 2.5 }}>{token.symbol}</span>
                    </Typography>
                    <Typography>$ {(token.balance * token.sell_price)?.toFixed(5)}</Typography>
                </Stack>
            ) : (
                <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box className={'flex align-center'}>
                        <Icon className="token-icon">
                            <img src={token.name === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : token.icon} alt="token-icon" />
                        </Icon>
                        <Stack direction={'column'} ml={2} sx={{ justifyContent: 'space-between' }}>
                            <Typography>{token.name}</Typography>
                            <Typography>$ {token.sell_price?.toFixed(5)}</Typography>
                        </Stack>
                    </Box>
                    <Box className={'flex'} ml={2} sx={{ justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Typography>{token.balance?.toFixed(5) + token.symbol}</Typography>
                        <Typography sx={{ fontWeight: 500 }}>$ {(token.balance * token.sell_price)?.toFixed(5)}</Typography>
                    </Box>
                </Stack>
            )}
        </Box>
    );
}
