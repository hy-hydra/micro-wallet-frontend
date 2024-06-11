import axios from 'axios';
import * as React from 'react';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState, useLayoutEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useNotify } from 'src/hooks/useNotify';

type Props = {
    columns: GridColDef[];
    url?: string;
    filterParams?: object;
    listData?: GridRowsProp[] | object[];
    toolBarComponent?: React.JSXElementConstructor<any>;
    addListClass?: string;
    checkboxSelection?: boolean;
    onRowClickEvent?: (v: any) => any;
    queryKey?: string | any[];
    gridRowId?: string;
    onCheckboxEvent?: (v: any) => any;
    hideFooter?: boolean;
    listHeight?: number;
    listReload?: boolean;
};
export default function List(props: Props) {
    const notify = useNotify();
    const [rows, setRows] = useState<GridRowsProp>([]);

    const queryClient = useQueryClient();

    const [queryKey, setQueryKey] = useState<string | any[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setQueryKey([props.queryKey, props.filterParams]);
    }, [props.queryKey, props.filterParams]);

    const { data, refetch } = useQuery(
        [queryKey],
        async () => {
            try {
                if (props.url && props.queryKey) {
                    const params = props.filterParams;
                    const res = await axios.get(props.url, { params });
                    return res.data;
                } else {
                    return null;
                }
            } catch (e: any) {
                if (e.request?.status === 401) {
                    console.error(e);
                    // setUserData({ isLogin: false });
                    return notify('error', 'Authentication Error');
                }
                notify('error', 'API response error');
            }
        },
        { staleTime: Infinity }
    );

    useEffect(() => {
        if (props.listData) {
            setRows(props.listData);
            return setLoading(false);
        }
        if (data) {
            setRows(data);
            return setLoading(false);
        }
        setRows([]);
    }, [data, props.listData]);

    useEffect(() => {
        if (props.listReload) {
            refetch();
        }
        return;
    }, [props.listReload]);

    useLayoutEffect(() => {
        queryClient.invalidateQueries();
    }, []);
    return (
        <Box sx={{ height: props.listHeight ? props.listHeight : 500 }}>
            <DataGrid
                getRowId={(row) => row[props.gridRowId ? props.gridRowId : 'id']}
                loading={loading}
                disableRowSelectionOnClick
                disableColumnMenu
                className={`${props.addListClass} truncate`}
                // autoHeight
                columns={props.columns}
                density={'compact'}
                // @ts-ignore
                rows={rows}
                // localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
                components={{ Toolbar: props.toolBarComponent ? props.toolBarComponent : null }}
                checkboxSelection={props.checkboxSelection && true}
                onRowClick={(event) => props.onRowClickEvent && props.onRowClickEvent(event)}
                onRowSelectionModelChange={(val) => props.onCheckboxEvent && props.onCheckboxEvent(val)}
                hideFooter={props.hideFooter}
                getRowClassName={(params) => `unique-row-${params.id}`}
                sx={{
                    boxShadow: 'none',
                    border: 'none',
                    borderColor: '#2F3D46',
                    backgroundColor: 'transparent',
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                        color: 'primary.main'
                    },
                    '& .MuiDataGrid-cell': {
                        outline: 'none !important'
                    },
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none'
                    }
                }}
            />
        </Box>
    );
}
