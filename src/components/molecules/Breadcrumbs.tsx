import * as React from 'react';
import { Breadcrumbs as DefaultBreadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type Props = {
    breadcrumbs: string[];
    setBreadcrumbs: (index: number) => void;
    disableIndex?: number;
};

export default function Breadcrumbs({ breadcrumbs, disableIndex, setBreadcrumbs }: Props) {
    const theme = useTheme();

    function handleClick(event: any, index: number) {
        event.preventDefault();
        setBreadcrumbs(index);
    }

    return (
        <Stack spacing={2}>
            <DefaultBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb: any, index: number) => (
                    <Link
                        underline="hover"
                        key="1"
                        onClick={(e) => handleClick(e, index)}
                        sx={{
                            color: index + 1 === breadcrumbs.length ? 'grey' : theme.palette.primary.main,
                            cursor: 'pointer',
                            pointerEvents: index === disableIndex ? 'none' : 'auto'
                        }}
                    >
                        {breadcrumb}
                    </Link>
                ))}
            </DefaultBreadcrumbs>
        </Stack>
    );
}
