import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import IconLabel from 'src/components/atoms/IconLabel';
import { Token } from 'src/types/crypto';

type Props = {
    selectOptions: Token[];
    value: number;
    onChange: (v: number) => void;
};

export const BasicSelectTokenBox = (props: Props) => {
    const handleChange = (event: SelectChangeEvent) => {
        props.onChange(Number(event.target.value));
    };
    return (
        <FormControl sx={{ width: '100%', minWidth: 120 }} size={'small'}>
            <Select
                labelId="select-label"
                id="select"
                className="select"
                size="medium"
                onChange={handleChange}
                defaultValue={`${props.value}`}
                sx={{
                    '&>div:first-of-type': {
                        padding: '12px'
                    }
                }}
            >
                {props.selectOptions.map((item, index) => (
                    <MenuItem key={index} value={index}>
                        {item.icon ? (
                            <IconLabel
                                icon={
                                    <img
                                        alt="token-icon"
                                        src={item.name === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : item.icon}
                                        width={32}
                                        height={32}
                                    />
                                }
                                label={item.name}
                            />
                        ) : (
                            <>{item.name}</>
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
