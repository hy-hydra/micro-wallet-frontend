import { Button } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
    onClick?: MouseEventHandler | undefined;
    children: ReactNode;
    className?: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    size?: 'small' | 'medium' | 'large';
};
export default function WhiteTextButton(props: Props) {
    return (
        <Button
            onClick={props.onClick}
            variant={'text'}
            className={props.className ? props.className : ''}
            type={props.type}
            size={props.size}
        >
            {props.children}
        </Button>
    );
}
