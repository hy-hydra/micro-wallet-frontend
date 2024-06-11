import { Button } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
    onClick?: MouseEventHandler | undefined;
    children: ReactNode;
    isFull?: boolean;
    className?: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    [key: string]: unknown;
};
export default function PrimaryOutlineButton(props: Props) {
    const { onClick, className, isFull, type, ...rest } = props;
    return (
        <Button onClick={onClick} className={(className ? className : '') + ' rounded-xl'} type={type} {...rest}>
            {props.children}
        </Button>
    );
}
