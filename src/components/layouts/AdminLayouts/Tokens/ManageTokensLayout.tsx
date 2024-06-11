import { useEffect, useState } from 'react';
import { GridRowsProp } from '@mui/x-data-grid';
import { Grid, Box } from '@mui/material';
import ListPage from 'src/components/organisms/List/ListPage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PrimaryButton from 'src/components/atoms/Buttons/PrimaryButton';
import { Token } from 'src/types/crypto';
import EditTokenDialog from 'src/components/molecules/ManageToken/EditTokenDialog';
import DeleteButton from 'src/components/molecules/Buttons/DeleteButton';
import axios from 'src/utils/axios';
import { useNotify } from 'src/hooks/useNotify';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';

type Props = {
    apiResponse: Token[] | undefined | null;
    refetch: () => void;
};

export default function ManageTokensLayout({ apiResponse, refetch }: Props) {
    const notify = useNotify();
    const [filterParams, setFilterParams] = useState();
    const [listData, setListData] = useState<GridRowsProp[]>([]);
    const [token, setToken] = useState<Token>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (apiResponse) {
            //@ts-ignore
            setListData(apiResponse.data);
        }
    }, [apiResponse]);

    const editToken = (t: Token) => {
        setToken(t);
        setOpen(true);
    };

    const deleteToken = async (t: Token) => {
        try {
            await axios({
                url: 'tokens/tokenview',
                method: 'DELETE',
                params: { token_id: t.id }
            });
            notify('success', 'Deleted token successfully');
            refetch();
        } catch (e: any) {
            console.log(e);
            notify('error', 'Something went wrong');
        }
    };

    return (
        <Grid>
            <ListPage
                filterParams={filterParams}
                setFilterParams={setFilterParams}
                filterStateKey={'contracts'}
                columns={[
                    { field: 'name', headerName: 'Token', flex: 0.1 },
                    { field: 'symbol', headerName: 'Symbol', flex: 0.1 },
                    {
                        field: 'sell_price',
                        headerName: 'Sell Price (USD)',
                        flex: 0.1
                    },
                    {
                        field: 'buy_price',
                        headerName: 'Buy Price (USD)',
                        flex: 0.1
                    },
                    {
                        field: 'type',
                        headerName: 'Type',
                        flex: 0.1
                    },
                    {
                        field: 'contract',
                        headerName: 'Contract',
                        flex: 0.1
                    },
                    {
                        field: 'actions',
                        headerName: '',
                        sortable: false,
                        renderCell: (params) => (
                            <>
                                <PrimaryOutlineButton onClick={() => editToken(params.row)}>Edit</PrimaryOutlineButton>
                                <DeleteButton message={'Are you sure to delete this token?'} onDelete={() => deleteToken(params.row)} />
                            </>
                        ),
                        width: 150
                    }
                ]}
                actions={
                    <>
                        <Grid container justifyContent={'flex-end'} className={'mt-4'}>
                            <PrimaryButton onClick={() => setOpen(true)}>Add New Token</PrimaryButton>
                        </Grid>
                    </>
                }
                listData={listData}
                gridRowId={'id'}
            />
            <EditTokenDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    refetch();
                }}
                data={token}
            />
        </Grid>
    );
}
