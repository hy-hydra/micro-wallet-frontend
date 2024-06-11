import { ReactElement } from 'react';
import Icon from '@mui/material/Icon';
import { Typography } from '@mui/material';

type Props = {
    icon: ReactElement | null;
    label: ReactElement | string;
    dir?: boolean;
};

export default function IconLabel(props: Props) {
    return (
        <div className="flex align-center">
            <Icon sx={{ width: 40, height: 'auto', display: 'flex', alignItems: 'center' }}>{props.icon}</Icon>
            <Typography>{props.label}</Typography>
        </div>
    );
}
