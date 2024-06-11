import { ReactElement } from 'react';
import { TableCellProps } from '@mui/material';
import { TokenStateProps } from './crypto';
import { SnackbarProps } from './snackbar';

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

export type GuardProps = {
    children: ReactElement | null;
};

export interface ColorProps {
    readonly [key: string]: string;
}

export interface DefaultRootStateProps {
    token: TokenStateProps;
    snackbar: SnackbarProps;
}

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type DateRange = { start: number | Date; end: number | Date };

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export type Direction = 'up' | 'down' | 'right' | 'left';

export interface TabsProps {
    children?: React.ReactElement | React.ReactNode | string;
    value: string | number;
    index: number;
}

export interface EnhancedTableHeadProps extends TableCellProps {
    onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    order: ArrangementOrder;
    orderBy?: string;
    numSelected: number;
    rowCount: number;
    onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
}

export type HeadCell = {
    id: string;
    numeric: boolean;
    label: string;
    disablePadding?: string | boolean | undefined;
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type RadioGroupPropsType = {
    value: string;
    label: string;
};
