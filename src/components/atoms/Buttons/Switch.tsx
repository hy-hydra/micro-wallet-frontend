import * as React from 'react';
import { Switch as DefaultSwitch } from '@mui/material';

type Props = {
    onChange: (v: boolean) => void;
    isChecked: boolean;
};

export default function Switch({ onChange, isChecked }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <DefaultSwitch
            checked={isChecked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}
