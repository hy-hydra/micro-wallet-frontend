import { Controller } from 'react-hook-form';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ReactNode } from 'react';
import InputLabel from 'src/components/atoms/InputLabel';

type Props = {
    control: any;
    name: string;
    label?: string | ReactNode;
    className?: string;
    labelClass?: string;
    type?: string;
    errors?: any;
    specificFunction?: (v?: any) => any;
    items: {
        label: string | ReactNode;
        value: number | string;
        disabled?: boolean;
    }[];
    nullable?: boolean;
    required?: boolean;
};
export default function ToggleButtons(props: Props) {
    return (
        <>
            {props.label && (
                <InputLabel required={props.required} className={props.labelClass && props.labelClass}>
                    {props.label}
                </InputLabel>
            )}
            <Controller
                control={props.control}
                name={props.name}
                render={({ field }) => (
                    <>
                        <ToggleButtonGroup
                            data-testid={`select_${props.name}`}
                            size={'small'}
                            color={'primary'}
                            value={field.value}
                            onChange={(_, value: number | string | null) => {
                                if (value !== null) {
                                    field.onChange(value);
                                    {
                                        props.specificFunction && props.specificFunction(value);
                                    }
                                }
                                if (props.nullable) {
                                    console.log('hoge');
                                    field.onChange(value);
                                    {
                                        props.specificFunction && props.specificFunction(value);
                                    }
                                }
                            }}
                            exclusive
                            fullWidth
                        >
                            {props.items.map((v, k) => (
                                <ToggleButton key={k} value={v.value} disabled={v.disabled}>
                                    {v.label}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        {props.errors && props.name in props.errors && (
                            <Typography className={'mt-1.5 ml-3 text-xs'} color={'#d32f2f'}>
                                {props.errors && props.errors[props.name]?.message}
                            </Typography>
                        )}
                    </>
                )}
            />
        </>
    );
}
