import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Control, Controller } from 'react-hook-form';
import IconLabel from 'src/components/atoms/IconLabel';

type Props = {
    control: Control<any>;
    children?: React.ReactNode;
    name: string;
    defaultValue?: string;
    selectOptions: any[];
    className?: string;
    label: string;
    size?: 'small' | 'medium';
    type?: React.InputHTMLAttributes<unknown>['type'];
    error?: any;
    required?: boolean;
    disabled?: boolean;
    rows?: number;
    suffix?: string | React.ReactNode;
    prefix?: string | React.ReactNode;
    placeholder?: string;
};

export default function SelectBox(props: Props) {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field, fieldState: { error } }) => (
                <FormControl className={props.className ?? ''} sx={{ width: '100%', minWidth: 120 }} size={props.size ?? 'small'}>
                    <InputLabel id="select-small-label">{props.label}</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        className="select"
                        label={props.label}
                        onChange={field.onChange}
                        disabled={props.disabled}
                        value={field.value}
                        error={!!error?.message}
                        size="medium"
                        sx={{
                            '&>div:first-of-type': {
                                padding: field.value || props.defaultValue ? '12px' : ''
                            },
                            '& fieldset': {
                                height: props.defaultValue ?? '100%'
                            }
                        }}
                    >
                        {props.selectOptions.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                                {item.icon ? (
                                    <IconLabel
                                        icon={
                                            <img
                                                alt="token-icon"
                                                src={item.label === 'IQDT' ? 'assets/images/iqdt_logo/logo.png' : item.icon}
                                                width={32}
                                                height={32}
                                            />
                                        }
                                        label={item.label ?? item.name}
                                    />
                                ) : (
                                    <>{item.label ?? item.name}</>
                                )}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
}
