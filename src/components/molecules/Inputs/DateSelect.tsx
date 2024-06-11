import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import WhiteTextButton from 'src/components/atoms/Buttons/WhiteTextButton';
import { CalendarMonth } from '@mui/icons-material';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

type Props = {
    setTargetDate: any;
    targetDate: Date | null;
    label?: string;
};

export default function DateSelect({ targetDate, setTargetDate, label }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <DatePicker
                open={open}
                onClose={() => setOpen(false)}
                value={targetDate}
                onChange={(newValue) => {
                    setTargetDate(newValue);
                    console.log(newValue);
                }}
                views={['year', 'month', 'day']}
                inputFormat={'yyyy年MM月dd日'}
                openTo="day"
                mask={'____年__月__日'}
                renderInput={({ inputRef }) => (
                    <div ref={inputRef}>
                        <WhiteTextButton className={'text-3xl font-bold pt-1'} onClick={() => setOpen(true)}>
                            <CalendarMonth className={'mr-1'} fontSize={'large'} />
                            {targetDate && format(targetDate, 'yyyy年MM月dd日')}
                        </WhiteTextButton>
                    </div>
                )}
            />
        </LocalizationProvider>
    );
}
