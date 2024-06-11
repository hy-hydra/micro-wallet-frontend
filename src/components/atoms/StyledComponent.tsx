import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { ReactElement, ReactNode } from 'react';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 12
        }
    })
);

export const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff'
    }
});

type SwitchProps = {
    children: any;
    value: number;
};

export const SwitchContent = (props: SwitchProps) => {
    return props.children.find((child: any) => child.props.index === props.value);
};

type SwitchChildProps = {
    index: number;
    children: ReactElement | ReactNode;
};
export const SwitchChild = (props: SwitchChildProps) => {
    return <>{props.children}</>;
};
