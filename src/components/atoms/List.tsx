import { List as DefaultList, ListItem, ListItemText } from '@mui/material';
import { ReactNode } from 'react';

type ListItemType = {
    text: string;
    icon?: ReactNode | string;
    color?: string;
};

type Props = {
    listItems: ListItemType[];
};

export default function List({ listItems }: Props) {
    return (
        <DefaultList dense={true} sx={{ width: 'auto' }}>
            {listItems.map((item, index) => (
                <ListItem key={item.text + index}>
                    <ListItemText primary={item.text} sx={{ color: item.color ?? '#666161' }} />
                </ListItem>
            ))}
        </DefaultList>
    );
}
