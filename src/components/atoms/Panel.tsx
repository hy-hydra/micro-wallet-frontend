import { Box, Typography, useTheme, Divider, Grid } from '@mui/material';
import { ReactNode } from 'react';
import { Token } from 'src/types/crypto';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BasicSelectTokenBox } from '../molecules/Inputs/BasicSelectTokenBox';

type Props = {
    width?: string;
    height?: string;
    headText?: string;
    bgColor?: string;
    tokenList: Token[];
    children: ReactNode;
    selectValue?: number;
    onChange: (v: number) => void;
};

export default function Panel(props: Props) {
    const theme = useTheme();
    const { width, height, headText, children, tokenList } = props;
    const pc = useMediaQuery('(min-width:900px)');

    return (
        <Box className={'deposit-panel'} sx={{ flexGrow: 1, width: width ?? '100%', height: height ?? 'auto', minHeight: '500px' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                <Typography sx={{ fontSize: '22px', fontWeight: 500, color: theme.palette.primary.dark, lineHeight: 2.5, pl: 2 }}>
                    {headText}
                </Typography>
                {!pc && tokenList.length > 0 && (
                    <Box maxWidth={'300px'}>
                        <BasicSelectTokenBox selectOptions={tokenList} onChange={props.onChange} value={props.selectValue ?? 0} />
                    </Box>
                )}
            </Grid>
            <Divider />
            <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
    );
}
