import { Stack, Box } from '@mui/material';
import { ReactNode } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import List from './List';

type Props = {
    columns: GridColDef[];
    url?: string;
    actions?: ReactNode;
    listData?: GridRowsProp[];
    addListClass?: string;
    checkboxSelection?: boolean;
    onRowClickEvent?: (v: any) => any;
    queryKey?: string | any[];
    gridRowId?: string;
    onCheckboxEvent?: (v: any) => any;
    listHeight?: number;
    filterStateKey?: string;
    listReload?: boolean;
    filterParams?: object;
    setFilterParams?: (v?: any) => void;
};
export default function ListPage(props: Props) {
    return (
        <Box>
            <Stack spacing={1} mt={3}>
                {props.actions && <div>{props.actions}</div>}
                <List
                    columns={props.columns}
                    url={props.url}
                    queryKey={props.queryKey}
                    listData={props.listData}
                    addListClass={props.addListClass ? props.addListClass : ''}
                    checkboxSelection={props.checkboxSelection}
                    onRowClickEvent={props.onRowClickEvent}
                    gridRowId={props.gridRowId}
                    onCheckboxEvent={props.onCheckboxEvent}
                    listHeight={props.listHeight}
                    listReload={props.listReload}
                />
            </Stack>
        </Box>
    );
}
