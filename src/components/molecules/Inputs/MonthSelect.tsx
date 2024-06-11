import { useState } from 'react';
import ja from 'date-fns/locale/ja';
import { addMonths, format, subMonths } from 'date-fns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ArrowLeft, ArrowRight, CalendarMonth } from '@mui/icons-material';
import PrimaryOutlineButton from 'src/components/atoms/Buttons/PrimaryOutlineButton';
import WhiteTextButton from 'src/components/atoms/Buttons/WhiteTextButton';

type Props = {
    setTargetYearMonth: any;
    targetYearMonth: Date;
};
export default function MonthSelect({ setTargetYearMonth, targetYearMonth }: Props) {
    const prev = () => {
        setTargetYearMonth(subMonths(targetYearMonth, 1));
    };
    // 来月
    const next = () => {
        setTargetYearMonth(addMonths(targetYearMonth, 1));
    };
    const [open, setOpen] = useState(false);
    return (
        <div className={'flex-start w-full'}>
            <PrimaryOutlineButton onClick={prev}>
                <ArrowLeft />
            </PrimaryOutlineButton>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                <DatePicker
                    open={open}
                    onClose={() => setOpen(false)}
                    value={targetYearMonth}
                    onChange={(newValue) => {
                        setTargetYearMonth(newValue);
                    }}
                    views={['year', 'month']}
                    inputFormat={'yyyy年MM月'}
                    mask={'____年__月'}
                    renderInput={({ inputRef }) => (
                        <div ref={inputRef}>
                            <WhiteTextButton className={'text-3xl font-bold pt-1'} onClick={() => setOpen(true)}>
                                <CalendarMonth className={'mr-1'} fontSize={'large'} />
                                {targetYearMonth && format(targetYearMonth, 'yyyy年M月')}
                            </WhiteTextButton>
                        </div>
                    )}
                />
            </LocalizationProvider>
            <PrimaryOutlineButton onClick={next}>
                <ArrowRight />
            </PrimaryOutlineButton>
        </div>
    );
}
