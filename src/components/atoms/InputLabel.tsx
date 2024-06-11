import { FormLabel } from '@mui/material';
import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    required?: boolean;
    className?: string;
};

export default function InputLabel({ children, required, className }: Props) {
    return (
        <FormLabel className={className} sx={{ fontSize: 14 }}>
            {children}
            {required ? (
                <span className={'ml-1 pb-2'} style={{ color: '#d32f2f', fontSize: 10 }}>
                    ＊
                </span>
            ) : (
                ''
            )}
        </FormLabel>
    );
}
