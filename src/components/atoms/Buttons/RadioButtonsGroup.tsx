import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RadioGroupPropsType } from 'src/types';
import { Typography } from '@mui/material';

type Props = {
    groupLabel: string;
    radioGroupList: RadioGroupPropsType[];
    onChange: (v: string) => void;
};

export default function RadioButtonsGroup({ groupLabel, radioGroupList, onChange }: Props) {
    return (
        <FormControl>
            <FormLabel id="row-radio-buttons-group-label">
                <Typography>{groupLabel}</Typography>
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => onChange(e.target.value)}
                defaultValue={radioGroupList[0].value}
            >
                {radioGroupList.map((item, index) => (
                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={<Typography>{item.label}</Typography>} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
