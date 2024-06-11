export const timeFormat = (inputDateString: string) => {
    const inputDate = new Date(inputDateString);

    // Check if the input is a valid date
    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date format');
        return null;
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);

    return formatter.format(inputDate);
};

/*
export const timeFormat = (inputDate: string) => {
    const split_time = inputDate.split('T');
    const date = split_time[0].replaceAll('-', '/');
    const time = split_time[1].split('.')[0];

    return `${date} ${time}`;
};

*/
