import { useForm } from 'react-hook-form';
import { useSelector } from 'src/store';
import { Grid, Stack } from '@mui/material';
import UserCard from 'src/components/atoms/Cards/UserCard';
import TokenList from 'src/components/molecules/TokenList';
import TextField from 'src/components/molecules/Inputs/TextField';
// assets
import SearchIcon from '@mui/icons-material/Search';
import Loader from 'src/components/atoms/Loader';

const defaultValues = {
    searchKey: ''
};

export default function DashboardLayout() {
    const { userTokenList, isLoading } = useSelector((state) => state.token);

    const { control, watch } = useForm({
        mode: 'onChange',
        defaultValues
    });

    const searchKey = watch('searchKey');

    return (
        <>
            {isLoading && <Loader />}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <UserCard isLoading={false} />
            </Stack>
            <Stack mt={5}>
                <Grid gap={1} mb={2} sx={{ display: 'flex', justifyContent: 'right', '&>div': { maxWidth: '350px' } }}>
                    <TextField name="searchKey" label="" control={control} prefix={<SearchIcon fontSize="small" />} />
                </Grid>
                {!isLoading && <TokenList tokenList={userTokenList.filter((token) => token.name.includes(searchKey.toUpperCase()))} />}
            </Stack>
        </>
    );
}
