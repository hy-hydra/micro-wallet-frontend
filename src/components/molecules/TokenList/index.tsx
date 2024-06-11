import { Grid, Stack, Typography } from '@mui/material';
import TokenCard from 'src/components/atoms/Cards/TokenCard';
import IconLabel from 'src/components/atoms/IconLabel';
import { Token } from 'src/types/crypto';
import useMediaQuery from '@mui/material/useMediaQuery';

type Props = {
    tokenList: Token[];
};

export default function TokenList(props: Props) {
    const { tokenList } = props;
    const pc = useMediaQuery('(min-width:900px)');
    return (
        <Grid className="token-list">
            <Stack direction="row" spacing={2} className="pc-token-card-content">
                {pc ? (
                    <>
                        <IconLabel icon={<></>} label={'Name'} />
                        <Typography>Price</Typography>
                        <Typography>Balance</Typography>
                        <Typography>USD Price</Typography>
                    </>
                ) : (
                    <>
                        <Typography>Name/Price($)</Typography>
                        <Typography>Balance/USD</Typography>
                    </>
                )}
            </Stack>
            {tokenList.length === 0 && <Typography sx={{ textAlign: 'center', mt: 10 }}>No token found</Typography>}
            {tokenList.map((token, index) => (
                <Grid item key={index} mt={2}>
                    <TokenCard token={token} />
                </Grid>
            ))}
        </Grid>
    );
}
